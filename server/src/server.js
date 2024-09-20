const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const wishlistRoute = require('./routes/wishlistRoute');
const cors = require("cors");
require("dotenv").config();
const app = express();


app.use(cors()); // Enable CORS for all origins
app.use(express.json());

app.use("/api/v1/auth", authRouter); // usersRouter
app.use('/api/v1/category', categoryRoute); // categoryRouter
app.use('/api/v1/product', productRoute); // productRouter
app.use('/api/v1/wishlist', wishlistRoute); // wishlistRoute

// Default route to welcome message
app.get("/", (req, res) => {
  res.send("Welcome to ShopEase");
});

const port = process.env.PORT || 4000;

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to Database:", error.message);
  });
