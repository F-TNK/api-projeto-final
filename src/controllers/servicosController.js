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
