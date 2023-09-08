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