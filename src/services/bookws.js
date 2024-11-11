// src/services/userws.js

import axios from "axios";

const API_URL = "http://localhost:8080/books";

export const getLivros = async () => {
  try {
    const response = await axios.get(API_URL); 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os livros", error);
    throw error; 
  }
};

export const getDigitais = async () => {
  try {
    const response = await axios.get(`${API_URL}/digitals`); 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os livros digitais", error);
    throw error;
  }
};

export const getFisicos = async () => {
  try {
    const response = await axios.get(`${API_URL}/fisicos`); 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os livros fisicos", error);
    throw error;
  }
};
export const getFuncionarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/funcionarios`); 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os funcionários", error);
    throw error;
  }
};

export const getLivroById = async (id) => {
  try {
    const idLong = parseInt(id,10);
    if (isNaN(idLong)) {
      throw new Error("ID Inválido")
    }
    const response = await axios.get(`${API_URL}/${idLong}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livro", error);
    throw error;
  }
};

// export const getUsuarioByEmail = async (email) => {
//   try {
//     const response = await axios.get(`${API_URL}/email/${email}`);
//     return response.data;
//   } catch (error) {
//     console.error("Erro ao buscar usuário", error);
//     throw error;
//   }
// };

export const addLivro = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar livro", error);
    throw error;
  }
};

export const updateLivro = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar livro", error);
    throw error;
  }
};

export const delLivro = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao desativar livro", error);
    throw error;
  }
};