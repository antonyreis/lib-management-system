// src/components/Usuarios.js
import React, { useState, useEffect } from "react";
import { getUsers, addUser } from "../services/usuarioService"; // Importa o serviço

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [newUser, setNewUser] = useState({ nome: "", email: "" });

  // Função para carregar os usuários ao montar o componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getUsers(); // Chama o serviço
        setUsuarios(data); // Atualiza o estado com os usuários
      } catch (error) {
        console.error("Erro ao carregar usuários", error);
      }
    };

    fetchUsuarios();
  }, []); // O array vazio significa que isso acontece apenas uma vez (quando o componente é montado)

  // Função para adicionar um novo usuário
  const handleAddUser = async () => {
    try {
      const addedUser = await addUser(newUser); // Chama o serviço para adicionar
      setUsuarios([...usuarios, addedUser]); // Adiciona o novo usuário à lista
      setNewUser({ nome: "", email: "" }); // Limpa os campos
    } catch (error) {
      console.error("Erro ao adicionar usuário", error);
    }
  };

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.nome}</li>
        ))}
      </ul>
      <h2>Adicionar Usuário</h2>
      <input
        type="text"
        value={newUser.nome}
        onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
        placeholder="Nome"
      />
      <input
        type="email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        placeholder="Email"
      />
      <button onClick={handleAddUser}>Adicionar</button>
    </div>
  );
};

export default Usuarios;
