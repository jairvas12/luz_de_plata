package cl.luzdeplata.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import cl.luzdeplata.backend.entity.Categoria;
import cl.luzdeplata.backend.entity.Producto;
import cl.luzdeplata.backend.exception.RecursoDuplicadoException;
import cl.luzdeplata.backend.exception.RecursoNoEncontradoException;
import cl.luzdeplata.backend.repository.CategoriaRepository;
import cl.luzdeplata.backend.repository.ProductoRepository;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    private final CategoriaRepository categoriaRepository;

    public ProductoService(
        ProductoRepository productoRepository,
        CategoriaRepository categoriaRepository
    ) {
        this.productoRepository =
            productoRepository;

        this.categoriaRepository =
            categoriaRepository;
    }

    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }

    public Producto buscarPorId(Long id) {
        return productoRepository
                .findById(id)
                .orElseThrow(
                    () ->
                        new RecursoNoEncontradoException(
                            "Producto no encontrado"
                        )
                );
    }

    public Producto buscarPorCodigo(
        String codigo
    ) {
        return productoRepository
                .findByCodigo(codigo)
                .orElseThrow(
                    () ->
                        new RecursoNoEncontradoException(
                            "Producto no encontrado"
                        )
                );
    }

    public List<Producto> listarPorCategoria(
        Long categoriaId
    ) {
        return productoRepository
                .findByCategoria_Id(
                    categoriaId
                );
    }

    public List<Producto> listarDestacados() {
        return productoRepository
                .findByDestacadoTrue();
    }

    public Producto guardar(
        Producto producto,
        Long categoriaId
    ) {

        validarCodigoDuplicado(
            producto
        );

        Categoria categoria =
            categoriaRepository
                .findById(categoriaId)
                .orElseThrow(
                    () ->
                        new RecursoNoEncontradoException(
                            "Categoría no encontrada"
                        )
                );

        producto.setCategoria(
            categoria
        );

        return productoRepository
                .save(producto);
    }

    public void eliminar(Long id) {

        if (
            !productoRepository
                .existsById(id)
        ) {
            throw new RecursoNoEncontradoException(
                "Producto no encontrado"
            );
        }

        productoRepository
            .deleteById(id);
    }

    private void validarCodigoDuplicado(
        Producto producto
    ) {

        productoRepository
            .findByCodigo(
                producto.getCodigo()
            )
            .ifPresent(
                productoExistente -> {

                    boolean esNuevo =
                        producto.getId()
                            == null;

                    boolean esOtroProducto =
                        !productoExistente
                            .getId()
                            .equals(
                                producto.getId()
                            );

                    if (
                        esNuevo
                        || esOtroProducto
                    ) {
                        throw new RecursoDuplicadoException(
                            "Ya existe un producto con el código "
                            + producto.getCodigo()
                            + "."
                        );
                    }
                }
            );
    }
}