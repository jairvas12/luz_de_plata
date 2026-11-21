package cl.luzdeplata.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.luzdeplata.backend.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{

}
