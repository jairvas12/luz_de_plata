package cl.luzdeplata.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import cl.luzdeplata.backend.exception.RecursoNoEncontradoException;
import cl.luzdeplata.backend.entity.Categoria;
import cl.luzdeplata.backend.repository.CategoriaRepository;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaService(
        CategoriaRepository categoriaRepository
    ) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> listarTodas() {
        return categoriaRepository.findAll();
    }

    public Categoria buscarPorId(Long id) {
        return categoriaRepository
                .findById(id)
                .orElseThrow(
                    () -> new RecursoNoEncontradoException(
                        "Categoría no encontrada"
                    )
                );
    }

    public Categoria guardar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public void eliminar(Long id) {

        if (!categoriaRepository.existsById(id)) {
            throw new RecursoNoEncontradoException(
                "Categoría no encontrada"
            );
        }
        categoriaRepository.deleteById(id);
    }
}