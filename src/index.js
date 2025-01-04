import express from "express";
import userRoutes from "./routes/users.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import complaintsRoutes from "./routes/complaints.routes.js"
import { PORT } from "./config.js";

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use(employeesRoutes);
app.use(complaintsRoutes);

// Iniciar el servidor
app.listen(PORT);
console.log("Server on port", PORT)
