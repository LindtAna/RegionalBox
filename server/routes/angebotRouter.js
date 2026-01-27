import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middleware/authSeller.js';
import { addActionProduct, changeStock, actionProductById, actionProductList, changeHighlight} from '../controllers/actionProductController.js';
import { demoSeller } from '../middleware/demoSeller.js';

const angebotRouter = express.Router()

angebotRouter.post('/add', authSeller, upload.array("images"), addActionProduct)
angebotRouter.get('/list', actionProductList)
angebotRouter.get('/id', actionProductById)
angebotRouter.patch('/stock', authSeller, demoSeller, changeStock)
angebotRouter.patch('/highlight', authSeller, demoSeller, changeHighlight)


export default angebotRouter