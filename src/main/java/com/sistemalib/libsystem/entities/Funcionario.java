package com.sistemalib.libsystem.entities;
import java.util.ArrayList;

public class Funcionario extends Usuario {
	private SistemaBiblioteca sistemaBiblioteca;
    public Funcionario(String nome, String email, String senha, String cpf, String cargo, SistemaBiblioteca sistemaBiblioteca) {
        super(nome, email, senha, cpf, cargo);
        this.sistemaBiblioteca = sistemaBiblioteca;
    }

    
    public Cliente buscarClientePorNome(String nome) {
        for (Cliente cliente : sistemaBiblioteca.getClientesCadastrados()) {
            if (cliente.getNome().equalsIgnoreCase(nome)) {
                return cliente;
            }
        }
        return null;
    }

    public Livro buscarLivroPorTitulo(String titulo) {
        for (Livro livro : sistemaBiblioteca.getLivrosCadastrados()) {
            if (livro.getTitulo().equalsIgnoreCase(titulo)) {
                return livro;
            }
        }
        return null;
    }

    public void registrarEmprestimo(Cliente cliente, Livro livro) {
        if (!livro.isDisponivel()) {
            System.out.println("O livro '" + livro.getTitulo() + "' não está disponível para empréstimo.");
            return;
        }
        
        livro.setDisponivel(false);
        if (cliente.getLivrosFisicosEmprestados() == null) {
            cliente.setLivrosFisicosEmprestados(new ArrayList<>());
        }
        cliente.getLivrosFisicosEmprestados().add(livro);
        
        System.out.println("Empréstimo do livro '" + livro.getTitulo() + "' registrado para o cliente " + cliente.getNome() + ".");
    }

    public void registrarDevolucao(Cliente cliente, Livro livro) {
        if (cliente.getLivrosFisicosEmprestados() == null || !cliente.getLivrosFisicosEmprestados().contains(livro)) {
            System.out.println("O livro '" + livro.getTitulo() + "' não está registrado como emprestado para o cliente " + cliente.getNome() + ".");
            return;
        }

        livro.setDisponivel(true);
        cliente.getLivrosFisicosEmprestados().remove(livro);
        
        System.out.println("Devolução do livro '" + livro.getTitulo() + "' registrada para o cliente " + cliente.getNome() + ".");
    }
}
