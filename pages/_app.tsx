import "../src/styles/global.scss";
import type { AppComponent } from "next/dist/next-server/lib/router/router";

const MyApp: AppComponent = ({ Component, pageProps }) => (
  <main>
    <Component {...pageProps} />
  </main>
);

export default MyApp;
