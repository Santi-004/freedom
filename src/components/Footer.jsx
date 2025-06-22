import {FaPhone, FaEnvelope, FaFacebookSquare} from 'react-icons/fa';
import { AiFillMessage, AiFillTikTok  } from "react-icons/ai";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import LogoFreedomBlanco from '../assets/img/Logo Freedom Blanco.png'
import { FaXTwitter } from 'react-icons/fa6';

function Footer(){
    return(
        <footer className='bg-GrisOscuro flex flex-wrap w-full mx-auto justify-center gap-4 p-4'>
            <section className='flex flex-col flex-grow m-5 text-center max-w-[350px] max-h-[300px]'>
                <div className='text-center'>
                    <h3 className='text-white text-xl p-3 '>Navegación</h3>
                    <p className='text-white p-1' >Inicio</p>
                    <p className='text-white p-1'>Catalogo</p>
                    <p className='text-white p-1'>Favoritos</p>
                    <p className='text-white p-1'>Carrito</p>
                    <p className='text-white p-1'>Perfil</p>
                </div>
            </section>

            <section className='flex flex-col flex-grow m-5 pl-5 pr-5 text-center max-w-[350px] max-h-[300px]'>
                <div className='text-center'>
                    <h3 className='text-white text-2xl p-3 '>Contacto</h3>
                    <div className='flex items-center gap-2'>
                        <FaPhone className='h-6 w-auto text-white transform scale-x-[-1]'/>
                        <p className='text-white p-1 text-left text-lg'>Teléfono: 2994278970</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaEnvelope className='h-6 w-auto text-white'/>
                        <p className='text-white p-1 text-left text-lg'>freedomtiendaofficial@gmail.com</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <AiFillMessage className='h-6 w-auto text-white transform scale-x-[-1]'/>
                        <p className='text-white p-1 text-left text-lg'>Mensaje privado a Instagram</p>
                    </div>
                </div>
            </section>

            <section className='flex flex-col flex-grow m-5 text-center max-w-[350px] max-h-[300px]'>
                <div className='flex flex-col items-center justify-center text-center'>
                    <h3 className='text-white text-xl p-3'>Freedom</h3>
                    <img className='w-36 h-36' src={LogoFreedomBlanco} alt="" />
                </div>
            </section>


            <section className='flex flex-col flex-grow m-5 pl-14 pr-14 text-center max-w-[350px] max-h-[300px]'>
                <div className='text-center'>
                    <h3 className='text-white text-xl p-3 '>Redes</h3>
                    <div className='flex items-center gap-2'>
                        <FaSquareInstagram className='h-6 w-auto text-white'/>
                        <p className='text-white p-1 text-left'>Seguinos en Instagram</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaFacebookSquare className='h-6 w-auto text-white'/>
                        <p className='text-white p-1 text-left'>Seguinos en Facebook</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <FaSquareXTwitter className='h-6 w-auto text-white'/>
                        <p className='text-white p-1 text-left'>Seguinos en X</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <AiFillTikTok className='h-6 w-auto text-white'/>
                        <p className='text-white p-1 text-left'>Seguinos en TikTok</p>
                    </div>
                </div>
            </section>


        </footer>
    );
}

export default Footer;