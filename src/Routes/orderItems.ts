import {create,getOrderItems} from '../conroller/orderItems';
import express,{Request,Response} from 'express';
import tokenValidate from '../Middleware/tokenValidate';

const orderItems_route = (app:express.Application)=>{
    app.post('/orderItems',tokenValidate,async(req:Request,res:Response)=>{
        const orderItem = {
            order_id : req.body.order_id,
            product_id : req.body.product_id,
            quantity : req.body.quantity,
            price : req.body.price,
        }
        const result = await create(orderItem);
        res.json(result);
    })
    app.post('/getOrderItems',tokenValidate,async(req:Request,res:Response)=>{
        const order_id = req.body.order_id;
        const result = await getOrderItems(order_id);
        res.json(result);
    })
}

export default orderItems_route;