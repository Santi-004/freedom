import { useState } from "react";


{/* Talles del prudcto que se muestra */}
function FormTalle({ value = '', onChange = () => {}, talles = ['S', 'M', 'L', 'XL', 'XXL'] }){
    return (
        <div>
            <form>
                <div className="flex m-4 items-center justify-center flex-wrap">

                    {talles.map((t) => (
                        <label key={t} className="cursor-pointer">
                            <input
                                type="radio"
                                name="talle"
                                value={t}
                                checked={value === t}
                                onChange={() => onChange(t)}
                                className="hidden peer"
                            />
                            <div 
                                className="m-1 w-[50px] h-[50px] flex items-center justify-center rounded-lg border-4 border-Azul bg-AzulClaro font-semibold
                                           transition-transform duration-300 ease-in-out animacion-escala
                                           hover:bg-Azul hover:text-white hover:border-AzulCeleste hover:scale-110 hover:font-bold
                                           peer-checked:bg-Azul peer-checked:text-white peer-checked:border-AzulCeleste peer-checked:scale-110 peer-checked:font-bold"
                            >
                                {t}
                            </div>

                        </label>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default FormTalle;