import { getAllMedicine, getMedicinesByCategoryId } from "../models/medicineModel.js";
import { getMedicineById } from "../models/medicineModel.js";

// Controller to get all medicines
export const getAllMedicineController = async (req, res) => {
  console.log("Fetching all medicines...");
  try {
    const medicines = await getAllMedicine();
    // console.log(medicines);
    return res.status(200).json(medicines);
  } catch (err) {
    return res.status(500).json({ message: "Error retrieving medicines", err });
  }
};
// Controller to get medicine by ID
export const getMedicineByIdController = async (req, res) => {
  const { id } = req.params; // Extract the ID from the request parameters

  try {
    const medicine = await getMedicineById(id); // Use the model to get the medicine by ID
    return res.status(200).json(medicine); // Return the medicine data
  } catch (err) {
    if (err.message === "Medicine not found") {
      return res.status(404).json({ message: "Medicine not found" }); // Handle not found error
    }
    return res.status(500).json({ message: "Error retrieving medicine", err }); // Handle other errors
  }
};
// for medicine by category 
export const fetchMedicinesByCategory = async (req, res) => {
  const { categoryId } = req.params; // Get categoryId from URL parameters

  try {
    const medicines = await getMedicinesByCategoryId(categoryId); // Call the model function

    if (medicines.length === 0) {
      return res.status(404).json({ message: 'No medicines found for this category' });
    }

    res.json(medicines); // Send the medicines as a JSON response
  } catch (error) {
    console.error("Error fetching medicines by category:", error);
    res.status(500).json({ message: 'Server error' });
  }
};


