import { Router } from 'express';
import { getCategorias } from "../controllers/categoriasController.js";
import { getCategoriasById } from "../controllers/categoriasController.js";
import { createCategorias } from "../controllers/categoriasController.js";

const router = Router();

router.get("/", getCategorias);
router.get("/:id", getCategoriasById);
router.post("/", createCategorias);

export default router;
