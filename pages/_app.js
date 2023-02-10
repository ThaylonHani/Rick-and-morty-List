import Link from "next/link";
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
           
        <Component {...pageProps} />
        </>
    )
  }