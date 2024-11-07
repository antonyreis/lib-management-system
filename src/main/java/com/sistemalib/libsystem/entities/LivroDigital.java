package com.sistemalib.libsystem.entities;

public class LivroDigital extends Livro {
    private int ISBN;

    public LivroDigital(int ISBN, String titulo, String autor, String editora, int anoPublicacao, boolean disponivel) {
        super(titulo, autor, editora, anoPublicacao, disponivel);
        this.ISBN = ISBN;
    }

    public int getISBN() {
        return ISBN;
    }

    public void setISBN(int ISBN) {
        this.ISBN = ISBN;
    }
}

