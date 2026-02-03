import express from 'express';
import authUser from '../middleware/authUser.js';
import authSeller from '../middleware/authSeller.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js';

const ordersRouter = express.Router();

ordersRouter.post('/cod', authUser, placeOrderCOD)
ordersRouter.get('/user', authUser, getUserOrders)
ordersRouter.post('/stripe', authUser, placeOrderStripe)

ordersRouter.get('/seller', authSeller, getAllOrders)

export default ordersRouter