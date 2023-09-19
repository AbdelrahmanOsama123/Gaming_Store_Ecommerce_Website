import express,{Request,Response} from "express";
import {User} from "../types/users";
import {index,getUserData,destroy,signUp,signIn,getUserID} from '../conroller/users'
import tokenValidate from "../Middleware/tokenValidate";
import isAdmin from "../Middleware/isAdmin";
import redisClient from "../utalities/redis";

const users_routes = (app:express.Application) =>{
    app.get('/users/',tokenValidate,isAdmin,async (req:Request,res:Response) =>{
        try{
            const result = await index();
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid get data from db "+error);
        }
    });
    app.get('/userId',tokenValidate,async(req:Request,res:Response)=>{
        try{
            const user_id = req.cookies.user_id;
            const result = await getUserData(user_id);
            res.send(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid get data from db "+error);
        }
    });
    app.delete('/users/:id',tokenValidate,isAdmin,async(req:Request,res:Response)=>{
        try{
            const id = parseInt((req.params.id)as string);
            const result = await destroy(id);
            res.send(result);
        }
        catch(error){
            res.status(400);
            res.json("Invalid delete data from db "+error);
        }
    });

    app.post('/users', async(req, res) =>{
    try{
        
        const user : User = {
            email : req.body.email,
            username :req.body.username,
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            password :req.body.password,
            confirm_password : req.body.confirmPassword,
            isadmin : req.body.isAdmin,
        }
        const token = await signUp(user);
        if(token==null){
            res.json(token); 
        }
        else{
            const user_id = await getUserID(user.username);

            res.cookie('username',user.username);
            res.cookie('email',user.email);
            res.cookie('user_id',user_id);
            res.json(token);  
        }
       
    }
    catch(err){
        res.status(400);
        res.json('error => '+err);
    }
});
    app.post('/authenticate',async (req:Request,res:Response)=>{
        try { 
            const username = req.body.username;
            const password = req.body.password;
            
            const User = await signIn(username,password);

            if(User!= null){
                const user_id = await getUserID(username);
                const email = User.email;

                res.cookie('user_id',user_id);
                res.cookie('username',username);
                res.cookie('email',email);

                res.json({
                    status:'success',
                    isadmin : User.isadmin 
                });
            }
            else{
                res.json({
                    status:'failed',
                });
            }
        }
        catch(error) { 
            res.status(401);
            res.json('error => '+error); 
        } 
    });
    app.get('/logout',async(req:Request,res:Response)=>{
        try{
            const username = req.cookies.username;
            redisClient.DEL(username+"A");
            redisClient.DEL(username+"R");
            res.clearCookie('username', { path: '/' });
            res.json('cleared cookie');
        }
        catch(error){
            res.status(400);
            res.json('cannot clear the cookie from client side');
        }
    })
}

export default users_routes;