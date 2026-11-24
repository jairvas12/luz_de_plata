import "../css/estilos.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiRequest } from "../services/api.js";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  function validarEmail() {
    const correo = email.trim();

    if (!correo) {
      setErrorEmail("El correo es requerido.");
      return false;
    }

    if (correo.length > 100) {
      setErrorEmail("Máximo 100 caracteres.");
      return false;
    }

    const correoValido =
      /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com|yahoo\.com|luzdeplata\.cl)$/i;

    if (!correoValido.test(correo)) {
      setErrorEmail(
        "Usa un correo @duoc.cl, @profesor.duoc.cl, @gmail.com o @yahoo.com.",
      );

      return false;
    }

    setErrorEmail("");
    return true;
  }

  function validarPassword() {
    if (!password) {
      setErrorPassword("La contraseña es requerida.");
      return false;
    }

    if (password.length < 4 || password.length > 15) {
      setErrorPassword(
        "Debe tener entre 4 y 15 caracteres.",
      );

      return false;
    }

    setErrorPassword("");
    return true;
  }

  async function manejarSubmit(evento) {
    evento.preventDefault();

    setErrorLogin("");

    const emailCorrecto = validarEmail();
    const passwordCorrecta = validarPassword();

    if (!emailCorrecto || !passwordCorrecta) {
      return;
    }

    try {
      const respuesta = await apiRequest(
        "/auth/login",
        {
          method: "POST",

          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        },
      );

      localStorage.setItem(
        "token",
        respuesta.token,
      );

      const roles = {
        ADMINISTRADOR: "Administrador",
        VENDEDOR: "Vendedor",
        CLIENTE: "Cliente",
      };

      const sesion = {
        id: respuesta.id,
        name: respuesta.nombre,
        email: respuesta.email,
        role:
          roles[respuesta.rol]
          || respuesta.rol,
      };

      localStorage.setItem(
        "lp_session_v1",
        JSON.stringify(sesion),
      );

      if (
        respuesta.rol === "ADMINISTRADOR"
        || respuesta.rol === "VENDEDOR"
      ) {
        navigate("/admin");
        return;
      }

      navigate("/");
    } catch (error) {
      setErrorLogin(
        error.message
        || "Correo o contraseña incorrectos.",
      );
    }
  }

  return (
    <main>
      <section className="formulario-card">
        <h1>Mi cuenta</h1>

        <div className="tabs-auth">
          <Link
            className="activo"
            to="/login"
          >
            Inicio de sesión
          </Link>

          <Link to="/Registro">
            Crear cuenta
          </Link>
        </div>

        <form
          autoComplete="on"
          className="formulario"
          onSubmit={manejarSubmit}
          noValidate
        >
          <div className="campo">
            <label htmlFor="email">
              Correo electrónico
            </label>

            <input
              autoComplete="email"
              id="email"
              maxLength="100"
              name="email"
              placeholder="nombre@gmail.com"
              type="email"
              value={email}
              onChange={(evento) =>
                setEmail(evento.target.value)
              }
              onBlur={validarEmail}
              className={
                errorEmail
                  ? "invalido"
                  : email
                    ? "valido"
                    : ""
              }
            />

            <span className="error-campo">
              {errorEmail}
            </span>
          </div>

          <div className="campo">
            <label htmlFor="password">
              Contraseña
            </label>

            <input
              autoComplete="current-password"
              id="password"
              maxLength="15"
              minLength="4"
              name="password"
              type="password"
              value={password}
              onChange={(evento) =>
                setPassword(
                  evento.target.value,
                )
              }
              onBlur={validarPassword}
              className={
                errorPassword
                  ? "invalido"
                  : password
                    ? "valido"
                    : ""
              }
            />

            <span className="error-campo">
              {errorPassword}
            </span>
          </div>

          <label>
            <input
              name="remember"
              type="checkbox"
            />
            Recordarme
          </label>

          {errorLogin && (
            <div className="alerta alerta--error">
              {errorLogin}
            </div>
          )}

          <button
            className="boton boton--bloque"
            type="submit"
          >
            Iniciar sesión
          </button>

          <p className="ayuda">
            Demo: admin@luzdeplata.cl /
            AdminDuoc1234
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;