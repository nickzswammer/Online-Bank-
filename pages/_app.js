import "../styles/globals.css";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../auth";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png " />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <ChakraProvider>
        <AuthProvider>
          <Component {...pageProps} />;
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
