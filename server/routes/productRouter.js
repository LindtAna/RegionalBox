import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middleware/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController';

const productRouter = express.Router()

productRouter.post('/add', authSeller, upload.array("images"),  addProduct)
productRouter.get('/list', productList)
productRouter.get('/id', productById)
productRouter.patch('/stock', authSeller, changeStock)


export default productRouter