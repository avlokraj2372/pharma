import express from "express";
import {
  fetchMedicinesByCategory,
  getAllMedicineController,
} from "../controller/meditionController.js";
import { getMedicineByIdController } from "../controller/meditionController.js";

const meditionRouter = express.Router();

meditionRouter.get("/", getAllMedicineController);
meditionRouter.get("/:id", getMedicineByIdController);

meditionRouter.get("/category/:categoryId", fetchMedicinesByCategory);

export default meditionRouter;

