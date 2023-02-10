import Link from "next/link";
import Head from "next/head";
export default function MyApp({ Component, pageProps }) {
    return (
        <>
         
            <style >
                {`
            
                   * { font-family: sans-serif;}
                    p{
                        text-align:center
                    }
                    body{
                        background-color: #0B1C26 }

                    }

                `}
            </style>
            <Head>
                <title>
                    Rick and Morty List
                </title>
           </Head>
        <Component {...pageProps} />
        </>
    )
  }