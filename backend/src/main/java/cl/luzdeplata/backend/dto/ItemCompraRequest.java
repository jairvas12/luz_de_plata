package cl.luzdeplata.backend.dto;

public class ItemCompraRequest {

    private Long productoId;

    private Integer cantidad;

    public ItemCompraRequest() {
    }

    public ItemCompraRequest(
        Long productoId,
        Integer cantidad
    ) {
        this.productoId = productoId;
        this.cantidad = cantidad;
    }

    public Long getProductoId() {
        return productoId;
    }

    public void setProductoId(Long productoId) {
        this.productoId = productoId;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
}