import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import cartRoutes from './routes/cartRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import multer from 'multer'; // Import multer for handling file uploads
import cloudinary from 'cloudinary'; // Import Cloudinary
import { protect } from './middleware/authMiddleware.js'; // Import JWT middleware
import { admin } from './middleware/roleMiddleware.js'; // Import role-based middleware

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Use environment variables for security
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();

const app = express();
app.use(express.json()); // To parse incoming JSON requests

// File upload handling using multer
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

// Upload route for images
app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.v2.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
                if (error) return res.status(500).send(error);
                res.json({ url: result.secure_url }); // Send back the image URL
            }
        ).end(req.file.buffer);
    } catch (error) {
        res.status(500).send(error);
    }
});

// A protected route to test authentication
app.get('/api/protected', protect, (req, res) => {
    res.json({ message: `Hello ${req.user.name}, you are authenticated!` });
});

// Route setup
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes); // Add authentication routes
app.use('/api/cart', cartRoutes); // Add cart routes

// Protecting a specific route (example of admin dashboard)
app.use('/api/admin', protect, admin, (req, res) => {
    res.send('Admin Dashboard');
});

// Middleware to handle errors and 404
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));

