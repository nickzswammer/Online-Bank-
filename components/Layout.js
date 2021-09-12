import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

export default function Layout({ children, title, displayFooter }) {
  if (displayFooter === true) {
    return (
      <>
        <Head>
          <title>Grand Central BOA - {title}</title>
        </Head>
        <Navbar></Navbar>
        <main> {children} </main>
        <Footer></Footer>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Grand Central BOA - {title}</title>
        </Head>
        <Navbar></Navbar>
        <main> {children} </main>
      </>
    );
  }
}
