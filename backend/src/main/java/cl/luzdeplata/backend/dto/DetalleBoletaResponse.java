
package cl.luzdeplata.backend.dto;

import java.math.BigDecimal;

import cl.luzdeplata.backend.entity.DetalleBoleta;

public class DetalleBoletaResponse {

    private Long id;
    private Long productoId;
    private String nombreProducto;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private BigDecimal subtotal;

    public DetalleBoletaResponse(
            Long id,
            Long productoId,
            String nombreProducto,
            Integer cantidad,
            BigDecimal precioUnitario,
            BigDecimal subtotal) {
        this.id = id;
        this.productoId = productoId;
        this.nombreProducto = nombreProducto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.subtotal = subtotal;
    }

    public static DetalleBoletaResponse desdeDetalle(
            DetalleBoleta detalle) {
        return new DetalleBoletaResponse(
                detalle.getId(),
                detalle.getProducto().getId(),
                detalle.getProducto().getNombre(),
                detalle.getCantidad(),
                detalle.getPrecioUnitario(),
                detalle.getSubtotal());
    }

    public Long getId() {
        return id;
    }

    public Long getProductoId() {
        return productoId;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public BigDecimal getPrecioUnitario() {
        return precioUnitario;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }
}
