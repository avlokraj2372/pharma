// controllers/prescription.js
import db from '../config/db.js';

export const addPrescription = async (req, res) => {
  try {
    const { status, date, u_id } = req.body;
    const file = req.file; // The uploaded file is available in req.file

    // Check if a file was uploaded
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Get the file path
    const filePath = file.path; // Path to the uploaded file

    // SQL query to insert prescription details into the database
    const query = `INSERT INTO prescription (status, date, file_path, u_id) VALUES (?, ?, ?, ?)`;
    
    db.query(query, [status, date, filePath, u_id], (err, result) => {
      if (err) {
        console.error("Failed to add prescription:", err);
        return res.status(500).json({ error: "Failed to add prescription" });
      }
      res.status(200).json({ message: "Prescription added successfully", pres_id: result.insertId });
    });
  } catch (error) {
    console.error("Error in adding prescription:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
