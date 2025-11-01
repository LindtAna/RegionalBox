import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middleware/authSeller.js';
import { addActionProduct, changeStock, actionProductById, actionProductList, changeHighlight} from '../controllers/actionProductController.js';

const angebotRouter = express.Router()

angebotRouter.post('/add', authSeller, upload.array("images"), addActionProduct)
angebotRouter.get('/list', actionProductList)
angebotRouter.get('/id', actionProductById)
angebotRouter.patch('/stock', authSeller, changeStock)
angebotRouter.patch('/highlight', changeHighlight)


export default angebotRouter