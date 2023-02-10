import Link from "next/link";
import { useRouter, Router } from "next/router";
import nookies from "nookies";
import { useState } from "react";

// import Data from "../../data.json";

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const page = context.params.page;
  const PASSWORD = "87654321";
  const USER_PASSWORD = cookies.USER_PASSWORD;
  const authorized = PASSWORD === USER_PASSWORD;
  if (!authorized) {
    return {
      redirect: {
        permanent: false,
        destination: "/?status=401",
      },
    };
  }
  const api = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
    ).then((res) => {
      return res.json();
    });
    
    return {
      props: { api }, // will be passed to the page component as props
    };
}

export function HandlePages() {
  const { page} = useRouter().query;
  return (
    <>
      <h2 style={{ alignSelf: "center" }}>
        <strong style={{ display: "flex", marginBottom: "1rem" }}>
          Página
        </strong>{" "}
        {page}
      </h2>
      <section
        style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "space-around",
          width: "100%",
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            color: "#79F2E6",
            width: "100%",
            padding: "2rem",
          }}
          href={`http://localhost:3000/character/${page == 1 ? 42 : page - 1}`}
          passHref
          scroll={false}
          title="Voltar página"
          aria-label={`Link para página ${page == 1 ? 42 : page - 1} `}
        >       
          Voltar página
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "#79F2E6",
            width: "100%",
            padding: "2rem",
        }}
        title="Avançar página"
          href={`http://localhost:3000/character/${
            +page == 42 ? 1 : +page + 1
          } `}
        aria-label={`Link para página ${+page == 42 ? 1 : +page + 1} `}
        scroll={false}
      >
          Avançar página
        </Link>
      </section>
    </>
  );
}


export function HandlePageSearch() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div style={{display:"flex", flexDirection:"column", gap:"1rem", padding:"2rem", borderBottom:"1px solid #63CAF2"}}>
      <label htmlFor="inputSearch">Digite o nome do personagem que queira pesquisar</label>
      <input type="text" id="inputSearch" name="inputSearch" placeholder="Ex: Rick" value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{ textAlign: "center", padding: "1rem", width: "50%", margin:"0 auto", border: "2px solid #63CAF2", borderRadius:"0.3rem", backgroundColor: "#184059", color:"#63CAF2" }} />
      <Link href={inputValue.length > 0 ? `/1/${inputValue}` : "#"} style={{textDecoration:"none", color:"#79F2E6",padding:"1rem"}} onCLick={() => nookies.destroy(null,"USER_PASSWORD")}>Pesquisar</Link>
    </div>
  )
}

export default function Pages(props) {
  return (
    <div
      style={{
        textAlign: "center",
        color: "#63CAF2",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
              .post-info{
                width: 60% ;
                  max-height: 10rem;
                  justify-content:center;
                  overflow: hidden;
                  border: 3px solid #184059;
                  padding: 1rem;
                  border-radius: 1rem;
                  text-align: center;
                  display: flex;
                  flex-direction:column;
                }
                    .post-info.active{
                       max-height:100% ;

                    }
                `}
      </style>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          border: "2px solid #AFD9AD",
          width: "80%",
          margin: "2rem auto",
          borderRadius: "0.5rem",
          padding: "3rem",
        }}
      >
        <HandlePageSearch/>
        <HandlePages />
        {props.api.results.map((post) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <h4 style={{ color: "#79F2E6" }}>{post.id}</h4>
              <Link
                href={`/posts/${post.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
                className="post-info"
                title={post.name}
                aria-label={`Link para mais informações de ${post.name}`}
              >
                <h3 style={{ color: "#AFD9AD" }}>{post.name}</h3>
                <img
                  src={post.image}
                  style={{ width: "100px", alignSelf: "center", borderRadius:"0.3rem" }}
                />
                <p>{post.species}</p>
              </Link>
            </div>
          );
        })}
        <HandlePages />
      </section>
      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "#79F2E6",
          border: "2px solid #79F2E6",
          padding: "1rem",
          width: "50%",
          borderRadius: "1rem",
          alignSelf: "center",
        }}
      >
        Voltar Para HomePage
      </Link>
    </div>
  );
}
