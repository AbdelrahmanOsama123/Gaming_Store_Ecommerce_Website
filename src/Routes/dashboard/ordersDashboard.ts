import {getCurrentOrders,getCompletedOrders} from '../../conroller/dashboard/ordersDashboard';
import express,{Request,Response} from 'express';

const dashboad_routes = (app:express.Application) =>{
    app.get('/orders/current/:user_id',async (req:Request,res:Response)=>{
        try{
            const user_id = parseInt(req.params.user_id as string);
            const result = await getCurrentOrders(user_id);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json(`Invalid get orders ${error}`);
        }
    });
    app.get('/orders/completed/:user_id',async (req:Request,res:Response)=>{
        try{
            const user_id = parseInt(req.params.user_id as string);
            const result = await getCompletedOrders(user_id);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json(`Invalid get orders ${error}`);
        }
    });
}
export default dashboad_routes;