package com.sistemalib.libsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sistemalib.libsystem.entities.Administrador;

public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
}