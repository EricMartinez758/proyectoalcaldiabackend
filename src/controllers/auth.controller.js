import { pool } from '../db.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
  const { firstname, lastname, dni, email, password } = req.body;

  if (!firstname || !lastname || !dni || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    
    const existingUser = await pool.query(
      `SELECT * FROM users WHERE dni = $1`,
      [dni]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'A user with this ID already exists' });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const result = await pool.query(
      `INSERT INTO users (firstname, lastname, dni, email, password) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [firstname, lastname, dni, email, hashedPassword]
    );

    const newUser = result.rows[0];
    delete newUser.password;


    const token = await createAccessToken({ id: newUser.id_user, dni: newUser.dni });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating the user' });
  }
};


export const login = async (req, res) => {
  const { dni, password } = req.body;

  if (!dni || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    
    const result = await pool.query(
      `SELECT * FROM users WHERE dni = $1`,
      [dni]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    delete user.password;

    
    const token = await createAccessToken({ id: user.id_user, dni: user.dni });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  res.status(200).json({ message: "Successfully logged out" });
};

export const profile = async (req, res) => {
  try {
 
    const userDni = req.users.dni;


    const result = await pool.query(
      "SELECT firstname, lastname, dni, email FROM users WHERE dni = $1",
      [userDni]
    );

 
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const userFound = result.rows[0];

    
    return res.json({
      firstname: userFound.firstname,
      lastname: userFound.lastname,
      dni: userFound.dni,
      email: userFound.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving user profile" });
  }
};
