import Header from "../components/Header";
import Footer from "../components/Footer";
import RemeraCatalogo from "../components/RemeraCatalogo";

function Catalogo(){
    return(
        <body class="bg-AzulClaro">
            <div >
                <Header></Header>
                <RemeraCatalogo></RemeraCatalogo>
                <Footer></Footer>
            </div>    
        </body>
        
    )
}

export default Catalogo;