import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();  // Loads environment variables from .env file

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//cmodule.exports = cloudinary;
export default cloudinary;

