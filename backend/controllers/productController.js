import Product from '../models/Product.js';
import cloudinary from '../config/cloudinaryConfig.js';
import fs from 'fs';  // For file system operations, to delete local temp images after upload

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a product with image upload
export const createProduct = async (req, res) => {
  const { name, price, description, countInStock } = req.body;

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    
    // Delete the local image after upload to Cloudinary
    fs.unlinkSync(req.file.path);

    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl: result.secure_url,  // Cloudinary URL
      countInStock
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Update a product with optional image update
export const updateProduct = async (req, res) => {
  const { name, price, description, countInStock } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If an image is uploaded, replace the existing one
    let imageUrl = product.imageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);  // Remove local temp file
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.imageUrl = imageUrl;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};


