import { Router } from 'express';
import { getUsuarios, getUsuariosById, createUsuarios } from "../controllers/usuariosController.js";

const router = Router();

router.get("/", getUsuarios);
router.get("/:id", getUsuariosById);
router.post("/", createUsuarios)

export default router;
