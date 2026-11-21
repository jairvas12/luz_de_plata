package cl.luzdeplata.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import cl.luzdeplata.backend.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Optional<Producto> findByCodigo(String codigo);

    List<Producto> findByCategoria_Id(Long categoriaId);

    List<Producto> findByDestacadoTrue();

}
