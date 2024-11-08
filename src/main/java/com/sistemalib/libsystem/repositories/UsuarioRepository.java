package com.sistemalib.libsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemalib.libsystem.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

}
