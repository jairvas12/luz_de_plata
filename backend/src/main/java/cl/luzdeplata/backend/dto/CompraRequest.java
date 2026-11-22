package cl.luzdeplata.backend.dto;

import java.util.List;

public class CompraRequest {

    private List<ItemCompraRequest> items;

    public CompraRequest() {
    }

    public CompraRequest(
        List<ItemCompraRequest> items
    ) {
        this.items = items;
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