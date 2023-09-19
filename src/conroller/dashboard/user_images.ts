import { userImageStore } from "../../models/dashboard/user_images";
import { User } from "../../types/users";

const store = new userImageStore();

export const saveImage = (user_id:number,imagename:string)=>{
    try{
        const result = store.saveImage(user_id,imagename);
        return result;
    }
    
    catch(error){
        throw new Error('cannot get image from models '+error);
    }
}

export const getImage = (user_id:number):Promise<User>=>{
    try{
        const result = store.getImage(user_id);
        return result;
    }
    catch(error){
        throw new Error('cannot get image from models '+error);
    }
}