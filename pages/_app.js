import { TOKEN_ICO_Provider } from "../context";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <TOKEN_ICO_Provider>
      <Component {...pageProps} />
    </TOKEN_ICO_Provider>
  );
}
