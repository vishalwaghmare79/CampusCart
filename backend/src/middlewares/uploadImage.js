import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'campus-cart',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif', 'svg', 'bmp', 'tiff'], 
  },
});

export const uploadImage = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 }, 
});
