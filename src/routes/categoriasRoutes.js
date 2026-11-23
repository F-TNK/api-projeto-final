import { Router } from 'express';
import { getCategorias, getCategoriasById, createCategorias } from "../controllers/categoriasController.js";

const router = Router();

router.get("/", getCategorias);
router.get("/:id", getCategoriasById);
router.post("/", createCategorias);

export default router;
