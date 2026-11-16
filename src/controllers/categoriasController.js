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

// POST /api/chamados
export function createCategorias(req, res) {
  // req.body vem vazio (undefined) se o cliente não enviar JSON; ?? {} evita o erro
  const { nome } = req.body ?? {};
  if (!nome) {
    return res.status(400).json({ erro: 'O campo nome é obrigatório' });
  }
  const novoId = categorias.length > 0 ? categorias[categorias.length - 1].id + 1 : 1;
  const novo = {
    id: novoId,
    nome,
  };
  categorias.push(novo);
  res.status(201).json(novo);
}