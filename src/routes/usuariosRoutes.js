import { getUsuarios } from "../controllers/usuariosController";
import { getUsuariosById } from "../controllers/usuariosController";

const router = Router();

router.get("/usuarios", getUsuarios);
router.get("/usuarios/:id", getUsuariosById);

export default router;
