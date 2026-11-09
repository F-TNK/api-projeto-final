import { usuarios } from "../data/usuarios.js";

// GET Usuarios
export function getUsuarios(req, res) {
  res.json(usuarios);
}

export function getUsuariosById(req, res) {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((c) => c.id === id);
  if (usuario) {
    res.json(usuario);
  } else {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
}
