import { getCategorias } from "../controllers/categoriasController";
import { getCategoriasById } from "../controllers/categoriasController";

const router = Router();

router.get("/categorias", getCategorias);
router.get("/categorias/:id", getCategoriasById);

export default router;
