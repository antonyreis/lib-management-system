package com.sistemalib.libsystem.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemalib.libsystem.entities.Emprestimo;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    List<Emprestimo> findByClienteId(Long clienteId);
    List<Emprestimo> findByFuncionarioId(Long funcionarioId);
}

