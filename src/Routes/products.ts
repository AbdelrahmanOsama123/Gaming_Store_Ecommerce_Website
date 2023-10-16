import express,{Request,Response} from "express";
import multer from "multer";
import path from "path";
import {index,show,create,update,Delete,getMostPlayed,getProductsByCatagory,getTrendingProducts,getProductId,getPageProducts,saveProductImage,getImage} from '../conroller/products';
import tokenValidate from '../Middleware/tokenValidate';


let uploadedFilename= '';
let productId :number ;

const storage = multer.diskStorage({
    destination: function (req:Request, file, next) {
        next(null, 'productImages/'); // Specify the folder where you want to save the files
    },
    filename: function (req:Request, file, next) {
      // Generate a unique filename for the uploaded file (you can modify this logic)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      uploadedFilename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
      next(null, uploadedFilename);
    }
});
const upload = multer({ storage: storage });

const products_routes = (app:express.Application) =>{

    app.post('/products',tokenValidate,async(req:Request,res:Response)=>{
        try{
            const product = {
                name : req.body.name,
                price : req.body.price,
                afteroffer : req.body.afteroffer,
                catagory : req.body.catagory,
                description : req.body.description,
                quantity : req.body.quantity,
                image : req.body.image
            }

            const result = await create(product);
            productId = (result.id as unknown as number);
            res.json(result);
        }
        
        catch(error){
            res.status(400);
            res.json({status:'failed'});
        }
    });

    app.post('/saveProductImage',upload.single('image'), async(req:Request,res:Response) =>{
        try {
                const savedImage = await saveProductImage(uploadedFilename,productId);
                res.json(savedImage);
            }
        catch(error){
            res.status(400);
            res.send('cannot insert data to database '+error);    
        }
    });

    app.get('/getImage',async(req:Request,res:Response)=>{
        try{
            const user_id = req.cookies.user_id;
            const result = await getImage(user_id);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.send('cannot get Image from database '+error);
        }
    });

    app.get('/products',async(req:Request,res:Response)=>{
        try{
            const result = await index();
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid get all data from database "+error);
        }
    });

    app.get('/getMostPlayed',async(req:Request,res:Response)=>{
        try{
            const result = await getMostPlayed();
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid get all data from database "+error);
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
            res.json("Invalid show data from database "+error);
        }
        
    });
                            ///tokenValidate
    app.put('/products/:id',tokenValidate,async(req:Request,res:Response)=>{
        try{
            const product = {
                name : req.body.name,
                price : req.body.price,
                catagory : req.body.catagory,
                afteroffer : req.body.afteroffer,
                description : req.body.description,
                quantity : req.body.quantity,
                image : req.body.image
            }
            const id : number = parseInt(req.params.id as string);
            const result = await update(id,product);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid update data from database "+error);
        }
    });
                            ///tokenValidate
    app.delete('/products/:id',tokenValidate,async(req:Request,res:Response)=>{
        try{
            const id :number = parseInt(req.params.id);
            const result = await Delete(id);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid delete data from database "+error);
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
            res.json("Invalid get products by required catagory from database "+error);
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
            res.json("cannot get product_id from product model "+error);
        }
    });

    app.post('/limit4',async(req:Request,res:Response)=>{
        try{
            const offset = req.body.offset;
            const products = await getPageProducts(offset);
            res.json(products);
        }
        catch(error){
            res.status(400);
            res.json("cannot get products with offset from product models "+error);
        }
    });
}

export default products_routes;
