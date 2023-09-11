import { orderItemStore } from "../models/orderItems";
import { OrderItem } from "../types/orderItems";

const store = new orderItemStore();

export const create = async(orderItem:OrderItem)=>{
    const result = await store.create(orderItem);
    return result;
}
export const getOrderItems = async(order_id:number)=>{
    const result = await store.getOrderItems(order_id);
    return result;
}

// export const deleteCartItem = async(cartItem_id:number)=>{
//     const result = await store.deleteCartItem(cartItem_id);
//     return result;
// }