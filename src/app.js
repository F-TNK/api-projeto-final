// app.js: monta a aplicação Express (rotas, middlewares).
// Quem liga o servidor é o server.js. Separar os dois facilita testes e o deploy.
import express from "express";

const app = express();

// Permite receber JSON no corpo das requisições (usaremos no próximo encontro)
app.use(express.json());

// Rota de saúde: usada por serviços de nuvem para saber se a API está viva
app.get("/health", (req, res) => {
  res.json({ status: "ok", horario: new Date().toISOString() });
});

// Rota raiz: apresenta a API
app.get("/", (req, res) => {
  res.json({
    nome: "API do meu projeto",
    versao: "0.1.0",
    rotas: ["GET /health"],
  });
});

// Dados em memória (no encontro 4 vão para o PostgreSQL)
const chamados = [
  { id: 1, titulo: "Monitor piscando", prioridade: "media", status: "aberto" },
  {
    id: 2,
    titulo: "Sem internet na doca 3",
    prioridade: "alta",
    status: "em_andamento",
  },
  {
    id: 3,
    titulo: "Senha do ERP bloqueada",
    prioridade: "alta",
    status: "resolvido",
  },
];

// Lista
app.get("/api/chamados", (req, res) => {
  res.json(chamados);
});

const clientes = [
  { id: 1, titulo: "Jorge", cpf: "99988877766", status: "ativo" },
];

app.get("/api/clientes", (req, res) => {
  res.json(clientes);
});

app.get("/api/clientes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = clientes.find((c) => c.id === id);
  if (cliente) {
    res.json(cliente);
  } else {
    return res.status(404).json({ error: "Cliente não encontrado" });
  }
});

// tabela usuarios
const usuarios = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana.silva@email.com",
    senhaHash: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGg8623i",
    criadoEm: "2026-11-09T10:30:00Z",
  },
  {
    id: 2,
    nome: "Bruno Oliveira",
    email: "bruno.oliveira@email.com",
    senhaHash: "$2b$10$q.x8w3.2.0X2g4H5rT6YuO5aZ9x8w7v6u5t4s3r2q1p0o9n8m7l6k",
    criadoEm: "2026-11-09T11:15:20Z",
  },
  {
    id: 3,
    nome: "Carla Souza",
    email: "carla.souza@email.com",
    senhaHash: "$2b$10$9v8u7t6s5r4q3p2o1n0m9l8k7j6i5h4g3f2e1d0c9b8a7z6y5x4w3",
    criadoEm: "2026-11-09T14:45:05Z",
  },
];

app.get("/api/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/api/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find((c) => c.id === id);
  if (usuario) {
    res.json(usuario);
  } else {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
});

// Tabela Categorias
const categorias = [
  {
    id: 1,
    nome: "Cabelo",
  },
  {
    id: 2,
    nome: "Barba",
  },
  {
    id: 3,
    nome: "Estética",
  },
];

app.get("/api/categorias", (req, res) => {
  res.json(categorias);
});

app.get("/api/categorias/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const categoria = categorias.find((c) => c.id === id);
  if (categoria) {
    res.json(categoria);
  } else {
    return res.status(404).json({ error: "Serviço não encontrado" });
  }
});

// Tabela servicos
const servicos = [
  {
    id: 1,
    nome: "Corte Masculino",
    duracaoMin: 30,
    preco: 45.0,
    status: "ativo",
    categoriaId: 1,
    criadoEm: "2026-11-09T10:00:00Z",
  },
  {
    id: 2,
    nome: "Barba Completa",
    duracaoMin: 45,
    preco: 35.5,
    status: "ativo",
    categoriaId: 2,
    criadoEm: "2026-11-09T10:15:00Z",
  },
  {
    id: 3,
    nome: "Limpeza de Pele",
    duracaoMin: 60,
    preco: 120.0,
    status: "inativo",
    categoriaId: 3,
    criadoEm: "2026-11-09T11:30:00Z",
  },
];

app.get("/api/servicos", (req, res) => {
  res.json(servicos);
});

app.get("/api/servicos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const servico = servicos.find((c) => c.id === id);
  if (servico) {
    res.json(servico);
  } else {
    return res.status(404).json({ error: "Serviço não encontrado" });
  }
});

export default app;
