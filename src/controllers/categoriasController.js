import { categorias } from "../data/categorias.js";

// GET Categorias
export function getCategorias(req, res) {
  res.json(categorias);
}

export function getCategoriasById(req, res) {
  const id = parseInt(req.params.id);
  const categoria = categorias.find((c) => c.id === id);
  if (categoria) {
    res.json(categoria);
  } else {
    return res.status(404).json({ error: "Serviço não encontrado" });
  }
}
