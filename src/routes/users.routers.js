import { Router } from "express";
const router = Router();
import {pool} from "../db.js"
router.get('/users',(req,res)=>{
    res.send('obteniendo usuarios')
})

router.post("/users", (req, res) => {
  res.send("Usuario creado");
});


router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send("Usuario con ID: ${id}");
});


router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send("Usuario con ID: ${id} actualizado");
});

router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send("Usuario con ID: ${id} eliminado");
});


export default router;