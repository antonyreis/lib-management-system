package com.sistemalib.libsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sistemalib.libsystem.entities.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
}