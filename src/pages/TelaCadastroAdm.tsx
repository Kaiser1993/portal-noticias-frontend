import { useLocation } from "react-router";
import MenuAdm from "../components/MenuAdm";
import { useAdm } from "../hooks/useAdm";
import { useEffect } from "react";
import useLogin from "../hooks/useLogin";

function TelaCadastroAdm () {
    const {verificarUsarioLogado} = useLogin();
    const {mensagem, id, setId, nome,  email, senha, setNome, setEmail, setSenha, cadastrarAdm, alterarAdministrador}  = useAdm();

const location = useLocation();

const administrador = location.state?.administrador;

useEffect(() => {
    verificarUsarioLogado();
if(administrador ){
    setId(administrador.id);
setNome(administrador.nome);
setEmail(administrador.email);
setSenha(administrador.senha);
}    
else{
    setId("");
    setNome("");
    setEmail("");
    setSenha("");
}
}, [administrador] );

return (
    <>
    <MenuAdm/>
    <h1 >
        {
            administrador?"Tela Alteração de Administrador ": "Tela de Cadastro de Administrador"

        }
    </h1>
<main className="conteudoPrincipal">
</main>
<div id="divMensagem" role="alert">
       {mensagem} 
        </div>
        <form id="forCadAdm"  
        onSubmit={(evento)=> {
            administrador?alterarAdministrador(evento, administrador.id): cadastrarAdm(evento)
        }}>
 
<div>
    <input type="hidden" id="txtId"
    value={id}
    onChange={(evento) => setId(evento.target.value)}/>
</div>

 <div>
                <label htmlFor="txtNome">
                    Nome
                </label>
<br/>
                <input type="text" id="txtNome" required value={nome} onChange={(evento) => {setNome(evento.target.value)}}/>
            </div>
            <div>
                <label htmlFor="txtEmail">
                    E-mail
                </label>
                <br/>
            <input type="email" id="txtEmail" required
             value={email} onChange={(evento) => {setEmail(evento.target.value)}}/>
            </div>
            <div>
                <label htmlFor="txtSenha">
                Senha 
                </label>
                <br/>
            <input type="password" id="txtSenha" required 
            value={senha} onChange={(evento) => {setSenha(evento.target.value)}}/>
 </div>

 <div>
                <button type="submit">
                    {administrador?"Alterar":"Cadastrar"}
                </button>       
            </div>
        </form>

    </>
);
}

export default TelaCadastroAdm;
