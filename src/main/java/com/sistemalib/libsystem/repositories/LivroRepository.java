package com.sistemalib.libsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemalib.libsystem.entities.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long>{

}
