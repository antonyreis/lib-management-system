package com.sistemalib.libsystem.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistemalib.libsystem.entities.Administrador;
import com.sistemalib.libsystem.entities.Cliente;
import com.sistemalib.libsystem.entities.Funcionario;
import com.sistemalib.libsystem.entities.Usuario;
import com.sistemalib.libsystem.repositories.AdministradorRepository;
import com.sistemalib.libsystem.repositories.ClienteRepository;
import com.sistemalib.libsystem.repositories.FuncionarioRepository;
import com.sistemalib.libsystem.repositories.UsuarioRepository;

@RestController
@RequestMapping(value = "/users")
public class UsuarioController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private FuncionarioRepository funcionarioRepository;
	
	@Autowired
	private AdministradorRepository administradorRepository;
	
	@GetMapping
	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
	}
	
	@GetMapping(value = "/clientes")
	public List<Cliente> findAllClientes() {
		return clienteRepository.findAll();
	}
	
	@GetMapping(value = "/funcionarios")
	public List<Funcionario> findAllFuncionarios() {
		return funcionarioRepository.findAll();
	}
	
	@GetMapping(value = "/administradores")
	public List<Administrador> findAllAdministradores() {
		return administradorRepository.findAll();
	}
	
	@GetMapping(value = "/{id}")
	public Usuario findById(@PathVariable Long id) {
		Usuario result = usuarioRepository.findById(id).get();
		return result;
	}
	
	@PostMapping
	public Usuario insert(@RequestBody Map<String, Object> userData) {
	    String tipoUsuario = (String) userData.get("cargo");
	    Usuario user;

	    switch (tipoUsuario) {
	        case "Cliente":
	            user = new Cliente(
	                    (String) userData.get("nome"),
	                    (String) userData.get("email"),
	                    (String) userData.get("senha"),
	                    (String) userData.get("cpf"),
	                    (String) userData.get("cargo"),
	                    (Boolean) userData.get("status")
	            );
	            break;
	        case "Funcionario":
	            user = new Funcionario(
	                    (String) userData.get("nome"),
	                    (String) userData.get("email"),
	                    (String) userData.get("senha"),
	                    (String) userData.get("cpf"),
	                    (String) userData.get("cargo")
	            );
	            break;
	        case "Administrador":
	            user = new Administrador(
	                    (String) userData.get("nome"),
	                    (String) userData.get("email"),
	                    (String) userData.get("senha"),
	                    (String) userData.get("cpf"),
	                    (String) userData.get("cargo")
	            );
	            break;
	        default:
	            throw new IllegalArgumentException("Tipo de usuário inválido: " + tipoUsuario);
	    }

	    Usuario result = usuarioRepository.save(user);
	    return result;
	}

	
}
