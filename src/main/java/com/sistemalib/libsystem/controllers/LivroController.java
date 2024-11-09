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

import com.sistemalib.libsystem.entities.LivroFisico;
import com.sistemalib.libsystem.entities.LivroDigital;
import com.sistemalib.libsystem.entities.Livro;
import com.sistemalib.libsystem.repositories.LivroRepository;
import com.sistemalib.libsystem.repositories.LivroDigitalRepository;
import com.sistemalib.libsystem.repositories.LivroFisicoRepository;

@RestController
@RequestMapping(value = "/books")
public class LivroController {
	
	@Autowired
	private LivroRepository livroRepository;
	
	@Autowired
	private LivroDigitalRepository livroDigitalRepository;
	
	@Autowired
	private LivroFisicoRepository livroFisicoRepository;

	
	@GetMapping
	public List<Livro> findAll() {
		return livroRepository.findAll();
	}
	
	@GetMapping(value = "/digitals")
	public List<LivroDigital> findAllDigital() {
		return livroDigitalRepository.findAll();
	}
	
	@GetMapping(value = "/fisicos")
	public List<LivroFisico> findAllFisico() {
		return livroFisicoRepository.findAll();
	}
	
	
	@GetMapping(value = "/{id}")
	public Livro findById(@PathVariable Long id) {
		Livro result = livroRepository.findById(id).get();
		return result;
	}
	
	@PostMapping
	public Livro insert(@RequestBody Map<String, Object> bookData) {
	    String tipoLivro = (String) bookData.get("tipo");
	    Livro book;

	    switch (tipoLivro) {
	        case "Fisico":
	            book = new LivroFisico(
	            		(String) bookData.get("ISBN"),
	                    (String) bookData.get("titulo"),
	                    (String) bookData.get("autor"),
	                    (String) bookData.get("editora"),
	                    (int) bookData.get("anoPublicacao"),
	                    (int) bookData.get("quantidade"),
	                    (boolean) bookData.get("disponivel"),
	                    (String) bookData.get("tipo")
	            );
	            break;
	        case "Digital":
	            book = new LivroDigital(
	            		(String) bookData.get("ISBN"),
	                    (String) bookData.get("titulo"),
	                    (String) bookData.get("autor"),
	                    (String) bookData.get("editora"),
	                    (int) bookData.get("anoPublicacao"),
	                    (boolean) bookData.get("disponivel"),
	                    (String) bookData.get("tipo")
	            );
	            break;
	        default:
	            throw new IllegalArgumentException("Tipo de livro inválido: " + tipoLivro);
	    }

	    Livro result = livroRepository.save(book);
	    return result;
	}

	
}