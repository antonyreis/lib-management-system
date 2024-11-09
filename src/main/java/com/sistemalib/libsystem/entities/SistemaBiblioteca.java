package com.sistemalib.libsystem.entities;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sistemalib.libsystem.controllers.LivroController;
import com.sistemalib.libsystem.controllers.UsuarioController;

@Component
public class SistemaBiblioteca {

    @Autowired
    private UsuarioController usuarioController;
    
    @Autowired
    private LivroController livroController;
  
    // ITERAÇÃO SOBRE USUÁRIOS E SUBCLASSES
    
    public Usuario cadastrarUsuario(Map<String, Object> userData) {
        return usuarioController.insert(userData);
    }
    
    public Usuario buscarUsuario(Long id) {
        return usuarioController.findById(id);
    }
    
    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        return usuarioController.atualizarUsuario(id, usuarioAtualizado).getBody();
    }
    
    public void deletarUsuario(Long id) {
        usuarioController.deletarUsuario(id);
    }
    
    public List<Usuario> listarUsuarios() {
        return usuarioController.findAll();
    }
    
    public List<Cliente> listarClientes() {
        return usuarioController.findAllClientes();
    }
    
    public List<Funcionario> listarFuncionarios() {
        return usuarioController.findAllFuncionarios();
    }
    
    public List<Administrador> listarAdministradores() {
        return usuarioController.findAllAdministradores();
    }

    // ITERAÇÃO SOBRE LIVROS E SUBCLASSES

    public Livro cadastrarLivro(Map<String, Object> bookData) {
        return livroController.insert(bookData); 
    }
    
    public Livro buscarLivro(Long id) {
        return livroController.findById(id);
    }
    
    public Livro atualizarLivro(Long id, Livro livroAtualizado) {
        return livroController.atualizarLivro(id, livroAtualizado).getBody();
    }
    
    public void deletarLivro(Long id) {
        livroController.deletarLivro(id);
    }
    
    public List<Livro> listarLivros() {
        return livroController.findAll();
    }
    
    public List<LivroDigital> listarLivrosDigitais() {
        return livroController.findAllDigital();
    }
    
    public List<LivroFisico> listarLivrosFisicos() {
        return livroController.findAllFisico();
    }
}
