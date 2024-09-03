const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, 
      trim: true, 
    },
    email: {
      type: String,
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true, 
    },
    password: {
      type: String,
      required: true, 
      minlength: 8, 
    },
    phone: {
      type: String,
      trim: true, 
    },
    address: {
      type: String,
    },
    role: {
      type: Number,
      default: 0 // Default role is 0 (non-admin)
    }
  }, {timestamps: true} ); 

const User = mongoose.model('User', userSchema);

module.exports = { User };
