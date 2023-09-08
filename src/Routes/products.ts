import express,{Request,Response} from 'express';
import {index,show,create,update,Delete,getProductsByCatagory,getTrendingProducts,getProductId} from '../conroller/products';
import tokenValidate from '../Middleware/tokenValidate';
import isAdmin from '../Middleware/isAdmin';

const products_routes = (app:express.Application) =>{
    app.get('/products',tokenValidate,async(req:Request,res:Response)=>{
        try{
            const result = await index();
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid get data from db "+error);
        }
    });
    app.get('/products/:id',tokenValidate,async(req:Request,res:Response)=>{
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
                        ///tokenValidate
    app.post('/products',tokenValidate,async(req:Request,res:Response)=>{
        try{
            const product = {
                name : req.body.name,
                price : req.body.price,
                afteroffer : req.body.afteroffer,
                catagory : req.body.catagory,
                description : req.body.description,
                quantity : req.body.quantity
            }
            const result = await create(product);
            res.json(result);
        }
        
        catch(error){
            res.status(400);
            res.json("Invalid insert data to db "+error);
        }
    });
                            ///tokenValidate
    app.put('/products/:id',tokenValidate,isAdmin,async(req:Request,res:Response)=>{
        try{
            const product = {
                name : req.body.name,
                price : req.body.price,
                catagory : req.body.catagory,
                afteroffer : req.body.afteroffer,
                description : req.body.description,
                quantity : req.body.quantity
            }
            const id : number = parseInt(req.params.id as string);
            const result = await update(id,product);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid update data from db "+error);
        }
    });
                            ///tokenValidate
    app.delete('/products/:id',tokenValidate,isAdmin,async(req:Request,res:Response)=>{
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
    app.get('/products/catagory/:category',tokenValidate,async(req:Request,res:Response)=>{
        try{
            const catagory :string = req.params.category as string;
            const result = await getProductsByCatagory(catagory);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid delete data from db "+error);
        }
    })
    app.get('/trending',tokenValidate,async (req,res)=>{
        try{
            const result = await getTrendingProducts();
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid get trending products "+error);
        }
    });

    app.post('/getProductId',async(req:Request,res:Response)=>{
        try{
            const productName = req.body.productName;
            const product_id = await getProductId(productName);
            res.json(product_id);
        }
        catch(error){
            res.status(400);
            res.json("cannot get product_id from cart "+error);
        }
    });
}

export default products_routes;
