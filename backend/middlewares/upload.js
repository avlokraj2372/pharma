// middlewares/upload.js
import multer from 'multer';
import path from 'path';

// Set up the storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure 'uploads' folder exists in the root directory of your project
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Save file with a timestamp to avoid name conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only images and PDFs
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  if (extName) {
    cb(null, true);
  } else {
    cb(new Error('Error: Only images and PDFs are allowed'));
  }
};

// Set up multer with the storage and file filter
export const upload = multer({ storage, fileFilter });
