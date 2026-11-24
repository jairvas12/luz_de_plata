package cl.luzdeplata.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequest {

    @NotBlank(
        message = "El correo es obligatorio."
    )
    @Email(
        message = "El correo no tiene un formato válido."
    )
    private String email;

    @NotBlank(
        message = "La contraseña es obligatoria."
    )
    @Size(
        min = 4,
        max = 72,
        message = "La contraseña debe tener entre 4 y 72 caracteres."
    )
    private String password;

    public LoginRequest() {
    }

    public LoginRequest(
        String email,
        String password
    ) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
        String email
    ) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(
        String password
    ) {
        this.password = password;
    }
}