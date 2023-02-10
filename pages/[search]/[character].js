import Link from "next/link";
import { HandlePageSearch } from "../character/[page]";
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const character = context.params.character;
  const search = context.params.search;
  try {
    const dataOfApi = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${search}&name=${character}`
    ).then((res) => res.json());
    const post = dataOfApi.results;
    const lengthPages = dataOfApi.info.pages;
    return {
      // Passed to the page component as props
      props: {
        post,
        search,
        lengthPages,
        character,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: `${error.message}`
      }
    }
  }
}

function HandlePages({ props }) {
  return (
    <div style={{ display: "flex", flexDirection:"column" }}>
    <h2>Página: {props.search} de { props.lengthPages }</h2>
    <section style={{display: "flex", flexDirection:"row", width: "50%", alignItems: "center", textAlign: "center",margin:"0 auto",gap: "2rem",}}>
    <Link
      href={props.search - props.search == 0 ? `http://localhost:3000/${
        props.search == 1 ? props.lengthPages : props.search - 1
      }/${props.character}` :`http://localhost:3000/1/${props.character}` }
      style={{
        textDecoration: "none",
        color: "#afd9ad",
        border: "2px solid #184059",
        margin: "2rem auto",
        padding: "1rem",
        display: "block",
        borderRadius: "1rem",
        maxWidth: "50%",
        width: "50%",
        }}
        scroll={false}
    >
      Página anterior
    </Link>
    <Link
      href={props.search - props.search == 0 ? `http://localhost:3000/${
        props.search == props.lengthPages ? 1 : +props.search + 1
      }/${props.character}` : `http://localhost:3000/2/${props.character}`}
      style={{
        textDecoration: "none",
        color: "inherit",
        border: "2px solid #63CAF2",
        margin: "2rem auto",
        padding: "1rem",
        display: "block",
        borderRadius: "1rem",
        maxWidth: "50%",
        width: "50%",
        }}
        scroll={false}

    >
      Próxima página
    </Link>
    </section>
  </div>
);
}

export default function Search(props) {
return (
  <div
    style={{
      textAlign: "center",
      alignItems: "center",
      color: "#63CAF2",
      width: "100%",
      marginTop: "calc(50vh/2)",
      border: "1px solid #63CAF2",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
    }}
  >
    {props.error ? <h1>Ocorreu algum erro tente novamente clicando <Link href="/character/1" style={{color:"inherit"}}>aqui</Link> </h1> : <><HandlePageSearch/>
    <HandlePages props={props} />

    
    
    {props.post.map((character) => {
      return (
        <section
          style={{
            border: "2px solid #AFD9AD",
            borderRadius: "1rem",
            width: "50%",
            textAlign: "center",
            margin: "1rem auto",
            padding: "0.5rem",
          }}
        >
          <Link href={`/posts/${character.id}`} style={{textDecoration: "none", color:"inherit"}}>
          <h1 style={{ color: "#79F2E6" }}>{character.id}</h1>
          <h2>{character.name}</h2>
          <h4>{character.species}</h4>
          <img
            src={character.image}
            style={{
              width: "15rem",
              borderRadius: "1rem",
              border: "2px solid #184059",
            }}
          />
          <h3 style={{color:"#79F2E6"}}>Status:{character.status }</h3></Link>
        </section>
      );
    })}
      <HandlePages props={props} /></>}
    <Link href="/" style={{color:"inherit", textDecoration: "none", fontSize:"1.2rem", border:"2px solid #63caf2", padding:"1rem", display:"block", borderRadius:"1rem"}}>Voltar para HomePage</Link>
  </div>
  );
}
