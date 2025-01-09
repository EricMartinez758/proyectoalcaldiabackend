import express from "express";
import morgan from 'morgan';
import userRoutes from "./routes/users.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import complaintsRoutes from "./routes/complaints.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { PORT } from "./config.js";

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(userRoutes);
app.use(employeesRoutes);
app.use(complaintsRoutes);
app.use("/api", authRoutes);

// Iniciar el servidor
app.listen(PORT);
console.log("Server on port", PORT)
