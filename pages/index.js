import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import Hero from "../components/home/Hero";

export default function Home() {
  return (
    <>
      <Layout title="Home Page" displayFooter={true}>
        <Hero></Hero>
      </Layout>
    </>
  );
}
