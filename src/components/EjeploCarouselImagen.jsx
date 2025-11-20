function EjeploCarouselImagen({ text, src }) {
  return (
    <img
      src={src || `https://via.placeholder.com/1200x400?text=${text}`}
      alt={text}
      className="d-block w-100"
      style={{
        objectFit: "cover",
        height: "calc(100vh - 80px)", // ocupa el alto de la pantalla menos aprox. el header
        width: "100%", // ancho al 100% del contenedor
        borderRadius: "8px",
      }}
    />
  );
}

export default EjeploCarouselImagen;
