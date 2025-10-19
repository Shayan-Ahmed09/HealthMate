import express from 'express';
import { analyzeReport } from './controllers/geminiController.js';
import { authenticate } from './middleware/auth.js';

const router = express.Router();

router.post('/analyze', authenticate, analyzeReport);

export default router;