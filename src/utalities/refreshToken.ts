import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import { User } from "../types/users";

dotenv.config();
export async function refreshTheToken(expiredToken: string) {
    try {
      // Verify the validity of the expired token
      const payLoad = jwt.verify(expiredToken,(process.env.TOKEN_SECRET)as string) as User as { [key: string]: any };
      const userData = payLoad.user;
      const newToken = jwt.sign({ user:userData }, (process.env.TOKEN_SECRET)as string,{expiresIn:'15s'});
      return newToken;
    } 
    catch (error) {
        return null;
    }
  }