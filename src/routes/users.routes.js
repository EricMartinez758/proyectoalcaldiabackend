import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
   getEmployees,
   getEmployeeById,
   createEmployee,
   updateEmployee,
   deleteEmployee,
   getComplaints,
   getComplaintById,
   createComplaint,
   updateComplaint,
   deleteComplaint,
} from "../controllers/users.controllers.js";

const router = Router();
//Usuarios
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

//Trabajadores
 router.get("/employees", getEmployees);
 router.get("/employees/:id", getEmployeeById);
 router.post("/employees", createEmployee);
 router.put("/employees/:id", updateEmployee);
 router.delete("/employees/:id", deleteEmployee);
export default router;
// Quejas
router.get("/complaints", getComplaints);
router.get("/complaints/:id", getComplaintById);
router.post("/complaints", createComplaint);
router.put("/complaints/:id", updateComplaint);
router.delete("/complaints/:id", deleteComplaint);