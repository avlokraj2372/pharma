// // app.js or index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cartRoutes from './Routes/cartRoutes.js';
import meditionRouter from './Routes/medicineRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import prescriptionRoutes from './Routes/prescription.js';  // Import prescription routes

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/cart', cartRoutes);
app.use('/api/medicine', meditionRouter);
app.use('/api/auth', authRoutes);
app.use('/api', prescriptionRoutes);  // Add the prescription route here

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
