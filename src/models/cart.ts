import client from "../utalities/database";
import { Cart } from "../types/cart";

export class cartStore {
    async create(user_id:number) : Promise<Cart> {
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO cart (user_id) VALUES ($1) RETURNING *';
            const result = await conn.query(sql,[user_id]);
            conn.release();
            return result.rows[0];
        }
        catch(error){
            throw new Error('cannot Insert user_id into cart table');
        }
    }
    async getCartID (user_id:number){
        try{
            const conn = await client.connect();
            const sql = 'SELECT id from cart where user_id = ($1)';
            const result = await conn.query(sql,[user_id]);
            conn.release();
            return result.rows[0].id;
        }
        catch(error){
            throw new Error('cannot get cart_id from cart table');
        }
    }
    
}