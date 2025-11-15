import Header from "../components/Header";
import Footer from "../components/Footer";
import RemeraCatalogo from "../components/RemeraCatalogo";

function Catalogo(){
    return(
        <div className="bg-AzulClaro">
            <Header></Header>
            <RemeraCatalogo></RemeraCatalogo>
            <Footer></Footer>
        </div>    
    )
}

export default Catalogo;