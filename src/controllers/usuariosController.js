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