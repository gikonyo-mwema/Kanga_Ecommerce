import Product from '../models/Product.js';
import cloudinary from '../config/cloudinaryConfig.js';
import fs from 'fs';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

// Create a product with image upload
export const createProduct = async (req, res) => {
  const { name, price, description, countInStock } = req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    if (!result || !result.secure_url) {
      throw new Error('Image upload to Cloudinary failed');
    }

    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Failed to delete local file:', err.message);
    });

    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl: result.secure_url,
      countInStock
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);
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

    let imageUrl = product.imageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      if (!result || !result.secure_url) {
        throw new Error('Image upload to Cloudinary failed');
      }
      imageUrl = result.secure_url;
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to delete local file:', err.message);
      });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.imageUrl = imageUrl;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error.message);
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
    res.status(200).json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

