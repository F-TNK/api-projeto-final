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

export default app;
