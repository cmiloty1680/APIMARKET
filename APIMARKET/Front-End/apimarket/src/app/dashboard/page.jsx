"use client"
import { useState, useEffect } from "react";
import Sidebar from "@/components/navs/Siderbar";
import NavPrivate from "@/components/navs/NavPrivate";
import WelcomeSection from "@/components/navs/WelcomeSection";
import { useRouter } from "next/navigation";

function Pro() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      // Debug: Confirma el contenido actual de localStorage
      console.log('Contenido actual de localStorage:', {
          token: localStorage.getItem('token'),
          username: localStorage.getItem('username'),
          email: localStorage.getItem('email')
      });
  
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');
  
      // Si no existen datos, redirige al login
      if (!username || !email) {
          console.error('Datos faltantes en localStorage. Redirigiendo al login...');
          router.push("/login");
      } else {
          console.log('Datos obtenidos en el Dashboard:', { username, email });
          setUser({ username, email });
      }
  }, [router]);  
    // Si los datos del usuario aún no se han cargado (por ejemplo, en el primer renderizado)
    if (!user) {
        return null;  // O un loader si lo prefieres
    }

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden text-white">
                    <NavPrivate username={user.username} email={user.email} />
                    <main>
                        <div>
                            <WelcomeSection />
                            {/* <Tablas /> */}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default Pro;
