import {orderStore} from '../models/orders';
import { Order } from '../types/orders';

const store = new orderStore();

export const index = async ():Promise<Order[]> =>{
        const orders = await store.index();
        return orders;
}

export const show = async (id:number):Promise<Order> =>{
    const order = await store.show(id) ;
    return order;
}

export const create = async (order:Order):Promise<Order> =>{
        const result = await store.create(order);
        return result;
}

export const getOrderIdsAndStatus = async(user_id:string)=>{
    const orderIdsAndStatus = await store.getOrderIdsAndStatus(user_id);
    return orderIdsAndStatus;
}

export const update = async(id:number,order:Order):Promise<Order>=>{
    const result = await store.update(id,order);
    return result;
}

export const Delete = async(id:number):Promise<Order>=>{
    const result = await store.delete(id);
    return result;
}

export const addProduct = async(quantity:number,orderId:number,product_id:number)=>{
    const addedProduct = await store.addProduct(quantity,orderId,product_id);
    return addedProduct;
}
