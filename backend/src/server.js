import express from 'express';
import { authRoutes } from './routes/authRoutes.js';
import { categoryRoutes } from './routes/categoryRoute.js';
import { productRoutes } from './routes/productRoute.js';
import { wishlistRoutes } from './routes/wishlistRoute.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { orderRoutes } from './routes/orderRoutes.js';
dotenv.config();
const app = express();


app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/api/v1/auth", authRoutes); // usersRouter
app.use('/api/v1/category', categoryRoutes); // categoryRouter
app.use('/api/v1/product', productRoutes); // productRouter
app.use('/api/v1/wishlist', wishlistRoutes); // wishlistRoute
app.use('/api/v1/order', orderRoutes) // paymentRouter

app.get("/", (req, res) => {
  res.send("Welcome to ShopEase");
});

const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to Database:", error.message);
  });