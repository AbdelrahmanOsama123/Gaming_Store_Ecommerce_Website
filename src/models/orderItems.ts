import client from "../utalities/database";
import { OrderItem } from "../types/orderItems";

export class orderItemStore{
    async create (orderItem:OrderItem):Promise<OrderItem>{
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO order_items (order_id,product_id,quantity,price) values($1,$2,$3,$4) RETURNING *';
            const result = await conn.query(sql,[orderItem.order_id,orderItem.product_id,orderItem.quantity,orderItem.price]);
            conn.release();
            return result.rows[0];
        }
        catch(error){
            throw new Error('cannot insert to order_items table '+error);
        }
    }
    async getOrderItems(order_id:number){
        try{
            const conn = await client.connect();
            const sql = 'select products.name,order_items.quantity,products.price as productPrice,order_items.price as orderItemPrice,products.afteroffer,order_items.order_id,products.catagory,products.description from order_items inner join products on products.id = order_items.product_id where order_items.order_id = ($1)';
            const result = await conn.query(sql,[order_id]);
            conn.release();
            return result.rows;
        }
        catch(error){
            throw new Error('cannot get order_items from order_items table '+error);
        }
    }
}