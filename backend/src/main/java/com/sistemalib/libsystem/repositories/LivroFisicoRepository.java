package com.sistemalib.libsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sistemalib.libsystem.entities.LivroFisico;

public interface LivroFisicoRepository extends JpaRepository<LivroFisico, Long> {
}