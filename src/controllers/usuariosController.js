import { usuarios } from "../data/usuarios.js";
// Controller de categorias (tabela de apoio): listar e cadastrar.
import { prisma } from '../lib/prisma.js';
import { ErroApi } from '../erros.js';

// GET /api/chamados
export async function getUsuarios(req, res) {
  const usuarios = await prisma.usuario.findMany({ orderBy: { id: 'asc' } });
  res.json(usuarios);
}

// GET /api/usuarios/:id
export async function getUsuariosById(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ erro: 'O id precisa ser um número' });
  }
  const usuario = await prisma.usuario.findUnique({ where: { id } });
  if (!usuario) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  res.json(usuario);
}

// POST /api/usuarios
export async function createUsuarios(req, res) {
  // req.body vem vazio (undefined) se o cliente não enviar JSON; ?? {} evita o erro
  const { nome, email, senhaHash } = req.body ?? {};
  if (!nome || !email || !senhaHash) {
    throw new ErroApi(400, 'Dados inválidos', ['Preencha os campos obrigatorios']);
  }
  // campos que não chegaram ficam undefined: o banco usa o valor padrão ou deixa vazio
  const novo = await prisma.usuario.create({
    data: {
      nome,
      email,
      senhaHash,
    },
  });
  res.status(201).json(novo);
}

// PUT /api/usuarios/:id
export async function updateUsuarios(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ erro: 'O id precisa ser um número' });
  }
  const existe = await prisma.usuario.findUnique({ where: { id } });
  if (!existe) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  const dados = req.body ?? {};
  if (dados.nome === '') {
    return res.status(400).json({ erro: 'O campo nome não pode ficar vazio' });
  } else if (dados.email === '') {
    return res.status(400).json({ erro: 'O campo email não pode ficar vazio' });
  } else if (dados.senhaHash === '') {
    return res.status(400).json({ erro: 'O campo senha não pode ficar vazio' });
  }
  // campos que não chegaram ficam undefined, e o Prisma não os altera
  const atualizado = await prisma.usuario.update({
    where: { id },
    data: {
      nome: dados.nome,
      email: dados.email,
      senhaHash: dados.senhaHash,
    },
  });
  res.json(atualizado);
}

// DELETE /api/usuarios/:id
export async function deleteUsuarios(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ erro: 'O id precisa ser um número' });
  }
  const existe = await prisma.usuario.findUnique({ where: { id } });
  if (!existe) {
    return res.status(404).json({ erro: 'Usuário não encontrado' });
  }
  await prisma.usuario.delete({ where: { id } });
  res.status(204).send();
}

/*
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

// POST 
export function createUsuarios(req, res) {
  // req.body vem vazio (undefined) se o cliente não enviar JSON; ?? {} evita o erro
  const { nome, email, senhaHash } = req.body ?? {};
  if (!nome || !email || !senhaHash) {
    return res.status(400).json({ erro: 'Preencha os campos obrigatórios' });
  }
  const novoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
  const novo = {
    id: novoId,
    nome,
    email,
    senhaHash,
    criadoEm: new Date().toISOString(),
  };
  usuarios.push(novo);
  res.status(201).json(novo);
}
  */