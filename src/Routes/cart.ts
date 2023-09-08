import express,{Request,Response} from 'express';
import {create, getCartID} from '../conroller/cart';

const cart_routes = (app:express.Application) =>{
    app.get('/carts',async(req:Request,res:Response)=>{
        try{
            const user_id = req.cookies.user_id;
            const result = await create(user_id);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("cannot insert data to cart "+error);
        }
    });
    app.get('/getCartId',async(req:Request,res:Response)=>{
        try{
            const user_id = req.cookies.user_id;
            const result = await getCartID(user_id);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("cannot insert data to cart "+error);
        }
    });
    app.get('/getCartId',async(req:Request,res:Response)=>{
        try{
            const user_id = req.cookies.user_id;
            const cart_id = await getCartID(user_id);
            res.json(cart_id);
        }
        catch(error){
            res.status(400);
            res.json("cannot insert data to cart "+error);
        }
    });
    
}

export default cart_routes;