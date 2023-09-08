import { cartStore } from "../models/cart";

const store = new cartStore();
export const create = (user_id:number)=>{
    const result = store.create(user_id);
    return result;
}

export const getCartID = (user_id : number)=>{
    const cartId = store.getCartID(user_id);
    return cartId;
}

