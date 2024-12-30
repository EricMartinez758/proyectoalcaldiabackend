import { pool } from "../db.js";

// Usuarios

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
  

// Empleados

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

//Queja 
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