const { Product } = require("../models/productSchema.Model");
const slugify = require("slugify");
const { Order } = require("../models/orderSchema.Model");
const fs = require("fs");
const braintree = require("braintree");
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
    const { name, price, description, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;
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
      case !image || image.size > 1048576: // 1MB = 1048576 bytes
        return res
          .status(400)
          .send({ error: "Image is required and should be less than 1MB" });
    }

    // Creating the product
    const product = new Product({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      shipping,
      createdBy: userId, // Associate product with the logged-in user
    });

    // If an image is uploaded, save it to the product
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }

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
    let filter = {};

    // Exclude user's own products if they are logged in
    if (req.user) {
      const userId = req.user._id;
      filter = { createdBy: { $ne: userId } };
    }

    // Apply category filter if provided
    const category = req.query.category;
    if (category) {
      filter.category = category;
    }

    // Parse page and limit, ensure they are positive integers
    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.max(1, parseInt(req.query.limit)) || 10;

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
    console.error("Error while retrieving products:", error.message);
    res.status(500).send({
      success: false,
      message: "Error in retrieving products",
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
      .select("-image")
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

const getSingleProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const product = await Product.findOne({ _id: productId })
      .populate("category")
      .select("-image")

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

// Get photo
const productImageController = async (req, res) => {
  try {    
    const product = await Product.findById(req.params.id).select("image");
    if (product && product.image && product.image.data) {
      res.set("Content-Type", product.image.contentType);
      return res.send(product.image.data);
    }
    return res.status(404).send({
      success: false,
      message: "Image not found",
    });
  } catch (error) {
    console.error("Error while retrieving product image:", error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving product image",
      error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const userId = req.user._id;
    const product = await Product.findById(req.params.id).select("-image");

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

    // Delete the product if ownership is confirmed
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { name, price, description, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;
    const userId = req.user._id;

    // Validation
    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!description)
      return res.status(400).send({ error: "Description is required" });
    if (!category)
      return res.status(400).send({ error: "Category is required" });
    if (!quantity)
      return res.status(400).send({ error: "Quantity is required" });
    if (!image || image.size > 1048576)
      return res
        .status(400)
        .send({ error: "Image is required and should be less than 1MB" });

    // Fetch the product and check ownership
    const product = await Product.findById(req.params.id);

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
        message: "Unauthorized to update this product",
      });
    }

    // Update product details
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
      },
      { new: true } // Return the updated product
    );

    // If an image is uploaded, update it
    if (image) {
      updatedProduct.image.data = fs.readFileSync(image.path);
      updatedProduct.image.contentType = image.type;
    }

    await updatedProduct.save();

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
        console.error('Error generating Braintree token:', error);
        res.status(500).send({ error: 'Error generating Braintree token.' });
      } else {
        res.json({ clientToken: response.clientToken });
      }
    });
  } catch (error) {
    console.error('Error generating Braintree token:', error);
    res.status(500).send({ error: 'Internal server error.' });
  }
};

// payment
const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce, total } = req.body;

    if (!cart || !nonce || !total) {
      return res.status(400).send({ error: 'Invalid request data.' });
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
          console.error('Braintree transaction error:', error);
          return res.status(500).send({ error: 'Transaction failed.' });
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
            console.error('Error saving order:', saveError);
            return res.status(500).send({ error: 'Error saving order.' });
          }
        } else {
          console.error('Transaction error:', result?.message);
          return res.status(500).send({ error: result?.message || 'Transaction failed.' });
        }
      }
    );
  } catch (error) {
    console.error('Error processing payment:', error);
    return res.status(500).send({ error: 'Internal server error.' });
  }
};


module.exports = {
  createProductController,
  getProductController,
  getUserProductsController,
  getSingleProductController,
  productImageController,
  deleteProductController,
  updateProductController,
  braintreeTokenController,
  braintreePaymentController,
};
