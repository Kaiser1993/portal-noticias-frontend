import { useEffect } from "react";
import MenuAdm from "../components/MenuAdm";
import useLogin from "../hooks/useLogin";

function Adm () {
const {verificarUsarioLogado} = useLogin();    
    useEffect(() => {
        verificarUsarioLogado();
    }, []);
return(
    <>
    <main id="conteudoPrincipal">
        <MenuAdm/>
    </main>
    </>
)
}

export default Adm;