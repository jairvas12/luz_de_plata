package cl.luzdeplata.backend.exception;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ResponseEntity<Map<String, Object>> manejarRecursoNoEncontrado(
        RecursoNoEncontradoException ex
    ) {

        Map<String, Object> respuesta =
            new LinkedHashMap<>();

        respuesta.put(
            "fecha",
            LocalDateTime.now()
        );

        respuesta.put(
            "estado",
            HttpStatus.NOT_FOUND.value()
        );

        respuesta.put(
            "error",
            "Not Found"
        );

        respuesta.put(
            "mensaje",
            ex.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(respuesta);
    }

    @ExceptionHandler(RecursoDuplicadoException.class)
    public ResponseEntity<Map<String, Object>> manejarRecursoDuplicado(
        RecursoDuplicadoException ex
    ) {

        Map<String, Object> respuesta =
            new LinkedHashMap<>();

        respuesta.put(
            "fecha",
            LocalDateTime.now()
        );

        respuesta.put(
            "estado",
            HttpStatus.CONFLICT.value()
        );

        respuesta.put(
            "error",
            "Conflict"
        );

        respuesta.put(
            "mensaje",
            ex.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(respuesta);
    }
    @ExceptionHandler(DatosInvalidosException.class)
    public ResponseEntity<Map<String, Object>> manejarDatosInvalidos(
        DatosInvalidosException ex
    ) {

        Map<String, Object> respuesta =
            new LinkedHashMap<>();

        respuesta.put(
            "fecha",
            LocalDateTime.now()
        );

        respuesta.put(
            "estado",
            HttpStatus.BAD_REQUEST.value()
        );

        respuesta.put(
            "error",
            "Bad Request"
        );

        respuesta.put(
            "mensaje",
            ex.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(respuesta);
    }

    @ExceptionHandler(CredencialesInvalidasException.class)
    public ResponseEntity<Map<String, Object>> manejarCredencialesInvalidas(
        CredencialesInvalidasException ex
    ) {

        Map<String, Object> respuesta =
            new LinkedHashMap<>();

        respuesta.put(
            "fecha",
            LocalDateTime.now()
        );

        respuesta.put(
            "estado",
            HttpStatus.UNAUTHORIZED.value()
        );

        respuesta.put(
            "error",
            "Unauthorized"
        );

        respuesta.put(
            "mensaje",
            ex.getMessage()
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(respuesta);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> manejarValidaciones(
            MethodArgumentNotValidException ex) {

        Map<String, String> errores = new LinkedHashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errores.put(
                                error.getField(),
                                error.getDefaultMessage()
                        )
                );

        Map<String, Object> respuesta = new LinkedHashMap<>();

        respuesta.put(
                "mensaje",
                "Hay datos inválidos en la solicitud."
        );

        respuesta.put(
                "errores",
                errores
        );

        return ResponseEntity
                .badRequest()
                .body(respuesta);
    }
}