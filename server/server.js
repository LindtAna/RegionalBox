import cookieParser from 'cookie-parser';
import express, { application } from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import { connectCloudinary } from './configs/cloudinary.js';
import userRouter from './routes/userRouter.js';
import sellerRouter from './routes/sellerRouter.js';
import productRouter from './routes/productRouter.js';
import angebotRouter from './routes/angebotRouter.js';
import cartRouter from './routes/cartRouter.js';
import addressRouter from './routes/addressRouter.js';
import ordersRouter from './routes/ordersRouter.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
const port = process.env.PORT || 4000;

connectCloudinary();
await connectDB()

//Allow multuple origins
const allowedOrigins = ['http://localhost:5173']

app.post('/stripe', express.raw({type:'application/json'}), stripeWebhooks)

//Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))



app.get('/', (req, res) => res.send('API is working'))
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/action-product', angebotRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/orders', ordersRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})