import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  iniciarSesion
} from "../services/usuariosService.js";

import "../css/estilos.css";



function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errorEmail, setErrorEmail] =
    useState("");

  const [errorPassword, setErrorPassword] =
    useState("");

  const [errorLogin, setErrorLogin] =
    useState("");


  function validarEmail() {

    const correo =
      email.trim();

    if (!correo) {

      setErrorEmail(
        "El correo es requerido."
      );

      return false;

    }

    if (correo.length > 100) {

      setErrorEmail(
        "Máximo 100 caracteres."
      );

      return false;

    }

    const correoValido =
      /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com|yahoo\.com)$/i;

    if (
      !correoValido.test(correo)
    ) {

      setErrorEmail(
        "Usa un correo @duoc.cl, @profesor.duoc.cl, @gmail.com o @yahoo.com."
      );

      return false;

    }

    setErrorEmail("");

    return true;

  }


  function validarPassword() {

    if (!password) {

      setErrorPassword(
        "La contraseña es requerida."
      );

      return false;

    }

    if (
      password.length < 4
      ||
      password.length > 10
    ) {

      setErrorPassword(
        "Debe tener entre 4 y 10 caracteres."
      );

      return false;

    }

    setErrorPassword("");

    return true;

  }


  function manejarSubmit(evento) {

    evento.preventDefault();

    setErrorLogin("");

    const emailCorrecto =
      validarEmail();

    const passwordCorrecta =
      validarPassword();

    if (
      !emailCorrecto
      ||
      !passwordCorrecta
    ) {
      return;
    }

    const sesion =
      iniciarSesion(
        email,
        password
      );

    if (!sesion) {

      setErrorLogin(
        "Correo o contraseña incorrectos."
      );

      return;

    }

    if (
      sesion.role ===
      "Administrador"
      ||
      sesion.role ===
      "Vendedor"
    ) {

      console.log(
        "Usuario administrativo:",
        sesion
      );

      navigate("/");

      return;

    }

    navigate("/");

  }


  return (

    <main>

      <section className="formulario-card">

        <h1>
          Mi cuenta
        </h1>

        <div className="tabs-auth">

          <Link
            className="activo"
            to="/login"
          >
            Inicio de sesión
          </Link>

          <a href="registro.html">
            Crear cuenta
          </a>

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
              onChange={
                evento =>
                  setEmail(
                    evento.target.value
                  )
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
              maxLength="10"
              minLength="4"
              name="password"
              type="password"
              value={password}
              onChange={
                evento =>
                  setPassword(
                    evento.target.value
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


          {
            errorLogin
            &&
            (
              <div className="alerta alerta--error">
                {errorLogin}
              </div>
            )
          }


          <button
            className="boton boton--bloque"
            type="submit"
          >
            Iniciar sesión
          </button>


          <p className="ayuda">
            Demo:
            admin@duoc.cl / admin123
            · vendedor@duoc.cl / venta123
            · cliente@gmail.com / clave123
          </p>

        </form>

      </section>

    </main>

  );

}

export default Login;