import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import { connectCloudinary } from './configs/cloudinary.js';
import userRouter from './routes/userRouter.js';
import sellerRouter from './routes/sellerRouter.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import addressRouter from './routes/addressRouter.js';
import ordersRouter from './routes/ordersRouter.js';

const app = express();
const port = process.env.PORT || 4000;

connectCloudinary();
await connectDB()

//Allow multuple origins
const allowedOrigins = ['http://localhost:5173']

//Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))



app.get('/', (req, res) => res.send('API is working'))
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/orders', ordersRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})