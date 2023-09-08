import express,{Request,Response} from "express";
import path from 'path';
import tokenValidate from '../../Middleware/tokenValidate';
import isAdmin from "../../Middleware/isAdmin";

const addProductRoute = express(); 

addProductRoute.set("views", path.join(__dirname, "../../../FrontEnd"));
addProductRoute.set('view engine','ejs');
addProductRoute.use(express.static(path.join(__dirname, "../../../FrontEnd/")));

addProductRoute.get('/addProduct',tokenValidate,isAdmin, (req: Request, res: Response) => {
    try{
        res.render('addProduct');
    }
    catch (error) {
        console.log('cannot get add Product page ' + error);
      }
});

export default addProductRoute;
