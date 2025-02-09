const { Product } = require("../models/productSchema.Model");
const slugify = require("slugify");
const { Order } = require("../models/orderSchema.Model");
const braintree = require("braintree");
const cloudinary = require("../config/cloudinary");
require("dotenv").config();

// payment gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHNT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const createProductController = async (req, res) => {
  try {
    const { name, price, description, category, quantity, shipping } = req.body;
    const file = req.file;
    const userId = req.user._id;

    // Validation
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
      case !file || file.size > 1048576:
        return res
          .status(400)
          .send({ error: "Image is required and should be less than 1MB" });
    }

    const image = {
      url: file.path,
      publicId: file.filename,
    };

    const product = new Product({
      name,
      slug: slugify(name),
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
      error,
    });
  }
};

// home page
const getProductController = async (req, res) => {
  try {
    const userId = req.user?._id;

    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    const limit =
      parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;

    const filter = userId ? { createdBy: { $ne: userId } } : {};

    const [products, totalProducts] = await Promise.all([
      Product.find(filter)
        .populate("category", "name _id")
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 }),

      Product.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      totalProducts,
      page,
      totalPages: Math.ceil(totalProducts / limit),
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

// filter product by category
const getProductByCategoryController = async (req, res) => {
  try {
    const { id: categoryId } = req.params;
    const userId = req.user?._id;

    // Parse page and limit, ensuring they are positive integers
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.max(1, parseInt(req.query.limit)) || 10;

    // Build the filter for the query
    const filter = {
      category: categoryId,
      ...(userId && { createdBy: { $ne: userId } }),
    };

    const products = await Product.find(filter)
      .populate("category")
      .select("-image")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments(filter);

    // Send response with pagination info
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

// user dashboard
const getUserProductsController = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all products created by the logged-in user
    const userProducts = await Product.find({ createdBy: userId })
      .populate("category")
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

const getAllProductsForAdminController = async (req, res) => {
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

const getSingleProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({ _id: productId })
      .populate("category")
      .select("-image");

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

const deleteProductController = async (req, res) => {
  try {
    const userId = req.user._id;
    const product = await Product.findById(req.params.id);

    // Check if the product exists
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the logged-in user is the owner of the product
    if (product.createdBy.toString() !== userId.toString()) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized to delete this product",
      });
    }

    // Delete image from Cloudinary (if exists)
    if (product.image && product.image.publicId) {
      try {
        const publicId = product.image.publicId;
        await cloudinary.api.delete_resources([publicId]);
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }

    // Delete the product from the database
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

const updateProductController = async (req, res) => {
  try {
    const { name, price, description, category, quantity, shipping } = req.body;

    const file = req.file;
    const userId = req.user._id;
    const userRole = req.user.role;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    if (userRole !== 1 && product.createdBy.toString() !== userId.toString()) {
      return res
        .status(403)
        .send({
          success: false,
          message: "Unauthorized to update this product",
        });
    }

    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!description)
      return res.status(400).send({ error: "Description is required" });
    if (!category)
      return res.status(400).send({ error: "Category is required" });
    if (!quantity)
      return res.status(400).send({ error: "Quantity is required" });

    let updatedImage = product.image;
    if (file) {
      updatedImage = {
        url: file.path,
        publicId: file.filename,
      };
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug: slugify(name),
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
      error,
    });
  }
};

// payment api client token
const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (error, response) => {
      if (error) {
        console.error("Error generating Braintree token:", error);
        res.status(500).send({ error: "Error generating Braintree token." });
      } else {
        res.json({ clientToken: response.clientToken });
      }
    });
  } catch (error) {
    console.error("Error generating Braintree token:", error);
    res.status(500).send({ error: "Internal server error." });
  }
};

// payment
const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce, total } = req.body;

    if (!cart || !nonce || !total) {
      return res.status(400).send({ error: "Invalid request data." });
    }

    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (error) {
          console.error("Braintree transaction error:", error);
          return res.status(500).send({ error: "Transaction failed." });
        }

        if (result?.success) {
          try {
            const order = await new Order({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();

            return res.json({ ok: true, order });
          } catch (saveError) {
            console.error("Error saving order:", saveError);
            return res.status(500).send({ error: "Error saving order." });
          }
        } else {
          console.error("Transaction error:", result?.message);
          return res
            .status(500)
            .send({ error: result?.message || "Transaction failed." });
        }
      }
    );
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).send({ error: "Internal server error." });
  }
};

// Search Product Controller
const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const userId = req.user?._id;

    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Keyword is required for searching",
      });
    }

    // Build the search query
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

module.exports = {
  createProductController,
  getProductController,
  getUserProductsController,
  getAllProductsForAdminController,
  getSingleProductController,
  deleteProductController,
  updateProductController,
  braintreeTokenController,
  braintreePaymentController,
  searchProductController,
  getProductByCategoryController,
};
