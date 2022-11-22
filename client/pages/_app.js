import '../styles/globals.css';
import "../lib/hexStyles.css";
import { SqrrlProvider } from "../context/SqrrlContext";

function MyApp({ Component, pageProps }) {
  return (
    <SqrrlProvider>
      <Component {...pageProps} />
    </SqrrlProvider>
  )
}

export default MyApp
