import client from "../../utalities/database";
import { User } from "../../types/users";

export class userImageStore {
    async saveImage(user_id:number,imagename:string) :Promise<User>{
        try{
            const conn = await client.connect();
            const sql = 'update users set image=($1) where id=($2) RETURNING *';
            const result = await conn.query(sql,[imagename,user_id]);
            conn.release();
            return result.rows[0];
        }
        catch(error){
            throw new Error('cannot Insert user_id into cart table');
        }
    }
    async getImage (user_id:number){
        try{
            const conn = await client.connect();
            const sql = 'SELECT * from users where id = ($1)';
            const result = await conn.query(sql,[user_id]);
            conn.release();
            return result.rows[0];
        }
        catch(error){
            throw new Error('cannot get cart_id from cart table');
        }
    }
}