import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import addressRouter from './routes/addRoutes.js';
import orderRouter from './routes/orderRoutes.js';


const app=express();
const port = process.env.PORT || 3000;

await connectDB();

const allowedOrigins=['http://localhost:5173']

//middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:allowedOrigins,credentials:true}))



app.get('/',(req,res)=> res.send("Hello Abhay!"));
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/address',addressRouter);
app.use('/api/order',orderRouter);

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})