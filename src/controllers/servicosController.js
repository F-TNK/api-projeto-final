import { servicos } from "../data/servicos.js";

// GET Servicos
export function getServicos(req, res) {
  res.json(servicos);
}

export function getServicosById(req, res) {
  const id = parseInt(req.params.id);
  const servico = servicos.find((c) => c.id === id);
  if (servico) {
    res.json(servico);
  } else {
    return res.status(404).json({ error: "Serviço não encontrado" });
  }
}

// POST /api/chamados
export function createServicos(req, res) {
  // req.body vem vazio (undefined) se o cliente não enviar JSON; ?? {} evita o erro
  const { nome, duracaoMin, preco, status, categoriaId } = req.body ?? {};
  if (!nome || !duracaoMin || !preco || !categoriaId) {
    return res.status(400).json({ erro: 'Preencha os campos obrigatórios' });
  }
  const novoId = servicos.length > 0 ? servicos[servicos.length - 1].id + 1 : 1;
  const novo = {
    id: novoId,
    nome,
    duracaoMin,
    preco,
    status: status ?? 'ativo',
    categoriaId,
    criadoEm: new Date().toISOString(),
  };
  servicos.push(novo);
  res.status(201).json(novo);
}