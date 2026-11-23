import { Router } from 'express';
import { getServicos, getServicosById, createServicos } from "../controllers/servicosController.js";

const router = Router();

router.get("/", getServicos);
router.get("/:id", getServicosById);
router.post("/", createServicos);

export default router;
