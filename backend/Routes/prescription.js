// routes/prescription.js
import express from 'express';
import { upload } from '../middlewares/upload.js';  // Import multer middleware
import { addPrescription } from '../controller/prescription.js';  // Prescription controller

const router = express.Router();

// POST route to upload prescription
// Use the 'upload.single' middleware to handle file uploads
router.post('/prescription', upload.single('prescriptionFile'), addPrescription);

export default router;
