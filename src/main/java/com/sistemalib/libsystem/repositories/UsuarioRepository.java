package com.sistemalib.libsystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemalib.libsystem.entities.User;

public interface UsuarioRepository extends JpaRepository<User, Long>{

}
