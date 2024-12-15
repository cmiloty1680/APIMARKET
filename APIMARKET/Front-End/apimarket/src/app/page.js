"use client"
import { useState, useEffect } from "react";
import PublicNav from "@/components/navs/PublicNav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import LoaderPage from "./LoaderPage";
import Footer from "@/components/Footer";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga inicial con un tiempo de espera
    const timer = setTimeout(() => setLoading(false), 1000); // 2 segundos
    return () => clearTimeout(timer); // Limpia el temporizador cuando el componente se desmonta
  }, []);

  return loading ? (
    <LoaderPage />
  ) : (
    <div className="flex flex-col min-h-screen">
      <PublicNav />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Benefits />
        <Footer /> 
      </main>
    </div>
  );
}

export default Home;
