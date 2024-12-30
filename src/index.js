import express from "express";
import userRoutes from "./routes/users.routes.js"
import { PORT } from "./config.js";

const app = express();
app.use(express.json());
app.use(userRoutes);

// Iniciar el servidor
app.listen(PORT);
console.log("Server on port", PORT)
