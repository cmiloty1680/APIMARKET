"use client"
import React, { useState, useEffect } from 'react';
import LoaderPage from "@/app/LoaderPage";
import PublicNav from "@/components/navs/PublicNav";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import DynamicAlert from '@/components/utils/DynamicAlert';
import { useAuth } from '@/app/context/authContext';

const carouselItems = [
    {
        title: "¡Nos alegra verte!",
        description: "Inicia sesión para acceder a todas las funcionalidades de nuestra plataforma.",
        image: "/assets/img/abejita.png",
    },
    {
        title: "Gestión Digital",
        description: "Accede a información actualizada de tus colmenas desde cualquier dispositivo.",
        image: "/assets/img/abejita.png"
    },
    {
        title: "Optimiza tu Producción",
        description: "Toma decisiones informadas basados en análisis de datos de tu apiario.",
        image: "/assets/img/abejita.png"
    }
];

function LoginPage() {
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalOpenFall, setModalOpenFall] = useState(false);
    const [error, setError] = useState(null);
    const [loginToken, setLoginToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    async function handlerSubmit(event) {
        event.preventDefault();
        if (isSubmitting || isModalOpen || isModalOpenFall) return;
        setSubmitting(true);

        if (!email || !password) {
            alert("Todos los campos son requeridos");
            setSubmitting(false);
            return;
        }

        try {
            const response = await axiosInstance.post('Api/Responsible/Login', {
                emai_Responsible: email,       
                hashed_Password: password
            });

            if (response.status === 200) {
                 const userData = response.data;

                    // Validar si el usuario está activo (puede venir como "activo", "inactivo", etc.)
                    if (!userData.estado || userData.estado.toLowerCase() !== "activo") {
                        setError("Usuario inactivo. Contacte al administrador.");
                        setModalOpenFall(true);
                        setSubmitting(false);
                        return;
                    }


                setLoginToken(response.data.token);

                // Guardar en localStorage, incluyendo el rol que faltaba
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('lastname', response.data.lastname);
                localStorage.setItem('rol', response.data.rol);   // CORRECCIÓN: falta guardar rol

                setUser({
                    token: response.data.token,
                    username: response.data.username,
                    email: response.data.email,
                    rol: response.data.rol,
                });

                setModalOpen(true);
            }

        } catch (error) {
            setError(error.response?.data?.message || "Error al iniciar sesión");
            setModalOpenFall(true);
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return <LoaderPage />;
    }

    return (
        <>
            <PublicNav />
            <div className="min-h-screen flex items-center justify-center">
                <div className="absolute top-4 left-4 text-yellow-400">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                </div>

                <div className="w-full max-w-4xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-8 bg-white relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600 rounded-bl-full opacity-10"></div>
                        <div className="max-w-md mx-auto">
                            <form className="space-y-6" onSubmit={handlerSubmit}>
                                <div className="flex flex-col items-center mb-8">
                                    <Image src="/icon.png" alt="Logo" width={120} height={120} className="mb-4" />
                                    <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
                                </div>

                                <div className="space-y-6">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Image src="/assets/img/person-outline.svg" alt="Usuario" width={20} height={20} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#e87204] sm:text-sm"
                                            placeholder="Ingresar Email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Image src="/assets/img/lock-closed-outline.svg" alt="Contraseña" width={20} height={20} className="text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#e87204] sm:text-sm"
                                            placeholder="Ingresar Contraseña"
                                            name="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e87204] hover:bg-[#030712]"
                                    >
                                        {isSubmitting ? "Iniciando..." : "Ingresar"}
                                    </Button>

                                    <div className="flex flex-col items-center space-y-2 text-sm">
                                        <a href="resetpassword" className="font-medium text-primary hover:text-primary/80">¿Olvidaste tu contraseña?</a>
                                        <p>¿No tienes cuenta? <a href="create" className="font-medium text-gray-600 hover:text-gray-500 underline">Crea una.</a></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 bg-[#030712] to-purple-800 p-12 flex flex-col justify-center">
                        <div className="text-center">
                            <div className="space-y-2">
                                <h1 className="text-white font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    {carouselItems[currentSlide].title}
                                </h1>
                                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                    {carouselItems[currentSlide].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DynamicAlert
                isOpen={isModalOpen}
                onOpenChange={setModalOpen}
                type="success"
                message={
                    loginToken
                        ? `Inicio de sesión exitoso. Token: ${loginToken.substring(0, 10)}...${loginToken.slice(-10)}`
                        : "Operación exitosa"
                }
                redirectPath="/dashboard"
            />

            <DynamicAlert
                isOpen={isModalOpenFall}
                onOpenChange={setModalOpenFall}
                type="error"
                message={error || "Ha ocurrido un error inesperado"}
                redirectPath=""
            />
        </>
    );
}

export default LoginPage;
