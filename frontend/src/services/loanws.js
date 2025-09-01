// src/services/loanws.js

import axios from "axios";

const API_URL = "http://localhost:8080/emprestimos";

// Solicitar empréstimo
export const solicitarEmprestimo = async (loanData) => {
  try {
    const response = await axios.post(`${API_URL}/solicitar`, loanData);
    return response.data;
  } catch (error) {
    console.error("Erro ao solicitar empréstimo", error);
    throw error;
  }
};

// Registrar empréstimo
export const registrarEmprestimo = async (loanData) => {
  try {
    const response = await axios.post(`${API_URL}/registrar`, loanData);
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar empréstimo", error);
    throw error;
  }
};

// Devolver livro
export const devolverLivro = async (emprestimoId) => {
  try {
    const response = await axios.put(`${API_URL}/devolver/${emprestimoId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao devolver livro", error);
    throw error;
  }
};

// Listar todos os empréstimos
export const listarEmprestimos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar empréstimos", error);
    throw error;
  }
};

// Listar empréstimos por cliente
export const listarEmprestimosPorCliente = async (clienteId) => {
  try {
    const response = await axios.get(`${API_URL}/cliente/${clienteId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar empréstimos por cliente", error);
    throw error;
  }
};