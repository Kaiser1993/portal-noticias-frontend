import { useEffect, useState } from "react";
import MenuAdm from "../components/MenuAdm";
import { useAdm } from "../hooks/useAdm_pg";
import { useNavigate } from "react-router";
import useLogin from "../hooks/useLogin_pg";
import type Administrador from "../interfaces/Administrador";

export function TelaListaAdm(){
    const {verificarUsarioLogado} = useLogin();
    const {buscarAdministradores, excluirAdministrador} = useAdm()
    const [listaAdministradores, setListaAdministradores] = useState<Administrador[]>([]);

const navigate = useNavigate();
    
useEffect(() => {
    verificarUsarioLogado();

buscarAdministradores().then((dados: Administrador[]) => {
setListaAdministradores(dados)
})

})

    return(
        <>
        <MenuAdm/>
        <main id="conteudoPrincipal">
            <h1 >
            Tela de listagem de ADM
        </h1>
<table>
            <thead>

    <tr>
        <th>
            Nome
        </th>
        <th>
            E-mail
        </th>
        <th colSpan={2}>
            Ações
        </th>
    </tr>
     </thead>
     <tbody>
        {
            listaAdministradores.map(
                (administrador ) => (
<tr key={administrador.id}>
    <td>
        {administrador.nome}
    </td>
    <td>
        {administrador.email}
    </td>
    <td>
        <button onClick={() => {
            navigate("/telaCadastroAdm", {
state: { administrador}
            });
        }}>
            Alterar
        </button>
    </td>
    <td>
        <button
        onClick={() => {
            const confirmar = window.confirm("Deseja excluir o administrador " + administrador.nome + "?");
            if(confirmar){
excluirAdministrador(administrador.id);
buscarAdministradores().then((dados: Administrador[]) => {
setListaAdministradores(dados)
})

            }
        }}>
            Excluir
        </button>
    </td>
</tr>
                )
            )
        }
     </tbody>
</table>
        </main>
        </>
    )
}