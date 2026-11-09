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

// GET Usuarios
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

// GET Categorias
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

// GET Servicos
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
