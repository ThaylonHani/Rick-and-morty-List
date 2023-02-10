import Link from "next/link";
import { useRouter } from "next/router";
// import data from "../../data.json";
export async function getStaticPaths() {

  // const paths = [
  //   { params: { id: "1" } },
  //   { params: { id: "2" } },
  //   { params: { id: "3" } },
  // ];

  
  // const dataOfApi = await fetch(`https://rickandmortyapi.com/api/character/${characters}`).then((res) => res.json());
  // const paths = dataOfApi.map((post) => {
    //   return { params : { id: `${post.id}` }};
    // });
    
    return {
      // paths: paths,
      paths: [],
      fallback: 'blocking', // can also be true or 'blocking'
    };
  }
  // const characters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126,127, 128, 129, 130 ];
export async function getStaticProps(context) {
  const id = context.params.id;
  const dataOfApi = await fetch(`https://rickandmortyapi.com/api/character/${id}`).then((res) => res.json());
  const post = dataOfApi;
  const lengthApi = await fetch(`https://rickandmortyapi.com/api/character/`).then((res) => res.json()).then((resp) => resp.info.count);
  
  
  return {
    // Passed to the page component as props
    props: {
      id: post.id,
      name: post.name,
      status:post.status,
      species: post.species,
      image: post.image,
      
      results: lengthApi
    },
  }
}

export default function Post(props) {
  const router = useRouter();

  const { id, name } = router.query;


  const post = {
    id: props.id,
    name: props.name,
    status:props.status,
    species: props.species,
    image: props.image,
    results: props.results,
  };



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
          `}
        </style>
      <section style={{display: "flex",alignItems: "center",}}>
      <Link href={`/posts/${post.id == 1 ? post.results : post.id-1 }`} style={{textDecoration: "none", backgroundColor: "transparent", padding:"1rem",}} scroll={false} title="Personagem anterior" aria-label="Personagem anterior">⬅️</Link>
      <section
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "2rem",
          cursor: "default",
        }}
      >
          <button style={{display:"flex", border:"none", backgroundColor:"transparent",color:"#63CAF2", margin:"0 auto"}} onClick={(e) => e.preventDefault()}>
            <h2  aria-label={`personagem de id: ${post.id} `} title={`personagem de id: ${post.id} `} >{post.id}</h2>
          </button>
          <img src={post.image} style={{ width: "200px",height: "200px", borderRadius: "0.5rem"}}  alt={`foto de: `+ post.name}   />
          <button style={{display:"flex", border:"none", backgroundColor:"transparent",color:"#63CAF2", margin:"0 auto"}} onClick={(e) => e.preventDefault()}>
          <h3 title={`Nome: ${post.name}`} aria-label={`Nome: ${post.name} `}>
          {post.name}
        </h3>
       </button>
          <button style={{display:"flex", border:"none", backgroundColor:"transparent",color:"#63CAF2", margin:"0 auto"}} onClick={(e) => e.preventDefault()}>
          <h5 title={`Espécie:${post.species}`} aria-label={`Espécie: ${post.species}`}>Espécie: {post.species}</h5>

          </button>
          <button style={{display:"flex", border:"none", backgroundColor:"transparent", margin:"0 auto"}} onClick={(e) => e.preventDefault()}>
          <p aria-label={`Status: ${post.status == "Alive" ? "Vivo" : post.status == "Dead" ?"Morto" : "Desconhecido" }`}  style={{ color: "#AFD9AD" }}>Status: {post.status}</p>
          </button>
      </section>
      <Link href={`/posts/${post.id == post.results? 1 : `${Number(post.id) + 1}`}`} style={{ textDecoration: "none", backgroundColor: "transparent", padding: "1rem", }}  scroll={false}title="Personagem seguinte" aria-label="Personagem seguinte" >➡️</Link>
      </section>
      <section style={{ padding: "1.3rem" ,width: "50%",backgroundColor: "#184059", border: "none", borderRadius: "0.4rem", margin: "1rem auto", textAlign: "center" }}>
      <Link href="/" style={{textDecoration: "none", backgroundColor: "transparent", color:"#63CAF2",}}>
      Voltar para HomePage
        </Link>
        </section>
    </div>
  );
}
