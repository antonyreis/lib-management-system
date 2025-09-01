package com.sistemalib.libsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sistemalib.libsystem.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
