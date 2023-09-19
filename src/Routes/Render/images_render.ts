import express,{Request,Response} from "express";
import path from 'path';
import tokenValidate from "../../Middleware/tokenValidate";

const images_route = express();

images_route.use(express.static(path.join(__dirname, "../../../userImages")));
images_route.get('/showImage/:imagename',tokenValidate, (req: Request, res: Response) => {
    try{
        const image_name = req.params.imagename;
        res.contentType('image/PNG');
        res.sendFile(path.join(__dirname, '../../../userImages', image_name))
    }
    catch (error) {
        console.log('cannot get Image  ' + error);
      }
});

images_route.use(express.static(path.join(__dirname, "../../../productImages")));
images_route.get('/showProductImage/:imagename',tokenValidate, (req: Request, res: Response) => {
    try{
        const image_name = req.params.imagename;
        res.contentType('image/PNG');
        res.sendFile(path.join(__dirname, '../../../productImages', image_name))
    }
    catch (error) {
        console.log('cannot get Image  ' + error);
      }
});

export default images_route;
