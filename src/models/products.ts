import client from '../utalities/database';
import { Product } from "../types/products";

export class productStore {
    async index() : Promise<Product[]> {
        try{
            const sql = 'select * from products order by id';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch(error){
            throw new Error('cannot get products');
        }
    }

    async create (product:Product) : Promise<Product>  {
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO products (name, price,afteroffer,catagory,description,quantity) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
            const result = await conn.query(sql,[product.name,product.price,product.afteroffer,product.catagory,product.description,product.quantity]);
            conn.release();
            return result.rows[0];
        }
        catch(error){
            throw new Error (`cannot insert this product : ${error}`);
        }
    }

    async show(id:number) : Promise<Product> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM products where id=($1)';
            const result = conn.query(sql,[id]);
            conn.release();
            return (await result).rows[0];
        }
        catch(error){
            throw new Error (`cannot select this product of (${id}) : ${error}`);
        }
    }

    async update (id:number,product:Product) {
        try{
            const conn = await client.connect();
            const sql = 'UPDATE products SET name = ($1),catagory = ($2),price=($3),afteroffer=($4),description=($5),quantity=($6) WHERE id = ($7) RETURNING *';
            const result = await conn.query(sql, [product.name,product.catagory,product.price,product.afteroffer,product.description,product.quantity,id]);
            conn.release();
            return result.rows[0];
        }
        catch(error)
        {
            throw new Error(`cannot update this product of (${id}) : ${error}`);
        }
    } 

    async delete (id:number):Promise<Product> {
        try{
            const conn = client.connect();
            const sql = `DELETE FROM products WHERE id = ($1) RETURNING *`;
            const result = (await conn).query(sql,[id]);
            (await conn).release();
            return (await result).rows[0];
        }
        catch(error){
            throw new Error(`cannot delete this product of (${id}) : ${error}`);
        }
    } 

    async getProductsByCatagory(catagory:string):Promise<Product[]>{
        try{
            const conn = await client.connect();
            const sql = "SELECT * FROM products WHERE catagory = ($1)";
            const result = await conn.query(sql,[catagory]);
            conn.release();
            return result.rows;
        }
        catch(error){
            throw new Error(`cannot get products ${error}`);
        }
    }

    async trendingProducts ():Promise<Product[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * from products LIMIT 4';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch(error){
            throw new Error('cannot get trending Products');
        }
    } 
    
    async getProductId (productName:string):Promise<number>{
        try{
            const conn = await client.connect();
            const sql = 'select id from products where name =($1)';
            const result = await conn.query(sql,[productName]);
            conn.release();
            return result.rows[0].id;
        }
        catch(error){
            throw new Error('cannot get product_id from database');
        }
    }

    async getPageProducts(offset:number):Promise<Product[]>{
        try{
            const conn = await client.connect();
            const sql = 'select * from products order by id offset ($1) limit 4';
            const result = await conn.query(sql,[offset]);
            conn.release();
            return result.rows;
        }
        catch(error){
            throw new Error('cannot get products with required offset from database');
        }
    }

    async saveImage(imagename:string,product_id:number) : Promise<string> {
        try{
            const conn = await client.connect();
            const sql = 'update products set image = ($1) where id = ($2) RETURNING image';
            const result = await conn.query(sql,[imagename,product_id]);
            conn.release();
            return result.rows[0].image;
        }
        catch(error){
            throw new Error('cannot Insert image into users table');
        }
    }

    async getImage(product_id:number) : Promise<string> {
        try{
            const conn = await client.connect();
            const sql = 'select image from users where id = ($1)';
            const result = await conn.query(sql,[product_id]);
            conn.release();
            return result.rows[0].image;
        }
        catch(error){
            throw new Error('cannot Insert image into users table');
        }
    }

}