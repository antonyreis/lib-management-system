package com.sistemalib.libsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sistemalib.libsystem.entities.LivroDigital;

public interface LivroDigitalRepository extends JpaRepository<LivroDigital, Long> {
}