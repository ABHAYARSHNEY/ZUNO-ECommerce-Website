
import  express  from 'express';
import authUser from '../middlewares/authUser.js';
import { addAddress, getAddresses } from '../controllers/addController.js';

const addressRouter = express.Router();

addressRouter.post('/add',authUser,addAddress);
addressRouter.get('/get/:userId',authUser,getAddresses);

export default addressRouter;