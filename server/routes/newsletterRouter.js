import express from 'express';
import { addEmail, getEmails, downloadEmailsCSV, toggleActive } from '../controllers/newsLetterController.js';
import authSeller from '../middleware/authSeller.js';
import { demoSeller } from '../middleware/demoSeller.js';

const newsletterRouter = express.Router();

newsletterRouter.post('/add', addEmail);

newsletterRouter.get('/list', getEmails);
newsletterRouter.patch('/toggle/:id', authSeller, demoSeller, toggleActive);
newsletterRouter.get('/download', authSeller, demoSeller, downloadEmailsCSV);

export default newsletterRouter