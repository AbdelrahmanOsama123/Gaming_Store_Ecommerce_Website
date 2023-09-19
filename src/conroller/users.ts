import {userStore} from '../models/users';
import { User } from '../types/users';
import  jwt  from "jsonwebtoken";
import redisClient from '../utalities/redis';

const store = new userStore();

export const index = async () =>{
    const users = await store.index();
    return users;
}

export const signUp = async (user:User):Promise<User|null> =>{
    const newUser = await store.create(user);
    if(newUser == null){
        return null;
    }
    const accessToken = jwt.sign({ user: newUser }, (process.env.TOKEN_SECRET)as string,{expiresIn:'15s'});
    const refreshToken = jwt.sign({ user: newUser }, (process.env.TOKEN_SECRET)as string,{expiresIn:'1d'});
    await redisClient.set(newUser.username+"A",accessToken);
    await redisClient.set(newUser.username+"R",refreshToken);
    return newUser;
}

export const signIn = async (username:string,password:string) => 
{
    try{
        const newUser = await store.authenticate(username, password);
        if(newUser == null){
            return null;
        }
        const accessToken = jwt.sign({ user: newUser }, (process.env.TOKEN_SECRET)as string,{expiresIn:'15s'});
        const refreshToken = jwt.sign({ user: newUser }, (process.env.TOKEN_SECRET)as string,{expiresIn:'1d'});
        await redisClient.set(username+"A",accessToken);
        await redisClient.set(username+"R",refreshToken);
        return newUser;
    }   
    catch(error){
        throw new Error('error'+error);
    }
}

export const destroy = async(id :number):Promise<User> =>{
    const result = await store.delete(id);
    return result;
}

export const getUserID = async(username:string):Promise<number>=>{
    const result = await store.getUserID(username);
    return result;
}

export const getUserData = async(userId:number):Promise<number>=>{
    const result = await store.getUserData(userId);
    return result;
}