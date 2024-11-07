package com.sistemalib.libsystem.entities;

import java.util.List;

public class Cliente extends Usuario {
    private boolean status;
    private List<Livro> livrosFisicosEmprestados;
    private List<LivroDigital> livrosDigitaisEmprestados;

    public Cliente(String nome, String email, String senha, String cpf, String cargo, boolean status) {
        super(nome, email, senha, cpf, cargo);
        this.status = status;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public List<Livro> getLivrosFisicosEmprestados() {
        return livrosFisicosEmprestados;
    }

    public void setLivrosFisicosEmprestados(List<Livro> livrosFisicosEmprestados) {
        this.livrosFisicosEmprestados = livrosFisicosEmprestados;
    }

    public List<LivroDigital> getLivrosDigitaisEmprestados() {
        return livrosDigitaisEmprestados;
    }

    public void setLivrosDigitaisEmprestados(List<LivroDigital> livrosDigitaisEmprestados) {
        this.livrosDigitaisEmprestados = livrosDigitaisEmprestados;
    }

    public void solicitarEmprestimo(Funcionario funcionario, Livro livro) {
        System.out.println("Cliente " + this.getNome() + " está solicitando empréstimo do livro: " + livro.getTitulo());
        funcionario.registrarEmprestimo(this, livro);
    }

    public void solicitarDevolucao(Funcionario funcionario, Livro livro) {
        System.out.println("Cliente " + this.getNome() + " está solicitando devolução do livro: " + livro.getTitulo());
        funcionario.registrarDevolucao(this, livro);
    }
}
