"use client"
import { useState, useEffect } from "react";
import Sidebar from "@/components/navs/Siderbar";
import NavPrivate from "@/components/navs/NavPrivate";
import WelcomeSection from "@/components/navs/WelcomeSection";
import PrivateRoute from "../routes/privateRoute";
// import { useRouter } from "next/navigation";
// // import { useAuth } from "../context/authContext";

function Dashboard() {
    const TitlePage = "Bienvenidos al dashboard";
  

    return (
        <>
        <PrivateRoute requiredRole={["pasante", "gestor", "instructor"]}>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="flex flex-col flex-1 text-white">
                    <NavPrivate TitlePage={TitlePage} />
                    <main className="flex-grow overflow-y-auto">
                        <WelcomeSection />
                    </main>
                </div>
            </div>
        </PrivateRoute>
        </>
    );
}

export default Dashboard;
