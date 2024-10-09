import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './routes/upload.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL || true,
        credentials: true,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-type'],
    })
);

//Routes
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
