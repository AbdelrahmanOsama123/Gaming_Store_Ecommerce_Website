import express,{Request,Response} from 'express';
import {create,getCartItems,deleteCartItems} from '../conroller/cartItems';
// import tokenValidate from '../Middleware/tokenValidate';
// import isAdmin from '../Middleware/isAdmin';

const cartItems_route = (app:express.Application)=>{
    app.post('/cartItems',async (req:Request,res:Response)=>{
        try{
            const cartItem ={
                quantity : req.body.quantity,
                cart_id : req.body.cart_id,
                product_id : req.body.product_id
            }
            const result = await create(cartItem);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid insert data to cart_item "+error);
        }
    });

    app.post('/getCartItems',async (req:Request,res:Response)=>{
        try{
            const cart_id = req.body.cart_id;
            const cartItems = await getCartItems(cart_id);
            res.json(cartItems);
        }
        catch(error){
            res.status(400);
            res.json("Invalid insert data to cart_item "+error);
        }
    });
    app.post('/deleteCartItems',async (req:Request,res:Response)=>{
        try{
            const cart_id = req.body.cart_id;
            const cartItems = await deleteCartItems(cart_id);
            console.log(cartItems);
            res.json(cartItems);
        }
        catch(error){
            res.status(400);
            res.json("Invalid insert data to cart_item "+error);
        }
    });
}

export default cartItems_route;