import { CartItem } from "../types/cartItem";
import client from "../utalities/database";

export class cartItemStore {
    async create (cartItem:CartItem){
        try{
            const conn = await client.connect();
            const sql1 = 'SELECT * FROM cart_items where cart_id=($1) and product_id=($2)';
            const result1 = await conn.query(sql1,[cartItem.cart_id,cartItem.product_id]);
            if(result1.rows.length){
                const quantity = result1.rows[0].quantity;
                const sql2 = 'Update cart_items set quantity = ($1) where cart_id = ($2) and product_id=($3) RETURNING *';
                const result2 = await conn.query(sql2,[cartItem.quantity+quantity,cartItem.cart_id,cartItem.product_id]);
                conn.release();
                return result2.rows[0];
            }
            else{
                const sql3 = 'Insert into cart_items(cart_id,product_id,quantity) values($1,$2,$3) RETURNING *';
                const result3 = await conn.query(sql3,[cartItem.cart_id,cartItem.product_id,cartItem.quantity]);
                return result3.rows[0];
            }
        }
        catch(error){
            throw new Error('cannot Insert data into cartItem table');
        }
    }
    async getCartItems (cart_id : number):Promise<CartItem[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT products.name,products.catagory, products.price, products.afteroffer,cart_items.quantity,products.id FROM cart_items inner join products ON cart_items.product_id=products.id WHERE cart_items.cart_id=($1)';
            const result = await conn.query(sql,[cart_id]);
            conn.release();
            return result.rows;
        }
        catch(error){
            throw new Error('cannot get cartItems from cartItem table');
        }
    }
    async deleteCartItems(cart_id : number):Promise<CartItem[]>{
        try{
            const conn = await client.connect();
            const sql = 'delete from cart_items where cart_id = ($1) RETURNING *;';
            const result = await conn.query(sql,[cart_id]);
            conn.release();
            return result.rows;
        }
        catch(error){
            throw new Error('cannot Insert data into cartItem table');
        }
    }
}