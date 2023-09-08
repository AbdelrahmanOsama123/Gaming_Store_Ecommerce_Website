import express,{Request,Response} from 'express';
import {index,show,create,update,Delete,addProduct,getOrderIdsAndStatus} from '../conroller/orders';
import tokenValidate from '../Middleware/tokenValidate';
import isAdmin from '../Middleware/isAdmin';

const orders_routes = (app:express.Application) =>{
    app.get('/orders',tokenValidate,isAdmin,async (req:Request,res:Response)=>{
        try{
            const result = await index();
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid get data from db "+error);
        }
    });


    app.get('/orders/:id',tokenValidate,isAdmin,async(req:Request,res:Response)=>{
        try{
            const id :number = parseInt(req.params.id);
            const result = await show(id);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid show data from db "+error);
        }
    });
    app.post('/orders',tokenValidate,async(req:Request,res:Response)=>{
        try{
            const order = {
                user_id : req.cookies.user_id,
                price : req.body.price,
            }
            const result = await create(order);
            res.json(result);
        }
        
        catch(error){
            res.status(400);
            res.json("Invalid insert data to db "+error);
        }
    });

    app.get('/getOrderIdsAndStatus',async(req:Request,res:Response)=>{
        const user_id = req.cookies.user_id;
        const orderIdsAndStatus = await getOrderIdsAndStatus(user_id);
        res.json(orderIdsAndStatus);
    })

    app.put('/orders/:id',tokenValidate,isAdmin,async(req:Request,res:Response)=>{
        try{
            const order = {
                user_id : req.body.user_id,
                price : req.body.price,
                status : req.body.status,
            }
            const id : number = parseInt((req.params.id) as string);
            const result = await update(id,order);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid update data from db "+error);
        }
    });
    app.delete('/orders/:id',tokenValidate,isAdmin,async(req:Request,res:Response)=>{
        try{
            const id :number = parseInt(req.params.id);
            const result = await Delete(id);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid delete data from db "+error);
        }
    });
    app.post('/orders/:id/products',tokenValidate,isAdmin,async(req:Request,res:Response) =>{
        const orderId = parseInt((req.params.id) as string);
        const quantity = parseInt((req.body.quantity)as string);
        const product_id = parseInt((req.body.product_id)as string);
        const addedProduct = await addProduct(quantity,orderId,product_id);
        res.send(addedProduct);
    });

}

export default orders_routes;