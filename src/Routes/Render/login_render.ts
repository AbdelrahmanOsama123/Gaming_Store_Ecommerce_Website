import express,{Request,Response} from "express";
import path from 'path';

const login_route = express();

login_route.set("views", path.join(__dirname, "../../../FrontEnd/Login_page"));
login_route.set("view engine", "ejs");
login_route.use(express.static(path.join(__dirname, "../../../FrontEnd/Login_page")));

login_route.get('/login', (req: Request, res: Response) => {
    try {
      res.render('login');
    } catch (error) {
        console.log('cannot get login page ' + error);
      }
});
    
export default login_route;