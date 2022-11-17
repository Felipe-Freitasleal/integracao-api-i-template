import React, { useState, useEffect } from "react"
import axios from "axios"



function Usuario (props) {
    const { id, name, pegarUsuarios } = props

    const [ usuario, setUsuario ] = useState([])
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [ editar, setEditar ] = useState(false)


    const pegarUsuarioPorId = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`, {
            headers: {
                Authorization: "felipe-leal-ammal"
            }
        })
        .then((resposta)=>{
            console.log(resposta.data)
            setUsuario(resposta.data)
        })
        .catch((erro)=>{
            console.log(erro)
        })
    }

    useEffect(()=>{
        pegarUsuarioPorId()
    }, [])

    const editarUsuario = () => {

        const body = {
            name: nome,
            email: email
        }
        const headers = {
            headers: {
                Authorization: "felipe-leal-ammal"
            }
        }
        axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, body, headers)
        .then((resposta)=>{
            console.log(resposta)
            pegarUsuarioPorId()
        })  
        .catch((erro)=>{
            console.log(erro)
        })
    }

    const deletarUsuario = () => {

        const headers = {
            headers: {
                Authorization: "felipe-leal-ammal"
            }
        }

        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${usuario.id}`, headers)
        .then((resposta)=>{
            console.log(resposta)
            pegarUsuarios()
            alert("Usuário removido")
        })  
        .catch((erro)=>{
            console.log(erro)
        })
    }

    return(
        <>
            {editar ? (
                    <div>
                        <input 
                            placeholder="nome"
                            value={nome}
                            onChange={(event)=> setNome(event.target.value)}
                        />
                        <br/>
                        <input
                            placeholder="e-mail"
                            value={email}
                            onChange={(event)=> setEmail(event.target.value)}
                        />
                        <button onClick={editarUsuario}>Editar Usuário</button>
                    </div>
            )
            :
            (
                <div>
                    <p>{usuario.name}</p>
                    <p>{usuario.email}</p>
                </div>
            )}
            <button onClick={()=>setEditar(!editar)}>Editar</button>
            <button onClick={deletarUsuario}>Deletar Usuário</button>
        </>
    )
}

export default Usuario