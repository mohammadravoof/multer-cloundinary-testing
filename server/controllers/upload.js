import cloudinary from '../cloudinary.js';
import { Readable } from 'stream';
import upload from '../multer.js';

// Multer upload middleware
const multerMiddleware = upload.single('image');

// Uploading in Stream to Cloudinary because of memoryStorage() in multer
const handleUpload = (req, res) => {
    // Check if req.file is defined
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create a readable stream from the buffer
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null); // Signal the end of the stream
    console.log(req.file.name);

    // Create an upload stream for Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
            return res
                .status(500)
                .json({ error: 'Upload failed', details: error });
        }
        res.json({ url: result.secure_url }); // Respond with the URL of the uploaded image
    });

    // Pipe the buffer stream to the upload stream
    bufferStream.pipe(uploadStream);
};

export { handleUpload, multerMiddleware };
