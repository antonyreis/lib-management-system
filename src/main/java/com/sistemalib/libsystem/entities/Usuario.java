package com.sistemalib.libsystem.entities;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_usuarios")
@Inheritance(strategy = InheritanceType.JOINED)
//@DiscriminatorColumn(name = "cargo")
public abstract class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String cpf;
//    private String cargo;
    
    public Usuario() {
    }
    
    // Construtor
    public Usuario(String nome, String email, String senha, String cpf) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
//        this.cargo = cargo;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

//	public String getCargo() {
//		return cargo;
//	}
//
//	public void setCargo(String cargo) {
//		this.cargo = cargo;
//	}

    // Getters e Setters


// Métodos
//    public void consultarLivrosDisponiveis(SistemaBiblioteca sistema) {
//        System.out.println("\n=== Livros Físicos Disponíveis ===");
//        for (LivroFisico livro : sistema.getLivrosFisicosCadastrados()) {
//            if (livro.isDisponivel()) {
//                System.out.println("Título: " + livro.getTitulo() + " | ISBN: " + livro.getISBN() + " | Quantidade: " + livro.getQuantidade());
//            }
//        }
//
//        System.out.println("\n=== Livros Digitais Disponíveis ===");
//        for (LivroDigital livro : sistema.getLivrosDigitaisCadastrados()) {
//            if (livro.isDisponivel()) {
//                System.out.println("Título: " + livro.getTitulo() + " | ISBN: " + livro.getISBN());
//            }
//        }
//    }
}
