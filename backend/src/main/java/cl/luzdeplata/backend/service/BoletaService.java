package cl.luzdeplata.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cl.luzdeplata.backend.dto.ItemCompraRequest;
import cl.luzdeplata.backend.entity.Boleta;
import cl.luzdeplata.backend.entity.DetalleBoleta;
import cl.luzdeplata.backend.entity.EstadoBoleta;
import cl.luzdeplata.backend.entity.Producto;
import cl.luzdeplata.backend.entity.Usuario;
import cl.luzdeplata.backend.exception.DatosInvalidosException;
import cl.luzdeplata.backend.exception.RecursoNoEncontradoException;
import cl.luzdeplata.backend.repository.BoletaRepository;
import cl.luzdeplata.backend.repository.DetalleBoletaRepository;
import cl.luzdeplata.backend.repository.ProductoRepository;
import cl.luzdeplata.backend.repository.UsuarioRepository;

@Service
public class BoletaService {

    private final BoletaRepository boletaRepository;

    private final DetalleBoletaRepository detalleBoletaRepository;

    private final ProductoRepository productoRepository;

    private final UsuarioRepository usuarioRepository;

    public BoletaService(
        BoletaRepository boletaRepository,
        DetalleBoletaRepository detalleBoletaRepository,
        ProductoRepository productoRepository,
        UsuarioRepository usuarioRepository
    ) {
        this.boletaRepository = boletaRepository;
        this.detalleBoletaRepository = detalleBoletaRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Boleta> listarTodas() {
        return boletaRepository.findAll();
    }

    public Boleta buscarPorId(Long id) {
        return boletaRepository
                .findById(id)
                .orElseThrow(
                    () -> new RecursoNoEncontradoException(
                        "Boleta no encontrada"
                    )
                );
    }

    public List<Boleta> listarPorUsuario(
        Long usuarioId
    ) {
        return boletaRepository
                .findByUsuario_Id(usuarioId);
    }

    @Transactional
    public Boleta crearCompra(
        Long usuarioId,
        List<ItemCompraRequest> items
    ) {

        if (items == null || items.isEmpty()) {
            throw new DatosInvalidosException(
                "La compra debe contener al menos un producto"
            );
        }

        Usuario usuario =
            usuarioRepository
                .findById(usuarioId)
                .orElseThrow(
                    () -> new RecursoNoEncontradoException(
                        "Usuario no encontrado"
                    )
                );

        String numeroOrden =
            "LP-"
            + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();

        Boleta boleta =
            new Boleta(
                numeroOrden,
                LocalDateTime.now(),
                BigDecimal.ZERO,
                EstadoBoleta.CONFIRMADA,
                usuario
            );

        boleta =
            boletaRepository.save(boleta);

        BigDecimal total =
            BigDecimal.ZERO;

        for (ItemCompraRequest item : items) {

            if (
                item.getCantidad() == null
                || item.getCantidad() <= 0
            ) {
                throw new DatosInvalidosException(
                    "La cantidad debe ser mayor que cero"
                );
            }

            Producto producto =
                productoRepository
                    .findById(
                        item.getProductoId()
                    )
                    .orElseThrow(
                        () -> new RecursoNoEncontradoException(
                            "Producto no encontrado"
                        )
                    );

            if (
                producto.getStock()
                < item.getCantidad()
            ) {
                throw new DatosInvalidosException(
                    "Stock insuficiente para el producto: "
                    + producto.getNombre()
                );
            }

            BigDecimal precioUnitario =
                producto.getPrecio();

            BigDecimal subtotal =
                precioUnitario.multiply(
                    BigDecimal.valueOf(
                        item.getCantidad()
                    )
                );

            DetalleBoleta detalle =
                new DetalleBoleta(
                    boleta,
                    producto,
                    item.getCantidad(),
                    precioUnitario,
                    subtotal
                );

            detalleBoletaRepository.save(
                detalle
            );

            producto.setStock(
                producto.getStock()
                - item.getCantidad()
            );

            productoRepository.save(
                producto
            );

            total =
                total.add(subtotal);
        }

        boleta.setTotal(total);

        return boletaRepository.save(
            boleta
        );
    }
}