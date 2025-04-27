"use client"
import { useState, useEffect } from "react";
import Sidebar from "@/components/navs/Siderbar";
import NavPrivate from "@/components/navs/NavPrivate";
import WelcomeSection from "@/components/navs/WelcomeSection";
import { useRouter } from "next/navigation";

function Pro() {
    const TitlePage = "Bienvenidos al dashboard";
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [token, setToken] = useState("")
    const [lastname, setLastname] = useState("");

    const router = useRouter();

    useEffect(() => {
      // Debug: Confirma el contenido actual de localStorage
      setUserName(localStorage.getItem('username'))
      setUserEmail(localStorage.getItem('email'))
      setToken(localStorage.getItem('token'));
      setLastname(localStorage.getItem('lastname'))
    }, [router]);  

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="flex flex-col flex-1 text-white">
                    <NavPrivate TitlePage={TitlePage} />
                    {/* Aplicamos overflow-y-auto aquí para permitir el scroll en el contenido */}
                    <main className="flex-grow overflow-y-auto">
                        <WelcomeSection />
                    </main>
                </div>
            </div>
        </>
    );
}

export default Pro;
