package com.sistemalib.libsystem.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sistemalib.libsystem.entities.Emprestimo;
import com.sistemalib.libsystem.entities.Livro;
import com.sistemalib.libsystem.entities.Cliente;
import com.sistemalib.libsystem.entities.Funcionario;
import com.sistemalib.libsystem.repositories.EmprestimoRepository;
import com.sistemalib.libsystem.repositories.LivroRepository;
import com.sistemalib.libsystem.repositories.ClienteRepository;
import com.sistemalib.libsystem.repositories.FuncionarioRepository;

@RestController
@RequestMapping(value = "/emprestimos")
public class EmprestimoController {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @PostMapping("/solicitar")
    public ResponseEntity<String> solicitarEmprestimo(@RequestBody Map<String, Object> requestData) {
        Long livroId = ((Number) requestData.get("livroId")).longValue();
        Long clienteId = ((Number) requestData.get("clienteId")).longValue();

        Livro livro = livroRepository.findById(livroId).orElseThrow(() -> new IllegalArgumentException("Livro não encontrado"));
        Cliente cliente = clienteRepository.findById(clienteId).orElseThrow(() -> new IllegalArgumentException("Cliente não encontrado"));

        if (!livro.isDisponivel()) {
            return ResponseEntity.badRequest().body("O livro não está disponível para empréstimo.");
        }

        livro.setDisponivel(false);
        livroRepository.save(livro);

        Emprestimo emprestimo = new Emprestimo(
            livro,
            cliente,
            null,
            LocalDate.now(),
            LocalDate.now().plusDays(14)
        );

        emprestimoRepository.save(emprestimo);

        return ResponseEntity.ok("Empréstimo solicitado com sucesso.");
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarEmprestimo(@RequestBody Map<String, Object> requestData) {
        Long emprestimoId = ((Number) requestData.get("emprestimoId")).longValue();
        Long funcionarioId = ((Number) requestData.get("funcionarioId")).longValue();

        Emprestimo emprestimo = emprestimoRepository.findById(emprestimoId).orElseThrow(() -> new IllegalArgumentException("Empréstimo não encontrado"));
        Funcionario funcionario = funcionarioRepository.findById(funcionarioId).orElseThrow(() -> new IllegalArgumentException("Funcionário não encontrado"));

        emprestimo.setFuncionario(funcionario);
        emprestimoRepository.save(emprestimo);

        return ResponseEntity.ok("Empréstimo registrado com sucesso.");
    }
    
    @PutMapping("/devolver/{emprestimoId}")
    public ResponseEntity<String> devolverLivro(@PathVariable Long emprestimoId) {
        Emprestimo emprestimo = emprestimoRepository.findById(emprestimoId)
                .orElseThrow(() -> new IllegalArgumentException("Empréstimo não encontrado"));

        if (emprestimo.getDataDevolucaoReal() != null) {
            return ResponseEntity.badRequest().body("Este livro já foi devolvido.");
        }

        emprestimo.setDataDevolucaoReal(LocalDate.now());

        Livro livro = emprestimo.getLivro();
        livro.setDisponivel(true);
        livroRepository.save(livro);

        emprestimoRepository.save(emprestimo);

        return ResponseEntity.ok("Livro devolvido com sucesso.");
    }


    @GetMapping
    public List<Emprestimo> listarEmprestimos() {
        return emprestimoRepository.findAll();
    }

    @GetMapping("/cliente/{clienteId}")
    public List<Emprestimo> listarEmprestimosPorCliente(@PathVariable Long clienteId) {
        return emprestimoRepository.findByClienteId(clienteId);
    }
}

