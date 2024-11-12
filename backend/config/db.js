import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // Your database host
  user: process.env.DB_USER,       // Your database user
  password: process.env.DB_PASSWORD, // Your database password
  database: process.env.DB_NAME,    // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.message);
    return;
  }
  console.log('Connected to the database.');
});

// Export the database connection
export default db;
