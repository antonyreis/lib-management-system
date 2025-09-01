package com.sistemalib.libsystem.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sistemalib.libsystem.entities.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long>{
	@Query("SELECT l FROM Livro l WHERE " +
		       "(:titulo IS NULL OR l.titulo LIKE %:titulo%) AND " +
		       "(:autor IS NULL OR l.autor LIKE %:autor%) AND " +
		       "(:editora IS NULL OR l.editora LIKE %:editora%) AND " +
		       "(:anoPublicacao IS NULL OR l.anoPublicacao = :anoPublicacao)")
		List<Livro> buscarPorFiltros(@Param("titulo") String titulo,
		                              @Param("autor") String autor,
		                              @Param("editora") String editora,
		                              @Param("anoPublicacao") Integer anoPublicacao);
}
