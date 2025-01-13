import express from "express";
import morgan from 'morgan';
import userRoutes from "./routes/users.routes.js";
import employeesRoutes from "./routes/employees.routes.js";
import complaintsRoutes from "./routes/complaints.routes.js";
import authRoutes from "./routes/auth.routes.js";
import resetPasswordRoutes from "./routes/resetpassword.routes.js"
import { PORT } from "./config.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(userRoutes);
app.use(employeesRoutes);
app.use(complaintsRoutes);
app.use("/api", authRoutes);
app.use("/api", resetPasswordRoutes);
// Iniciar el servidor
app.listen(PORT);
console.log("Server on port", PORT)
