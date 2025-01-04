import { pool } from "../db.js";
export const getEmployees = async (req, res) => {
    try {
      const response = await pool.query("SELECT * FROM employees ORDER BY id ASC");
      res.status(200).json(response.rows);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  export const getEmployeeById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const { rows } = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error("Error al obtener empleado:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  export const createEmployee = async (req, res) => {
    const { firstname, lastname, phone, role, status } = req.body;
  
    if (!firstname || !lastname || !phone || !role || !status) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
  
    try {
      const { rows } = await pool.query(
        "INSERT INTO employees (firstname, lastname, phone, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [firstname, lastname, phone, role, status]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error("Error al crear empleado:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  export const updateEmployee = async (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, phone, role, status } = req.body;
  
    if (!firstname || !lastname || !phone || !role || !status) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
  
    try {
      const { rows } = await pool.query(
        "UPDATE employees SET firstname = $1, lastname = $2, phone = $3, role = $4, status = $5 WHERE id = $6 RETURNING *",
        [firstname, lastname, phone, role, status, id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  
  export const deleteEmployee = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const { rowCount } = await pool.query("DELETE FROM employees WHERE id = $1", [id]);
      if (rowCount === 0) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }
      res.sendStatus(204);
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
  