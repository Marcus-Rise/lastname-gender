import "../src/styles/global.scss";
import type { AppComponent } from "next/dist/next-server/lib/router/router";
import { Footer } from "../src/components";

const MyApp: AppComponent = ({ Component, pageProps }) => (
  <>
    <main>
      <Component {...pageProps} />
    </main>
    <Footer />
  </>
);

export default MyApp;
