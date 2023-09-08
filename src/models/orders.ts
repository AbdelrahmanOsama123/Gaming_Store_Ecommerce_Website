import client from '../utalities/database';
import { Order } from '../types/orders';

export class orderStore {
    async index() : Promise<Order[]> {
        try{
            const sql = 'select * from orders order by id';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch(error){
            throw new Error('cannot get orders');
        }
    }

    async create (order:Order) : Promise<Order>  {
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (user_id, price) VALUES ($1,$2) RETURNING *';
            const result = await conn.query(sql,[order.user_id,order.price]);
            conn.release();
            return result.rows[0];
        }
        catch(error){
            throw new Error (`cannot insert this order : ${error}`);
        }
    }

    
    async getOrderIdsAndStatus (user_id:string){
        try{
            const orderIds:number[] =[];
            const orderStatus:number[] =[];
            const conn = await client.connect();
            const sql = 'select * from orders where user_id = ($1)';
            const result = await conn.query(sql,[user_id]);
            conn.release();
            for(const row of result.rows){
                orderIds.push(row.id);
                orderStatus.push(row.status);
            }
            return {orderIds,orderStatus};
        }
        catch(error){
            throw new Error('cannot get OrderIds from order_items table '+error);
        }
    }
    
    async show(id:number) : Promise<Order> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders where id=($1) ';
            const result = conn.query(sql,[id]);
            conn.release();
            return (await result).rows[0];
        }
        catch(error){
            throw new Error (`cannot select this order of (${id}) : ${error}`);
        }
    }

    async update (id:number,order:Order) {
        try{
            const conn = await client.connect();
            const sql = 'UPDATE orders SET user_id = ($1), price =($2) status=($3) WHERE id = ($4) RETURNING *';
            const result = await conn.query(sql, [order.user_id,order.price,order.status,id]);
            conn.release();
            return result.rows[0];
        }
        catch(error)
        {
            throw new Error(`cannot update this order of (${id}) : ${error}`);
        }
    } 

    async delete (id:number):Promise<Order> {
        try{
            const conn = client.connect();
            const sql = 'DELETE FROM orders WHERE id = ($1) RETURNING *';
            const result = (await conn).query(sql,[id]);
            (await conn).release();
            return (await result).rows[0];
        }
        catch(error){
            throw new Error(`cannot delete this order of (${id}) : ${error}`);
        }
    } 
    async addProduct (quantity:number,order_id:number,product_id:number) :Promise<Order|string> 
    {
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO order_products(quantity,order_id,product_id) values($1,$2,$3) RETURNING *';
            const result = conn.query(sql,[quantity,order_id,product_id]);
            const order = (await result).rows[0];
            conn.release;
            return order;
        }
        catch(error){
            throw new Error(`cannot add product${product_id} to order${order_id}`);
        }
    }
}