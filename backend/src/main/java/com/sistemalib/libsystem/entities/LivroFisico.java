package com.sistemalib.libsystem.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_livros_fisicos")
@PrimaryKeyJoinColumn(name = "livro_id")
public class LivroFisico extends Livro {
	
	private String tipo;
    private String ISBN;
    private int quantidade;


    public LivroFisico() {
    }

    public LivroFisico(String ISBN, String titulo, String autor, String editora, int anoPublicacao, int quantidade, boolean disponivel, String tipo) {
        super(titulo, autor, editora, anoPublicacao, disponivel);
        this.tipo = tipo;
        this.ISBN = ISBN;
        this.quantidade = quantidade;
    }

    public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    @Override
    public String toString() {
        return super.toString() + ", ISBN: " + ISBN + ", Quantidade: " + quantidade;
    }
}