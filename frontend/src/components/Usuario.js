import React, { useState, useEffect } from "react";
import * as userService from "../services/userws"; 

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [id, setId] = useState("");
  const [newUser, setNewUser] = useState({ 
    nome: "", 
    email: "",
    senha: "",
    cpf: "",
    cargo: ""
   });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await userService.getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao carregar usuários", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleAddUser = async () => {
    try {
      const addedUser = await userService.addUsuario(newUser);
      setUsuarios([...usuarios, addedUser]);
      setNewUser({
        nome: "", 
        email: "",
        senha: "",
        cpf: "",
        cargo: ""
      }); 
    } catch (error) {
      console.error("Erro ao adicionar usuário", error);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const updatedUser = await userService.updateUsuario(id, newUser);
      setUsuarios(usuarios.map(user => 
        user.id === id ? updatedUser : user
      ));
      setNewUser({
        nome: "",
        email: "",
        senha: "",
        cpf: "",
        cargo: ""
      });
    } catch (error) {
      console.error("Erro ao atualizar usuário", error.response || error);
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
      <input
        type="text"
        value={newUser.cpf}
        onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
        placeholder="Cpf"
      />
      <input
        type="password"
        value={newUser.senha}
        onChange={(e) => setNewUser({ ...newUser, senha: e.target.value })}
        placeholder="Senha"
      />
      <input
        type="text"
        value={newUser.cargo}
        onChange={(e) => setNewUser({ ...newUser, cargo: e.target.value })}
        placeholder="Cargo"
      />
      <button onClick={handleAddUser}>Adicionar</button>
      <h2>Atualizar Usuário</h2>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Id"
      />
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
      <input
        type="text"
        value={newUser.cpf}
        onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
        placeholder="Cpf"
      />
      <input
        type="password"
        value={newUser.senha}
        onChange={(e) => setNewUser({ ...newUser, senha: e.target.value })}
        placeholder="Senha"
      />
      {/* <input
        type="text"
        value={newUser.cargo}
        onChange={(e) => setNewUser({ ...newUser, cargo: e.target.value })}
        placeholder="Cargo"
      /> */}
      <button onClick={handleUpdateUser}>Atualizar</button>
    </div>
  );
};

export default Usuario;
