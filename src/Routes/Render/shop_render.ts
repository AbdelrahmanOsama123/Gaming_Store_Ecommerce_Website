import express,{Request,Response} from "express";
import path from 'path';
import tokenValidate from "../../Middleware/tokenValidate";

const shop_route = express();

shop_route.set("views", path.join(__dirname, "../../../FrontEnd/"));
shop_route.set("view engine", "ejs");
shop_route.use(express.static(path.join(__dirname, "../../../FrontEnd/")));

shop_route.get('/shop', tokenValidate,(req: Request, res: Response) => {
    try {
      ///{counter}
      res.render('shop');
    } catch (error) {
        console.log('cannot get login page ' + error);
      }
});

export default shop_route;