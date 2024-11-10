import axios from "axios";

const API_URL = "http://localhost:8080/users";

export const getUsuarios = async () => {
  try {
    const response = await axios.get(API_URL); 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os usuários", error);
    throw error; 
  }
};

export const getClientes = async () => {
  try {
    const response = await axios.get(`${API_URL}/clientes`); 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os clientes", error);
    throw error;
  }
};

export const getAdministradores = async () => {
  try {
    const response = await axios.get(`${API_URL}/administradores`); 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os administradores", error);
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

export const getUsuarioById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário", error);
    throw error;
  }
};

export const addUsuario = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar usuário", error);
    throw error;
  }
};

export const updateUsuario = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário", error);
    throw error;
  }
};

export const delUsuario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao desativar usuário", error);
    throw error;
  }
};