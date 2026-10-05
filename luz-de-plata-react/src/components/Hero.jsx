function Hero() {
  return (
    <>
      <section className="hero">
        <video
          autoplay=""
          loop=""
          muted=""
          playsinline=""
          poster="img/aros/1.webp"
        >
          <source src="video/inicio.mp4" type="video/mp4" />
          Tu navegador no puede reproducir el video.
        </video>
        <div className="contenedor hero__contenido">
          <p>PLATA 925 · DISEÑO ATEMPORAL</p>
          <h1>Joyas que iluminan cada momento</h1>
          <p>
            Descubre piezas seleccionadas para regalar, celebrar y acompañarte
            todos los días.
          </p>
          <a className="boton boton--claro" href="catalogo.html">
            Ver catálogo
          </a>
        </div>
      </section>
    </>
  );
}

export default Hero;
