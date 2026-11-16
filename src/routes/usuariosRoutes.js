import { Router } from 'express';
import { getUsuarios } from "../controllers/usuariosController.js";
import { getUsuariosById } from "../controllers/usuariosController.js";

const router = Router();

router.get("/", getUsuarios);
router.get("/:id", getUsuariosById);

export default router;
