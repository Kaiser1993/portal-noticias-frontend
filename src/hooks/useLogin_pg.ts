import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function useLogin () {
    const [email, setEmail] = useState("");
    const [senha, setSenha] =  useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();
    
    async function realizarLogin (evento: React.SubmitEvent<HTMLFormElement>) {
        evento.preventDefault();
        
try {

//enviar os dados para o servidor
const resposta = await axios.post(
    "http://localhost:3000/login",
    {
        email,
        senha
    }
)

setMensagem(resposta.data.mensagem)

localStorage.setItem("usuárioLogado", "sim");
localStorage.setItem(
    "administradorLogado",
    JSON.stringify(resposta.data.administrador)
)
setTimeout(() => {
    navigate("/adm")
}, 1000);
    
} catch (error) {
    if(axios.isAxiosError(error)){
        setMensagem(
            error.response?.data?.mensagem
        )
    } else{
        setMensagem("erro inesperado");
        
    }
}
    }
        

function realizarLogout() {
    localStorage.removeItem("usuarioLogado");
}

function verificarUsarioLogado() {
const usuarioLogado = localStorage.getItem("usuarioLogado")
if(usuarioLogado != "sim") {
navigate("/login")
}

}

    return (
{
    email, setEmail,
    senha, setSenha,
    mensagem, setMensagem,
    realizarLogin,
    realizarLogout,
    verificarUsarioLogado
} 
    )
}

export default useLogin;