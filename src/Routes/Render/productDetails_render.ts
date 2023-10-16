import express,{Request,Response} from "express";
import path from 'path';
import tokenValidate from "../../Middleware/tokenValidate";
const productDetails_route = express();

productDetails_route.set("views", path.join(__dirname, "../../../FrontEnd"));
productDetails_route.set("view engine", "ejs");
productDetails_route.use(express.static(path.join(__dirname, "../../../FrontEnd/")));

let name:string;
let catagory : string;
let description : string;
let image : string;
productDetails_route.post('/target',tokenValidate, (req: Request, res: Response) => {
    name= req.body.name; 
    catagory = req.body.catagory;
    description = req.body.description;
    image = req.body.image;

    res.json({name,catagory,description,image});
});

productDetails_route.get('/productDetails',tokenValidate, (req: Request, res: Response) => {
  try {
    console.log(image);
    res.render('product-details',{name,catagory,description,image});
  } catch (error) {
      console.log('cannot get login page ' + error);
    }
});

export default productDetails_route;