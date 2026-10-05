
import  express from 'express';
import authUser from '../middlewares/authUser.js';
import { getOrders, placeOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/cod',authUser,placeOrder);
orderRouter.post('/user',authUser,getOrders);

export default orderRouter;