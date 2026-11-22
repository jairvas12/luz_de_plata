package cl.luzdeplata.backend.exception;

public class DatosInvalidosException
        extends RuntimeException {

    public DatosInvalidosException(
        String mensaje
    ) {
        super(mensaje);
    }
}