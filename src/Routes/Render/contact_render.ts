import express,{Request,Response} from "express";
import path from 'path';
import tokenValidate from '../../Middleware/tokenValidate';

const contact_route = express();

contact_route.set("views", path.join(__dirname, "../../../FrontEnd/"));
contact_route.set("view engine", "ejs");
contact_route.use(express.static(path.join(__dirname, "../../../FrontEnd/")));

contact_route.get('/contact',tokenValidate,(req: Request, res: Response) => {
    try {
      res.render('contact');
    } catch (error) {
        console.log('cannot get contact page ' + error);
      }
});

export default contact_route;