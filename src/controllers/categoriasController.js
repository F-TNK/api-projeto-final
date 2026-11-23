import { categorias } from "../data/categorias.js";
// Controller: as regras de cada operação de chamados. Os dados vêm do banco (Prisma).
import { prisma } from '../lib/prisma.js';
import { ErroApi } from '../erros.js';


// GET /api/categorias
export async function getCategorias(req, res) {
  const categorias = await prisma.categoria.findMany({ orderBy: { nome: 'asc' } });
  res.json(categorias);
}

// GET /api/categorias/:id
export async function getCategoriasById(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ erro: 'O id precisa ser um número' });
  }
  const categoria = await prisma.categoria.findUnique({ where: { id } });
  if (!categoria) {
    return res.status(404).json({ erro: 'Categoria não encontrada' });
  }
  res.json(categoria);
}

// POST /api/categorias
export async function createCategorias(req, res) {
  // req.body vem vazio (undefined) se o cliente não enviar JSON; ?? {} evita o erro
  const { nome } = req.body ?? {};
  if (!nome) {
    throw new ErroApi(400, 'Dados inválidos', ['O campo nome é obrigatório'])
  }
  // campos que não chegaram ficam undefined: o banco usa o valor padrão ou deixa vazio
  const novo = await prisma.categoria.create({
    data: {
      nome,
    },
  });
  res.status(201).json(novo);
}

// PUT /api/categorias/:id
export async function updateCategorias(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ erro: 'O id precisa ser um número' });
  }
  const existe = await prisma.categoria.findUnique({ where: { id } });
  if (!existe) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  const dados = req.body ?? {};
  if (dados.nome === '') {
    return res.status(400).json({ erro: 'O campo nome não pode ficar vazio' });
  }
  // campos que não chegaram ficam undefined, e o Prisma não os altera
  const atualizado = await prisma.categoria.update({
    where: { id },
    data: {
      nome: dados.nome,
    },
  });
  res.json(atualizado);
}

// DELETE /api/categorias/:id
export async function deleteCategorias(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ erro: 'O id precisa ser um número' });
  }
  const existe = await prisma.categoria.findUnique({ where: { id } });
  if (!existe) {
    return res.status(404).json({ erro: 'Categoria não encontrado' });
  }
  await prisma.categoria.delete({ where: { id } });
  res.status(204).send();
}

/*
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
    */