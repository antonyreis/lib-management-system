// src/services/usuarioService.js
import axios from "axios";

const API_URL = "http://localhost:8080/users"; // Altere conforme necessário

// Função para pegar todos os usuários
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Retorna os dados recebidos da API
  } catch (error) {
    console.error("Erro ao buscar os usuários", error);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

// Função para adicionar um novo usuário
export const addUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data; // Retorna o usuário cadastrado
  } catch (error) {
    console.error("Erro ao cadastrar usuário", error);
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};
