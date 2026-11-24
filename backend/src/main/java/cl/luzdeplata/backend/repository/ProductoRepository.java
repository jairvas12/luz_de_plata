
package cl.luzdeplata.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import cl.luzdeplata.backend.entity.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // Listar todos los productos con sus categorías
    @Override
    @EntityGraph(attributePaths = { "categoria" })
    List<Producto> findAll();

    // Buscar producto por ID
    @Override
    @EntityGraph(attributePaths = { "categoria" })
    Optional<Producto> findById(Long id);

    // Buscar producto por código
    @EntityGraph(attributePaths = { "categoria" })
    Optional<Producto> findByCodigo(String codigo);

    // Listar productos por categoría
    @EntityGraph(attributePaths = { "categoria" })
    List<Producto> findByCategoria_Id(Long categoriaId);

    // Listar productos destacados
    @EntityGraph(attributePaths = { "categoria" })
    List<Producto> findByDestacadoTrue();

}
