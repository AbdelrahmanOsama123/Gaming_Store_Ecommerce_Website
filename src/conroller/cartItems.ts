import {cartItemStore} from '../models/cartItems';
import { CartItem } from '../types/cartItem';

const store = new cartItemStore();

export const create = async (cartItem:CartItem):Promise<CartItem> =>{
    const result = await store.create(cartItem);
    return result;
}

export const getCartItems = async(cart_id : number):Promise<CartItem[]> =>{
    const cartItems = await store.getCartItems(cart_id);
    return cartItems;
}

export const deleteCartItems = async(cart_id : number):Promise<CartItem[]> =>{
    const deletedItems = await store.deleteCartItems(cart_id);
    return deletedItems;
}

export const deleteCartItem = async(cart_id:number,product_id:number):Promise<CartItem>=>{
    const deletedCartItem = await store.deleteCartItem(cart_id,product_id);
    return deletedCartItem;
}

export const updateCartItem = async(quantity:number,cart_id:number)=>{
    const updatedCartItem = await store.updateCartItem(quantity,cart_id);
    return updatedCartItem;
}