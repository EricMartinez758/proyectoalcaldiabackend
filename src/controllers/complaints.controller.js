import { pool } from "../db.js";

export const getComplaints = async (req, res) => {
    try {
      const response = await pool.query("SELECT * FROM complaints ORDER BY id ASC");
      res.status(200).json(response.rows);
    } catch (error) {
      console.error("Error al obtener quejas:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  export const getComplaintById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const { rows } = await pool.query("SELECT * FROM complaints WHERE id = $1", [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Queja no encontrada" });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error("Error al obtener queja:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  export const createComplaint = async (req, res) => {
    const { user_id, problems_id, description, parish_id, address, status_id, complaint_date } = req.body;
  
    if (!user_id || !problems_id || !description || !parish_id || !address || !status_id || !complaint_date) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
  
    try {
      const { rows } = await pool.query(
        "INSERT INTO complaints (user_id, problems_id, description, parish_id, address, status_id, complaint_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [user_id, problems_id, description, parish_id, address, status_id, complaint_date]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error("Error al crear queja:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  export const updateComplaint = async (req, res) => {
    const id = parseInt(req.params.id);
    const { user_id, problems_id, description, parish_id, address, status_id, complaint_date } = req.body;
  
    if (!user_id || !problems_id || !description || !parish_id || !address || !status_id || !complaint_date) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
  
    try {
      const { rows } = await pool.query(
        "UPDATE complaints SET user_id = $1, problems_id = $2, description = $3, parish_id = $4, address = $5, status_id = $6, complaint_date = $7 WHERE id = $8 RETURNING *",
        [user_id, problems_id, description, parish_id, address, status_id, complaint_date, id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Queja no encontrada" });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error("Error al actualizar queja:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  export const deleteComplaint = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const { rowCount } = await pool.query("DELETE FROM complaints WHERE id = $1", [id]);
      if (rowCount === 0) {
        return res.status(404).json({ message: "Queja no encontrada" });
      }
      res.sendStatus(204);
    } catch (error) {
      console.error("Error al eliminar queja:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };