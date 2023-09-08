import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import users_routes from './Routes/users';
import orders_routes from './Routes/orders';
import products_routes from './Routes/products';
import dashboad_routes from './Routes/dashboard/ordersDashboard';
import login_route from './Routes/Render/login_render';
import userRegister_route from'./Routes/Render/register_render';
import home_route from './Routes/Render/home_render';
import shop_route from './Routes/Render/shop_render';
import productDetails_route from './Routes/Render/productDetails_render';
import contact_route from './Routes/Render/contact_render';
import addProductRoute from './Routes/Render/addProduct_render';
import cookieParser from 'cookie-parser';
import cart_route from './Routes/Render/cart_render';
import cart_routes from './Routes/cart';
import cartItems_route from './Routes/cartItems';
import orderItems_route from './Routes/orderItems';
import profile_route from './Routes/Render/profile_render';

const app = express();

/// Using body parser Middle ware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(cookieParser());

users_routes(app);
orders_routes(app);
products_routes(app);
dashboad_routes(app);
cart_routes(app);
cartItems_route(app);
orderItems_route(app);

app.use('/',userRegister_route);
app.use('/',login_route);
app.use('/',home_route);
app.use('/',shop_route);
app.use('/',productDetails_route);
app.use('/',contact_route);
app.use('/',addProductRoute);
app.use('/',cart_route);
app.use('/',profile_route);

const port = 8000;
const host = '127.0.0.1';

app.listen(port,listening);
function listening(){
    console.log(`server running on localhost: ${port}`);
    console.log(`Server is running on http://${host}:${port}/login`);
} 
export default app;
