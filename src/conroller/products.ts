import { productStore } from "../models/products";
import { Product } from "../types/products";

const store = new productStore();

export const index = async ():Promise<Product[]|null> =>{
    try{
        const products = await store.index();
        return products;
    }
    catch(error){
        throw new Error(`cannot get products ${error}`);
    }
}

export const show = async (id:number):Promise<Product|null> =>{
    try{
        const product = await store.show(id) ;
        return product;
    }
    catch(error){
        throw new Error(`cannot get product ${id} ${error}`);
    }
    
}

export const create = async (product:Product):Promise<Product|null> =>{
    try{
        const result = await store.create(product);
        return result;
    }
    catch(error){
        throw new Error(`cannot insert this product ${error}`);
    }
}

export const update = async(id:number,product:Product):Promise<Product|null>=>{
    try{
        const result = await store.update(id,product);
        return result;
    }
    catch(error){
        throw new Error(`cannot update product ${id} ${error}`);
    }
}

export const Delete = async(id:number):Promise<Product|null>=>{
    try{
        const result = await store.delete(id);
        return result;
    }
    catch(error){
        throw new Error(`cannot delete product ${id} ${error}`);
    }
}

export const getProductsByCatagory = async(catagory:string):Promise<Product[]|null>=>{
    try{
        const result = store.getProductsByCatagory(catagory);
        return result;
    }
    catch(error){
        throw new Error(`cannot get ${catagory} ${error}`);
    }
}
export const getTrendingProducts = async():Promise<Product[]>=>{
    try{
        const result = await store.trendingProducts();
        return result;
    }
    catch(error){
        throw new Error(`cannot get trending products`);
    }
}

export const getProductId = (productName : string):Promise<number>=>{
    const product_id = store.getProductId(productName);
    return product_id;
}

