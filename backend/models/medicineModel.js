import db from "../config/db.js";
// Model to get all medicines
export const getAllMedicine = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM medicine";

    db.query(query, (err, results) => {
      if (err) {
        return reject(err); 
      }
      resolve(results); 
    });
  });
};
// model to get medicine by id
export const getMedicineById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM medicine WHERE m_id = ?"; // Adjust column names based on your DB schema

    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err); // Handle error
      }
      if (result.length === 0) {
        return reject(new Error('Medicine not found')); // Handle case where no medicine is found
      }
      resolve(result[0]); // Return the medicine record
    });
  });
};

export const getMedicinesByCategoryId = (categoryId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM medicine WHERE category_id = ?"; // Query to fetch by category_id

    db.query(query, [categoryId], (err, result) => {
      if (err) {
        reject(err); // Reject the promise if there’s an error
      } else {
        resolve(result); // Resolve with the query result
      }
    });
  });
};
