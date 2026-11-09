import { getServicos } from "../controllers/servicosController";
import { getServicosById } from "../controllers/servicosController";

const router = Router();

router.get("/servicos", getServicos);
router.get("/servicos/:id", getServicosById);

export default router;
