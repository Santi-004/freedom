import { useState } from "react";
function Busqueda (){
    const[texto, setTexto]= useState ("");
    const manejarCambio = (e) => {
       setTexto (e.target.value);
    };

return(
    <div>
    <input type="search" value={texto} onChange={manejarCambio} placeholder="BUSCAR" />
    <p>Lo que escribiste: {texto}</p>
    </div>
);
}
export default Busqueda;