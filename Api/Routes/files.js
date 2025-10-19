import express from 'express';
import { uploadFile, getUserFiles, getFileWithSummary } from './controllers/fileController.js';
import { authenticate } from './middleware/auth.js';
import upload from './middleware/upload.js';

const router = express.Router();

router.post('/upload', authenticate, upload.single('report'), uploadFile);
router.get('/my-files', authenticate, getUserFiles);
router.get('/:id', authenticate, getFileWithSummary);

export default router;