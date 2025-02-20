import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    url: { 
        type: String, 
        default: "https://via.placeholder.com/150" 
  },
    publicId: { 
        type: String, 
        default: "123" 
    },
  },
},{timestamps: true});

export const Category = mongoose.model("Category", categorySchema);
