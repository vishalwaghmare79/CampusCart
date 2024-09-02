const mongoose = require('mongoose');

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
    try {
        const connHost = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB ${connHost.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
