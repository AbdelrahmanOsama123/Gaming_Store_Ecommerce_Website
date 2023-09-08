/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request,Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../types/users";
import redisClient from "../utalities/redis";
// eslint-disable-next-line @typescript-eslint/ban-types
const isAdmin = async(req:Request,res:Response,next:Function) =>{
    try{
        const username = req.cookies.username;
        const token = await redisClient.get(username+'A'); 
        const payLoad = jwt.verify(token as string,(process.env.TOKEN_SECRET)as string) as User as { [key: string]: any };
        if(payLoad.user.isadmin == true){
            next();
        }else{
            res.status(401);
            res.json('You are not authorized');
        }
    }
    catch(error){
        res.status(401);
        res.json('You are not authorized');
    }
}

export default isAdmin;