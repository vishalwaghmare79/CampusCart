import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";

// Ensure the uploads directory exists
const uploadDir = path.join(path.resolve(), "backend/src/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  cloudinary.uploader.upload(req.file.path, (error, result) => {
    // Delete the temporary file
    fs.unlink(req.file.path, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Error deleting temporary file:", unlinkErr);
      }
    });

    if (error) {
      return next(error);
    }

    req.file.path = result.url;
    req.file.filename = result.public_id;
    next();
  });
};

export { upload, uploadImage };
