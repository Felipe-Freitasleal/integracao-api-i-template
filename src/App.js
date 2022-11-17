import React, { useEffect, useState } from "react";
import axios from "axios"
import Usuario from "./Usuario/Usuario";

// const usuariosLocal = [
//   {
//     id: 1,
//     name: "Muri"
//   },
//   {
//     id: 2,
//     name: "Paulinha"
//   },
//   {
//     id: 1,
//     name: "Marcelo"
//   },
//   {
//     id: 1,
//     name: "Rodrigo"
//   },
// ]

function App() {
  const [ usuarios, setUsuarios ] = useState([])
  const [ nome, setNome ] = useState("")
  const [ email, setEmail ] = useState("")


  const pegarUsuarios = () => {
    axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",{
      headers: {
        Authorization: "felipe-leal-ammal"
      }
    })
    .then((resposta)=>{
      console.log(resposta.data)
      setUsuarios(resposta.data)
    })
    .catch((erro)=>{
      console.log(erro.data)
    })
  }
  useEffect(()=>{
    pegarUsuarios()
  }, [])

  const criarUsuario = () => {

    const body = {
      name: nome,
      email: email
    }

    const headers = {
      headers: {
        Authorization: "felipe-leal-ammal"
      }
    }

   axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", body, headers)
   .then((resposta)=>{
      console.log(resposta)
      pegarUsuarios()
      setNome("")
      setEmail("")

    })
    .catch((erro)=>{
      console.log(erro)
    })
  }


  return (
    <>
      <p>Para esta aula usaremos a <a href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro" target="_blank" rel="noreferrer">API Labenusers</a></p>

      <input 
      placeholder="Insira nome"
      value={nome}
      onChange={(event)=> setNome(event.target.value)}
      />
      <br/>
      <input
      placeholder="e-mail"
      value={email}
      onChange={(event)=> setEmail(event.target.value)}
      />
      <br/>
      <button onClick={criarUsuario}>Criar Usuário</button>
      <br/>
      

      {usuarios.map((usuario) => {
        return <Usuario 
                key={usuario.id} 
                id={usuario.id}
                name={usuario.name}
                pegarUsuarios={pegarUsuarios}
                />
      })}
    </>
  )
}

export default App;
