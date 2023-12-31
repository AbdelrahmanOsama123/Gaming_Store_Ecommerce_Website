/* eslint-disable @typescript-eslint/ban-types */
import { Request,Response } from "express";
import jwt from 'jsonwebtoken';
import redisClient from "../utalities/redis";
import { refreshTheToken } from "../utalities/refreshToken";

const tokenValidate = async(req:Request,res:Response,next:Function) =>{
    const username = req.cookies.username;
    try{
        const accessToken = await redisClient.get(username+"A");
        jwt.verify(accessToken as string,(process.env.TOKEN_SECRET)as string);
        next();
    }
    catch(error){
        if (error instanceof jwt.TokenExpiredError) {
            const refreshToken = await redisClient.get(username+"R");

            const newToken = await refreshTheToken(refreshToken as string);
            if (newToken) {
                await redisClient.set(username + "A", newToken);
                next();
              } 
            else {
                res.redirect('http://127.0.0.1:8000/login');
            }
        }
        else{
            res.redirect('http://127.0.0.1:8000/login');
        }
    }
}

export default tokenValidate;