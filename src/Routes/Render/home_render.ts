import express,{Request,Response} from "express";
import path from 'path';
import tokenValidate from "../../Middleware/tokenValidate";
const home_route = express();

home_route.set("views", path.join(__dirname, "../../../FrontEnd/"));
home_route.set("view engine", "ejs");
home_route.use(express.static(path.join(__dirname, "../../../FrontEnd/")));

home_route.get('/home', tokenValidate,(req: Request, res: Response) => {
    try {
      res.render('index');
    } catch (error) {
        console.log('cannot get login page ' + error);
      }
});

export default home_route;