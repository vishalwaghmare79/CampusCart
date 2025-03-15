import { Product } from "../models/productSchema.Model.js";
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();

export const createProductController = async (req, res) => {
  try {
    const { name, price, description, category, quantity, shipping } = req.body;

    const file = req.file;
    const userId = req.user._id;

    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });
      case !file:
        return res.status(400).send({ error: "Image is required" });
    }

    const image = {
      url: file.path,
      publicId: file.filename,
    };

    const product = new Product({
      name,
      description,
      price,
      category,
      quantity,
      image,
      shipping,
      createdBy: userId,
    });

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully!",
      product,
    });
  } catch (error) {
    console.error("Error while creating product:", error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error: error.message,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
      const { name, price, description, category, quantity, shipping } = req.body;
      const file = req.file;
      const userId = req.user._id;
      const userRole = req.user.role;

      if (!name || !price || !description || !category || !quantity) {
          return res.status(400).send({ error: "All fields are required" });
      }

      const product = await Product.findById(req.params.id).select("createdBy image");
      if (!product) {
          return res.status(404).send({ success: false, message: "Product not found" });
      }

      if (userRole !== 1 && product.createdBy.toString() !== userId.toString()) {
          return res.status(403).send({
              success: false,
              message: "Unauthorized to update this product",
          });
      }

      let updatedImage = product.image;
      if (file) {
          const result = await cloudinary.uploader.upload(file.path, {
              folder: "products",
          });
          updatedImage = { url: result.secure_url, publicId: result.public_id };
      }

      const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          {
              name,
              description,
              price,
              category,
              quantity,
              shipping,
              image: updatedImage,
          },
          { new: true }
      );

      res.status(200).send({
          success: true,
          message: "Product updated successfully!",
          product: updatedProduct,
      });
  } catch (error) {
      console.error("Error while updating product:", error);
      res.status(500).send({
          success: false,
          message: "Error in updating product",
          error: error.message, 
      });
  }
};

export const getProductController = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null; 

    const filter = userId ? { createdBy: { $ne: userId } } : {};  

    const products = await Product.find(filter)
      .populate('category', 'name _id') 
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    console.error("Error while retrieving products:", error.message);
    res.status(500).json({
      success: false,
      message: "Error in retrieving products",
      error: error.message,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    if (userRole !== 1 && product.createdBy.toString() !== userId.toString()) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized to delete this product",
      });
    }

    if (product.image && product.image.publicId) {
      try {
        const publicId = product.image.publicId;
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting product:", error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const getProductByCategoryController = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const userId = req.user?._id;

    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.max(1, parseInt(req.query.limit)) || 10;

    const filter = {
      category: categoryId,
      ...(userId && { createdBy: { $ne: userId } }),
    };

    const products = await Product.find(filter)
      .populate("category")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments(filter);

    res.status(200).send({
      success: true,
      message: "Products retrieved successfully",
      totalProducts,
      page,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    console.error(
      "Error while retrieving products by category:",
      error.message
    );
    res.status(500).send({
      success: false,
      message: "Error in retrieving products by category",
      error: error.message,
    });
  }
};

export const getUserProductsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;

    const filter = userRole === 1 ? {} : { createdBy: userId };

    const userProducts = await Product.find(filter)
      .populate("category")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "User's products retrieved successfully",
      totalProducts: userProducts.length,
      products: userProducts,
    });
  } catch (error) {
    console.error("Error while retrieving user's products:", error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving user's products",
      error,
    });
  }
};

export const getAllProductsForAdminController = async (req, res) => {
  try {
    if (req.user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized! Only admins can access all products.",
      });
    }

    const allProducts = await Product.find()
      .populate("category")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All products retrieved successfully for admin",
      totalProducts: allProducts.length,
      products: allProducts,
    });
  } catch (error) {
    console.error("Error retrieving all products for admin:", error);
    res.status(500).json({
      success: false,
      message: "Error in retrieving products",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({ _id: productId }).populate(
      "category"
    );

    res.status(200).send({
      success: true,
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.error("Error while retrieving product:", error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving product",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const userId = req.user?._id;

    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required for searching",
      });
    }

    const filter = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
      ...(userId && { createdBy: { $ne: userId } }),
    };

    const result = await Product.find(filter).select("-image");

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in Search Product API:", error.message);
    res.status(500).json({
      success: false,
      message: "Error in Search Product API",
      error: error.message,
    });
  }
};





