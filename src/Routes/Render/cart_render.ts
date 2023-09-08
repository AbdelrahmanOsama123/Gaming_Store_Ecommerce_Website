import express,{Request,Response} from 'express';
import path from 'path';
import tokenValidate from '../../Middleware/tokenValidate';

const cart_route = express();

cart_route.set("views", path.join(__dirname, "../../../FrontEnd/"));
cart_route.set("view engine", "ejs");
cart_route.use(express.static(path.join(__dirname, "../../../FrontEnd/")));

cart_route.get('/cart',tokenValidate,(req: Request, res: Response) => {
    try {
      res.render('cart');
    } catch (error) {
        console.log('cannot get cart page ' + error);
      }
});

export default cart_route;