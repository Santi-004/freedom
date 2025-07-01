import {FaPhoneAlt, FaEnvelope, FaFacebookSquare} from 'react-icons/fa';
import { AiFillMessage, AiFillTikTok  } from "react-icons/ai";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import LogoFreedomBlanco from '../assets/img/Logo Freedom Blanco.png';
import { Link } from 'react-router-dom';

function Footer(){
    return(
        // Footer
        <footer className='bg-GrisOscuro flex flex-wrap w-full mx-auto justify-center gap-4 p-4'>
            
            {/* Sección de navegación */}
            <section className='flex flex-col flex-grow m-5 text-center max-w-[350px] max-h-[300px]'>
                <div className='text-center'>
                    <h3 className='text-white text-2xl p-3 '>Navegación</h3>
                    <div className='p-1'><Link to="/" className="linkanimado text-white cursor-pointer">Inicio</Link></div>
                    <div className='p-1'><Link to="/catalogo" className="linkanimado text-white cursor-pointer">Catálogo</Link></div>
                    <div className='p-1'><Link to="/favoritos" className="linkanimado text-white cursor-pointer">Favoritos</Link></div>
                    <div className='p-1'><Link to="/carrito" className="linkanimado text-white cursor-pointer">Carrito</Link></div>
                    <div className='p-1'><Link to="/perfil" className="linkanimado text-white cursor-pointer">Perfil</Link></div>
                </div>
            </section>

            {/* Sección de contacto */}
            <section className='flex flex-col flex-grow m-5 pl-5 pr-5 text-center max-w-[350px] max-h-[300px]'>
                <div className='text-center'>
                    <h3 className='text-white text-2xl p-3 '>Contacto</h3>
                    
                    {/* Div de teléfono */}
                    <div className='flex items-center gap-2'>
                        <FaPhoneAlt className='h-6 w-auto text-white transform animacion-escala animacion-rotacion cursor-pointer' onClick={() => {navigator.clipboard.writeText("2994278970"); 
                            alert("¡Teléfono copiado al portapapeles!");}}/>
                        <div className='p-1'><p className='text-white text-left text-lg linkanimado cursor-pointer' onClick={() => {navigator.clipboard.writeText("2994278970"); 
                            alert("Teléfono copiado al portapapeles!");}}>Teléfono: 2994278970</p></div>
                    </div>

                    {/* Div de correo */}
                    <div className='flex items-center gap-2'>
                        <FaEnvelope className='h-6 w-auto text-white animacion-escala animacion-rotacion cursor-pointer' onClick={() => {navigator.clipboard.writeText("freedomtiendaofficial@gmail.com"); 
                            alert("¡Gmail copiado al portapapeles!");}}/>
                        <div className='p-1'><p className='text-white text-left text-lg linkanimado cursor-pointer' onClick={() => {navigator.clipboard.writeText("freedomtiendaofficial@gmail.com"); 
                            alert("¡Gmail copiado al portapapeles!");}}>freedomtiendaofficial@gmail.com</p></div>
                    </div>

                    {/* Div de mensaje */}
                    <div className='flex items-center gap-2'>
                        <a  href="https://www.instagram.com/direct/t/17848310676219591"><AiFillMessage className='h-6 w-auto text-white transform scale-x-[-1] animacion-escala animacion-rotacion cursor-pointer'/></a>
                        <div className='p-1'><a className='linkanimado' href="https://www.instagram.com/direct/t/17848310676219591"><p className='text-white text-left text-lg cursor-pointer'>Mensaje privado a Instagram</p></a></div>
                    </div>
                </div>
            </section>
                            
            {/* Sección de logo Freedom */}
            <section className='flex flex-col flex-grow m-5 text-center max-w-[350px] max-h-[300px]'>
                <div className='flex flex-col items-center justify-center text-center'>
                    <h3 className='text-white text-2xl p-3'>Freedom</h3>
                    <img className='w-36 h-36' src={LogoFreedomBlanco} alt="Logo Freedom" />
                </div>
            </section>

            {/* Sección de redes */}
            <section className='flex flex-col flex-grow m-5 pl-14 pr-14 text-center max-w-[350px] max-h-[300px]'>
                <div className='text-center'>
                    <h3 className='text-white text-2xl p-3 '>Redes</h3>

                    {/* Div de Instagram */}
                    <div className='flex items-center gap-2'>
                        <a href="https://www.instagram.com/freedomofficialpage_/"><FaSquareInstagram className='h-6 w-auto text-white animacion-escala animacion-rotacion cursor-pointer'/></a>
                        <div className='p-1'><a className='linkanimado'  href="https://www.instagram.com/freedomofficialpage_/"><p className='text-white text-left cursor-pointer'>Seguinos en Instagram</p></a></div>
                    </div>

                    {/* Div de Facebook */}
                    <div className='flex items-center gap-2'>
                        <FaFacebookSquare className='h-6 w-auto text-white animacion-escala animacion-rotacion cursor-pointer'/>
                        <div className='p-1'><p className='linkanimado text-white text-left cursor-pointer'>Seguinos en Facebook</p></div>
                    </div>

                    {/* Div de Twitter */}
                    <div className='flex items-center gap-2'>
                        <FaSquareXTwitter className='h-6 w-auto text-white animacion-escala animacion-rotacion cursor-pointer'/>
                        <div className='p-1'><p className='linkanimado text-white text-left cursor-pointer'>Seguinos en X</p></div>
                    </div>

                    {/* Div TikTok */}
                    <div className='flex items-center gap-2'>
                        <AiFillTikTok className='h-6 w-auto text-white animacion-escala animacion-rotacion cursor-pointer'/>
                        <div className='p-1'><p className='linkanimado text-white text-left cursor-pointer'>Seguinos en TikTok</p></div>
                    </div>
                </div>
            </section>


        </footer>
    );
}

export default Footer;