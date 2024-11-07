package com.sistemalib.libsystem.entities;

public class LivroFisico extends Livro {
    private int ISBN;
    private int quantidade;

    public LivroFisico(int ISBN, String titulo, String autor, String editora, int anoPublicacao, int quantidade, boolean disponivel) {
        super(titulo, autor, editora, anoPublicacao, disponivel);
        this.ISBN = ISBN;
        this.quantidade = quantidade;
    }

    public int getISBN() {
        return ISBN;
    }

    public void setISBN(int ISBN) {
        this.ISBN = ISBN;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}
