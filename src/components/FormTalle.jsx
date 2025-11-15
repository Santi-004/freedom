import { useState } from "react";


{/* Talles del prudcto que se muestra */}
function FormTalle({ value = '', onChange = () => {}, talles = ['S', 'M', 'L', 'XL', 'XXL'] }){
    return (
        <div>
            <form>
                <div className="flex m-10 items-center justify-center flex-wrap">
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
                                className=" m-2 rounded-md w-[50px] h-[50px] bg-Azul flex items-center justify-center
                                            peer-checked:bg-AzulCeleste peer-checked:scale-110 animacion-escala transition-transform duration-300 ease-in-out transition peer-checked:font-bold
                                ">
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