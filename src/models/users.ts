import client from '../utalities/database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../types/users';

dotenv.config();

const {
    PEPPER,
    SALTROUNDS,
} = process.env;


export class userStore {
    async index(): Promise<User[]> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users ORDER BY id';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error){
            throw new Error('cannot get results => '+error);
        }
    }
    
    async create (user:User) : Promise<User|null>  
    {
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstname,lastname,username,password,confirm_password) VALUES ($1,$2,$3,$4,$5) RETURNING *';
            const hash1 = bcrypt.hashSync(
                (user.password+ PEPPER),
                parseInt(SALTROUNDS as string)
            );
            const hash2 = bcrypt.hashSync(
                (user.confirm_password + PEPPER),
                parseInt(SALTROUNDS as string)
            );
            const result = await conn.query(sql,[user.firstname,user.lastname,user.username,hash1,hash2]);
            conn.release();
            return result.rows[0];
        }
        catch(error){
            return null;
        }
    }

    async authenticate (username : string,password:string): Promise<User|null>  
    {
        const conn = await client.connect();
        
        const sql = 'SELECT * from users where username= ($1)';
        const result = await conn.query(sql,[username]);
        if(result.rows.length){
           const user = result.rows[0];
            if(bcrypt.compareSync((password+PEPPER),user.password))
            {
                return user;
            }
            else{
                return null;
            }
        }   
        else {
            return null;
        }
    }

    async show(id : number) : Promise<User> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        }
        catch (error){
            throw new Error ('error => ' + error);
        }
    }
    
    async delete (id:number) : Promise<User> {
        try{
            const conn = await client.connect();
            const sql = 'DELETE FROM users where id =($1) RETURNING *';
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        }
        catch(error){
            throw new Error (`cannot delete user of${id} => `+error);
        }
    } 
    async getUserID(username:string):Promise<number>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * from users where username= ($1)';
            const result = await conn.query(sql,[username]);
            conn.release();
            return result.rows[0].id;
        }
        catch(error){
            throw new Error ('cannot get user_id => '+error);
        }
    }
}