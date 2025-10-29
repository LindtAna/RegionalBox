import express from 'express';
import authUser from '../middleware/authUser.js';
import authSeller from '../middleware/authSeller.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/orderController.js';

const ordersRouter = express.Router();

addressRouter.post('/cod', authUser, placeOrderCOD)
addressRouter.get('/user', authUser, getUserOrders)
addressRouter.get('/seller', authSeller, getAllOrders)

export default ordersRouter