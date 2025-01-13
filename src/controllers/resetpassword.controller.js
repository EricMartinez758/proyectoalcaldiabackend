import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import bcrypt from "bcryptjs";

export const requestPasswordReset = async (req, res) => {
  const { dni } = req.body;

  if (!dni) {
    return res.status(400).json({ message: "DNI is required" });
  }

  try {
    
    const result = await pool.query("SELECT * FROM users WHERE dni = $1", [dni]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    
    const resetToken = jwt.sign({ dni: user.dni }, TOKEN_SECRET, {
      expiresIn: "15m", 
    });

   
    res.json({ message: "Password reset token generated", resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating password reset token" });
  }
};


export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password are required" });
  }

  try {
    
    const decoded = jwt.verify(token, TOKEN_SECRET);

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

 
    await pool.query(
      "UPDATE users SET password = $1 WHERE dni = $2",
      [hashedPassword, decoded.dni]
    );

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Token has expired" });
    }
    res.status(500).json({ message: "Error resetting password" });
  }
};
