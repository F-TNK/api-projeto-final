// validacao/servicoValidacao.js: confere os dados antes de gravar no banco.
// Junta todos os problemas numa lista e responde 400 com todos eles de uma vez.
import { ErroApi } from '../erros.js';

// parcial = true no PUT: só confere os campos que chegaram
export function validarServico(dados, parcial = false) {
  const erros = [];
  if (!parcial || dados.nome !== undefined) {
    if (typeof dados.nome !== 'string' || dados.nome.trim() === '') erros.push('nome é obrigatório e precisa ser um texto');
  }
  if (dados.email !== undefined) {
    if (typeof dados.email !== 'string' || dados.email.trim() === '') erros.push('email é obrigatório');
  }
  if (dados.senhaHash !== undefined) {
    if (typeof dados.senhaHash !== 'string' || dados.senhaHash.trim() === '') erros.push('senha é obrigatório');
  }
  if (erros.length > 0) {
    throw new ErroApi(400, 'Dados inválidos', erros);
  }
}

// Converte o :id da rota em número. Se não for um inteiro positivo, responde 400.
export function lerId(texto) {
  const id = Number(texto);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ErroApi(400, 'O id precisa ser um número inteiro positivo');
  }
  return id;
}