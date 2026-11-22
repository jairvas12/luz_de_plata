package cl.luzdeplata.backend.dto;

import java.util.List;

public class CompraRequest {

    private Long usuarioId;

    private List<ItemCompraRequest> items;

    public CompraRequest() {
    }

    public CompraRequest(
        Long usuarioId,
        List<ItemCompraRequest> items
    ) {
        this.usuarioId = usuarioId;
        this.items = items;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public List<ItemCompraRequest> getItems() {
        return items;
    }

    public void setItems(
        List<ItemCompraRequest> items
    ) {
        this.items = items;
    }
}