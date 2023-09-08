import express,{Request,Response} from 'express';
import path from 'path';
import tokenValidate from '../../Middleware/tokenValidate';

const profile_route = express();

profile_route.set("views", path.join(__dirname, "../../../FrontEnd/"));
profile_route.set("view engine", "ejs");
profile_route.use(express.static(path.join(__dirname, "../../../FrontEnd/")));

profile_route.get('/profile',tokenValidate,(req: Request, res: Response) => {
    try {
      res.render('profile');
    } catch (error) {
        console.log('cannot get cart page ' + error);
      }
});

export default profile_route;