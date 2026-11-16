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
    versao: '0.2.0',
    rotas: [
      'GET /api/categorias',
      'GET /api/categorias/:id',
      'POST /api/categorias',
      'PUT /api/categorias/:id',
      'DELETE /api/categorias/:id',

      'GET /api/servicos',
      'GET /api/servicos/:id',
      'POST /api/servicos',
      'PUT /api/servicos/:id',
      'DELETE /api/servicos/:id',

      'GET /api/usuarios',
      'GET /api/usuarios/:id',
      'POST /api/usuarios',
      'PUT /api/usuarios/:id',
      'DELETE /api/usuarios/:id',
    ],
  });
});

app.use('/api/categorias', categoriasRoutes);
app.use('/api/servicos', servicosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Qualquer rota que não existe: 404 em JSON
app.use((req, res) => {
  res.status(404).json({ erro: `Rota ${req.method} ${req.path} não existe` });
});

// Tratamento de erros: JSON mal escrito ou falha inesperada (sempre por último)
app.use((erro, req, res, next) => {
  if (erro.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido no corpo da requisição' });
  }
  console.error(erro);
  res.status(500).json({ erro: 'Erro interno no servidor' });
});

export default app;


/*
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
*/