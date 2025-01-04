import { pool } from "../db.js";
export const getUsers = async (req, res) => {
    try {
      const response = await pool.query("SELECT * FROM users ORDER BY id ASC");
      res.status(200).json(response.rows);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  export const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      if (response.rows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(response.rows[0]);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  export const createUser = async (req, res) => {
    const { firstname, lastname, password, phone, email, rols_id, statusu_id, dni } = req.body;
  
    // Verifica si todos los campos obligatorios están presentes
    if (!firstname || !lastname || !password || !email || !dni) {
      return res.status(400).json({ message: "Todos los campos son obligatorios, incluyendo dni" });
    }
  
    try {
      const { rows } = await pool.query(
        "INSERT INTO users (firstname, lastname, password, phone, email, rols_id, statusu_id, dni) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [firstname, lastname, password, phone, email, rols_id, statusu_id, dni]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error("Error al crear usuario:", error.message, error.stack);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  
  export const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, password, phone, email, rols_id, statusu_id } = req.body;
  
    if (!firstname || !lastname || !password || !email || !rols_id || !statusu_id) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
  
    try {
      const { rows } = await pool.query(
        `UPDATE users
         SET firstname = $1, lastname = $2, password = $3, phone = $4, email = $5, rols_id = $6, statusu_id = $7
         WHERE id = $8 RETURNING *`,
        [firstname, lastname, password, phone, email, rols_id, statusu_id, id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [id]);
      if (rowCount === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.sendStatus(204);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
