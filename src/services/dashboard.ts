import client from '../utalities/database';
import { Order } from '../types/orders';

export class DashboardQueries {
  async getCurrentOrders(user_id : number):Promise<Order[]> {
    try{
        const conn = await client.connect();
        const sql = "SELECT * from Orders where status ='Current' and user_id = ($1)";
        const result = await conn.query(sql,[user_id]);
        conn.release();
        return result.rows;
    }
    catch(error){
        throw new Error(`cannot get current products for user ${user_id} ${error}`)
    }
  } 
  async getCompletedOrders(user_id : number):Promise<Order[]> {
    try{
        const conn = await client.connect();
        const sql = "SELECT * from Orders where status ='Completed' and user_id = ($1)";
        const result = await conn.query(sql,[user_id]);
        conn.release();
        return result.rows;
    }
    catch(error){
        throw new Error(`cannot get Completed products for user ${user_id} ${error}`)
    }
  } 
}