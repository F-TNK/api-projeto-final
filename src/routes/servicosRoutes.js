import { Router } from 'express';
import { getServicos } from "../controllers/servicosController.js";
import { getServicosById } from "../controllers/servicosController.js";
import { createServicos } from "../controllers/servicosController.js";

const router = Router();

router.get("/", getServicos);
router.get("/:id", getServicosById);
router.post("/", createServicos);

export default router;
