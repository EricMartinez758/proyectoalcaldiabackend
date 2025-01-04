import { Router } from "express";
import {
    getComplaints,
    getComplaintById,
    createComplaint,
    updateComplaint,
    deleteComplaint,
  } from "../controllers/complaints.controller.js";

const router = Router();
router.get("/complaints", getComplaints);
router.get("/complaints/:id", getComplaintById);
router.post("/complaints", createComplaint);
router.put("/complaints/:id", updateComplaint);
router.delete("/complaints/:id", deleteComplaint);

export default router;