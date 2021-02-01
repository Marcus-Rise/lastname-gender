import "../src/styles/global.scss";
import type { AppComponent } from "next/dist/next-server/lib/router/router";

const MyApp: AppComponent = ({ Component, pageProps }) => <Component {...pageProps} />;

export default MyApp;
