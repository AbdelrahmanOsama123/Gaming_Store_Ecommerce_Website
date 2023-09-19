import express,{Request,Response} from "express";
import multer from "multer";
import path from "path";
import { saveImage,getImage } from "../../conroller/dashboard/user_images";

let uploadedFilename= '';
const storage = multer.diskStorage({
    destination: function (req:Request, file, next) {
        next(null, 'userImages/'); // Specify the folder where you want to save the files
    },
    filename: function (req:Request, file, next) {
      // Generate a unique filename for the uploaded file (you can modify this logic)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      uploadedFilename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
      next(null, uploadedFilename);
    }
});
const upload = multer({ storage: storage });

const User_image_route = (app:express.Application)=>{
    app.post('/saveImage',upload.single('image'), async(req:Request,res:Response) =>{
        try {
                const user_id = (req.cookies.user_id) as number;
                const result = await saveImage(user_id,uploadedFilename);
                res.json(result);
            }
        catch(error){
            res.status(400);
            res.send('cannot insert data to database '+error);    
        }
    });

    app.get('/getImage',async(req:Request,res:Response)=>{
        try{
            const user_id = (req.cookies.user_id) as number;
            const result = await getImage(user_id);
            res.json(result);
        }
        catch(error){
            res.status(400);
            res.send('cannot get Image from database '+error);
        }
    });
}
export default User_image_route;