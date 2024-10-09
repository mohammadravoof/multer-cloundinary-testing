import express from 'express';
import { multerMiddleware, handleUpload } from '../controllers/upload.js';

const router = express.Router();

router.route('/api/upload').post(multerMiddleware, handleUpload);

export default router;
