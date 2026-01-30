import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middleware/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';
import { demoSeller } from '../middleware/demoSeller.js';

const productRouter = express.Router()

productRouter.post('/add', authSeller, demoSeller, upload.array("images"), addProduct)
productRouter.get('/list', productList)
productRouter.get('/:id', productById)
productRouter.patch('/stock', authSeller, demoSeller, changeStock)


export default productRouter