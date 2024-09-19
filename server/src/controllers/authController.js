const { User } = require("../models/userSchema.Model");
const { Order } = require("../models/orderSchema.Model");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const JWT = require("jsonwebtoken");

// Controller for handling user signup
const registerController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    // Validate
    if (!name) {
      return res.send({ error: "Name is required" });
    }

    if (!email) {
      return res.send({ error: "Email is required" });
    }

    if (!password) {
      return res.send({ error: "Password is required" });
    }

    if (!phone) {
      return res.send({ error: "Phone number is required" });
    }

    if (!address) {
      return res.send({ error: "Address is required" });
    }

    // Check if the email is already associated with an existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    // Securely hash the user's password before storing it
    const hashedPassword = await hashPassword(password);

    // Create a new User instance with the provided data
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password, not the plain text one
      address,
      phone,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Respond with a success message and the newly created user data
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);

    // Return a 500 status code indicating a server-side error
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// Login controller to handle user login requests
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
     if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password", 
      });
    }

    // Find the user by email in the database
    const user = await User.findOne({ email });
    
    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered.",
      });
    }

    // Compare the provided password with the stored hashed password
    const match = await comparePassword(password, user.password);
    
    // If the passwords don't match, return a 401 error
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password.",
      });
    }

    // Generate a JWT token with the user's ID and a secret key
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5d",
    });

    // Respond with a success message, user details and token
    res.status(200).send({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id, 
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        phone: user.phone
      },
      token, // JWT token
    });
  } catch (error) {
    // Log any errors and respond with a 500 Internal Server Error
    console.error("Error logging in user:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Controller for handling admin authentication verification
const adminAuthController = (req, res) => {
  res.status(200).json({ ok: true });
};

// Controller function to handle user authentication check
const userAuthController = (req, res) => {
  res.status(200).json({ ok: true });
};

// Get user Orders Controller
const getOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate("products", "-image")
      .populate("buyer", "name");
    
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error while getting orders',
      error,
    });
  }
};

// Get All Orders Controller
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products", "-image")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error while getting orders',
      error,
    });
  }
};

// order status controller 
const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params; 
    const { status } = req.body; 
    
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId, 
      { status }, 
      { new: true } 
    );
    
    res.status(200).send({
      success: true,
      message: 'Order updated successfully',
      order: updatedOrder 
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error while updating order',
      error
    });
  }
};


module.exports = { registerController, loginController, adminAuthController, userAuthController, getOrdersController, getAllOrdersController, orderStatusController };


