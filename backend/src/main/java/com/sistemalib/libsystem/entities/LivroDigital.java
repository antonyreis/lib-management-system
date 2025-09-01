package com.sistemalib.libsystem.entities;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_livros_digitais")
@PrimaryKeyJoinColumn(name = "livro_id")
public class LivroDigital extends Livro {
    private String ISBN;
    private String tipo;

    public LivroDigital() {
    }

    public LivroDigital(String ISBN, String titulo, String autor, String editora, int anoPublicacao, boolean disponivel, String tipo) {
        super(titulo, autor, editora, anoPublicacao, disponivel);
        this.tipo = tipo;
        this.ISBN = ISBN;
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

    @Override
    public String toString() {
        return super.toString() + ", ISBN: " + ISBN;
    }
}