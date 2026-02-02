import express from 'express';
import { addEmail } from '../controllers/newsLetterController.js';

const newsletterRouter = express.Router();

newsletterRouter.post('/add', addEmail)

export default newsletterRouter