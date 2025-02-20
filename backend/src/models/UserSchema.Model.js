import mongoose from 'mongoose'

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
  },
  otp:
  {
    type: String
  },
  otpExpires: 
  { 
    type: Date 
  }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

