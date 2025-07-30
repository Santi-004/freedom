import { useState } from "react";



function FormTalle(){

const [talle, setTalle] = useState('');

const talles = ['S', 'M', 'L', 'XL', 'XXL'];

    return (
        <div>
            <form>
                <div className="flex m-10 items-center justify-center flex-wrap">
                        {talles.map((talles) => (
                        <label key={talles} className=" cursor-pointer">
                            <input
                                type="radio"
                                name="talle"
                                value={talle}
                                onChange={(e) => setTalle(e.target.value)}
                                className="hidden peer"
                            />
                            <div 
                                className=" m-2 rounded-md w-[50px] h-[50px] bg-Azul flex items-center justify-center
                                            peer-checked:bg-AzulCeleste peer-checked:scale-110 animacion-escala transition-transform duration-300 ease-in-out transition peer-checked:font-bold
                                ">
                                {talles}
                            </div>
                        </label>
                        ))}
                </div>
            </form>
        </div>
    );
}

export default FormTalle;