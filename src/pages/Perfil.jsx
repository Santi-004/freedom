import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button"

function Perfil(){
    return(
        <body class="bg-AzulClaro">
            <div >
                <Header></Header>
                <div className="flex">
                    <div className="w-[400px] p-4 bg-Azul">
                        <div className="w-full p-2"><Button texto="INFORMACIÓN DE LA CUENTA" color="AzulClaro"></Button></div>
                        <div className="w-full p-2"><Button texto="METODOS DE PAGO" color="AzulClaro"></Button></div>
                        <div className="w-full p-2"><Button texto="PEDIDOS" color="AzulClaro"></Button></div>
                        <div className="w-full p-2"><Button texto="NOTIFICACIONES" color="AzulClaro"></Button></div>
                        <div className="w-full p-2"><Button texto="AYUDA" color="AzulClaro"></Button></div>
                    </div>
                    <div className="flex flex-col items-center justify-center mx-auto w-auto m-10">
                        <div className="rounded-full bg-Azul w-[200px] h-[200px] "></div>
                        <div className="mt-5 bg-Azul font-bold py-2 px-4 rounded-full text-center w-full min-w-[400px]"><p>Nombre:</p></div>
                        <div className="mt-5 bg-Azul font-bold py-2 px-4 rounded-full text-center w-full"><p>E-Mail:</p></div>
                        <div className="mt-5 bg-Azul font-bold py-2 px-4 rounded-full text-center w-full"><p>Teléfono:</p></div>
                    </div>
                </div>
                <Footer></Footer>
            </div>    
        </body>
        
    )
}
export default Perfil;