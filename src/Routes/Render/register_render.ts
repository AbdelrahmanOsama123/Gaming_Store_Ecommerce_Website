import express,{Request,Response} from "express";
import path from 'path';

const userRegister_route = express();

userRegister_route.set("views", path.join(__dirname, "../../../FrontEnd/Register_page"));
userRegister_route.set("view engine", "ejs");
userRegister_route.use(express.static(path.join(__dirname, "../../../FrontEnd/Register_page")));

userRegister_route.get('/register', (req: Request, res: Response) => {
  try {
     res.render('register');
  } catch (error) {
  console.log('cannot get register page ' + error);
  }
});

export default userRegister_route;