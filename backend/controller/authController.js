import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';  // Ensure to import the MySQL connection

// Signup function
const signup = async (req, res) => {
  const { fullName, email, username, password, dob, address, phoneno } = req.body;
  
  try {
    // Check if user already exists (check by email or username)
    const checkUserQuery = 'SELECT * FROM users WHERE email = ? OR username = ?';
    const [results] = await db.promise().query(checkUserQuery, [email, username]);

    if (results.length > 0) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database (u_id is auto incremented)
    const insertUserQuery = 'INSERT INTO users (username, dob, password, email, address, phoneno) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.promise().query(insertUserQuery, [username, dob, hashedPassword, email, address, phoneno]);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup failed:', error);
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};



const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database query failed', error: err });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const user = results[0]; // Assuming there is only one user per username

      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.u_id }, process.env.SECRET_KEY, { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};




export { signup, login };
