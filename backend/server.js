import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { protect } from './middleware/authMiddleware.js';
import { admin } from './middleware/roleMiddleware.js';

// Load environment variables
dotenv.config();

// Validate essential environment variables
const requiredEnvVars = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET', 'MONGO_URI', 'JWT_SECRET'];
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`Error: Missing required environment variable ${envVar}`);
        process.exit(1);
    }
});

// Connect to MongoDB
(async () => {
    try {
        await connectDB();
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
})();

// Initialize Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());

// Configure multer for image uploads
const upload = multer({ storage: multer.memoryStorage() });

// Route for uploading images to Cloudinary
app.post('/api/upload', protect, upload.single('image'), (req, res) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error.message);
                return res.status(500).json({ message: 'Failed to upload image' });
            }
            res.json({ url: result.secure_url });
        }
    );
    req.file && uploadStream.end(req.file.buffer);
});

// Protected route to test user authentication
app.get('/api/protected', protect, (req, res) => {
    res.json({ message: `Hello ${req.user.name}, you are authenticated!` });
});

// Admin route, protected by both auth and admin checks
app.use('/api/admin', protect, admin, (req, res) => {
    res.send('Admin Dashboard');
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

