package com.sistemalib.libsystem.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_clientes")
@PrimaryKeyJoinColumn(name = "usuario_id")
public class Cliente extends Usuario {
	
    private String cargo;
    
    private boolean status;
    
//    private List<Livro> livrosFisicosEmprestados;
//    private List<LivroDigital> livrosDigitaisEmprestados;
    
    public Cliente() {
    }

    public Cliente(String nome, String email, String senha, String cpf, String cargo, boolean status) {
        super(nome, email, senha, cpf);
        this.cargo = cargo;
        this.status = status;
    }

    public boolean isStatus() {
        return status;
    }

	public void setStatus(boolean status) {
        this.status = status;
    }

    public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
	}

//    public List<Livro> getLivrosFisicosEmprestados() {
//        return livrosFisicosEmprestados;
//    }

//    public void setLivrosFisicosEmprestados(List<Livro> livrosFisicosEmprestados) {
//        this.livrosFisicosEmprestados = livrosFisicosEmprestados;
//    }

//    public List<LivroDigital> getLivrosDigitaisEmprestados() {
//        return livrosDigitaisEmprestados;
//    }

//    public void setLivrosDigitaisEmprestados(List<LivroDigital> livrosDigitaisEmprestados) {
//        this.livrosDigitaisEmprestados = livrosDigitaisEmprestados;
//    }

//    public void solicitarEmprestimo(Funcionario funcionario, Livro livro) {
//        System.out.println("Cliente " + this.getNome() + " está solicitando empréstimo do livro: " + livro.getTitulo());
//        funcionario.registrarEmprestimo(this, livro);
//    }
//
//    public void solicitarDevolucao(Funcionario funcionario, Livro livro) {
//        System.out.println("Cliente " + this.getNome() + " está solicitando devolução do livro: " + livro.getTitulo());
//        funcionario.registrarDevolucao(this, livro);
//    }
}
