import Link from "next/link";
import { useState } from "react";

import nookies from "nookies"
import Router, { useRouter } from "next/router";

export async function getStaticProps(context) {
  const dataOfApi = await fetch(
    `https://rickandmortyapi.com/api/character/1,2,3,4`
  ).then((res) => res.json());
  // const image = await fetch(`https://rickandmortyapi.com/api/character/avatar/.jpeg`);

  const allData = dataOfApi.map((datas) => {
    return datas;
  });


  const post = allData;
  return {
    // Passed to the page component as props
    props: {
      post,
    },
  };
}

export default function HomePage(props) {
  const [inputPassword, setInputPassword] = useState("");
  
  const router = useRouter();
 

  

  const [formOpen, setFormOpen] = useState(false);
  const [access, setAccess] = useState(false);
  // const datas = Data.posts;


  


  const info = {
    name: "Thaylon Haniel",
    GitHubName: "ThaylonHani",
  };



  return (
    <div style={{ textAlign: "center", color: "#63CAF2" }}>
      <style>
        {`
                
                    body::-webkit-scrollbar{
                        width: 0.4rem;
                        background-color: #0B1C26;
                    }
                    body::-webkit-scrollbar-thumb {
                        background-color: #63CAF2;    
                        border-radius: 1rem;  
                      }

                    input {
                      background-color: #63CAF2;
                      color:#0B1C26
                    }
                    input:invalid{
                      background-color: #0B1C26;
                      color:#63CAF2

                    }
                
                `}
      </style>
                    {router.asPath == "/?status=401"? <p style={{ color: "red"}}>SENHA INCORRETA TENTE NOVAMENTE</p> : false}
      <img
        src={`https://github.com/${info.GitHubName}.png`}
        style={{
          width: "17%",
          borderRadius: "20%",
          border: "2px solid #184059",
        }}
      />
      <h1>{info.name}</h1>
      <section
        style={{
          display: "flex",
          border: "2px solid #AFD9AD ",
          borderLeft: "none",
          borderRight: "none",
          gap: "1.3rem",
          overflow: "auto",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {props.post.map((posts) => <Post name = {posts.name} id = {posts.id} species = {posts.species} />)}
        
      </section>
      <a
        onClick={ async() => {
           (access ? await setFormOpen(false) : await setFormOpen(true))
        }}
        style={{
          border: "2px solid #63CAF2",
          width: "30%",
          padding: "1rem",
          textAlign: "center",
          margin: "2rem auto",
          borderRadius: "1rem",
          fontSize: "1rem0",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#63CAF2",
          backgroundColor: "#0B1C26",
          display: "block",
          textDecoration: "none",
        }}
        href="#form"
      >
        Todos os posts
      </a>
      <form
        
        onSubmit={(e) => {
          e.preventDefault();
          if (inputPassword) {
            nookies.set(null, "USER_PASSWORD", inputPassword, {
              maxAge: 30 * 24 * 60 * 60,
              path: "/"
            });
            setInputPassword("")
            Router.push("character/1");

          }
          
          else {
            alert("Senha inválida");
            setInputPassword("")
          }

        }}
        id="form"
        style={{
          backgroundColor: "#184059",
          padding: "1rem",
          margin: "2rem auto",
          width: "80%",
          borderRadius: "1rem",
          flexDirection: "column",
          alignItems: "center",
          display: `${formOpen ? "flex" : "none"}`,
        }}
      >
        <label
          htmlFor="password"
          style={{
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: "normal",
          }}
        >
          Coloque a senha para poder publicar um post:
        </label>
        <input
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          type="text"
          name="password"
          id="password"
          placeholder="Senha"
          style={{
            textAlign: "center",
            fontSize: "1rem",
            borderRadius: "0.5rem",
            width: "30%",
            border: "1px solid #63CAF2",
            padding: "0.5rem",
          }}
          required
          pattern="\d{8}"
          title="A senha é composta por 8 dígitos(sem letras ou caracteres especiais) "
        ></input>
        <button
          type="submit"
          style={{
            textDecoration: "none",
            border: "2px solid #AFD9AD",
            padding: "1rem",
            marginTop: "2rem",
            borderRadius: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            color: "#79F2E6",
            backgroundColor: "transparent",
          }}
        >
          Confirmar senha
        </button>
      </form>
    </div>
  );
}

function Post({ name, id, species }) {
  const maxLength = 100;
  return (
    <Link
      href={`/posts/${id}`}
      style={{ width: "40%", textDecoration: "none" }}
      aria-label={`Mais informações de ${name}`}
      

    >
      <div>
        <h1 style={{ color: "#63CAF2" }}>{id}</h1>
        <h2 style={{ color: "#AFD9AD" }}>{name}</h2>
        <p style={{ color: "#79F2E6" }}>
          {/* {species.length > maxLength
            ? species.replace(species.slice(maxLength), "...")
            : species} */}
          {species}
        </p>
      </div>
    </Link>
  );
}





