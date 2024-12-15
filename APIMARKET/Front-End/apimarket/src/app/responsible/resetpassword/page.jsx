"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import  PublicNav  from "@/components/navs/PublicNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailOpenIcon as Envelope } from 'lucide-react';


// const carouselItems = [
//     {
//         // title: "Gestión Apícola Digital",
//         description: "En unos momentos llegara",
//         image: "/assets/img/abejita.png",
//     },
//     {
//         // title: "Datos en Tiempo Real",
//         description: "Accede a información actualizada de tus colmenas desde cualquier dispositivo.",
//         image: "/assets/img/abejita.png"
//     },
//     {
//         // title: "Optimiza tu Producción",
//         description: "Toma decisiones informadas basadas en análisis de datos de tu apiario.",
//         image: "/assets/img/abejita.png"
//     }
// ]

function ResetPassword() {
//     const [currentSlide, setCurrentSlide] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
//     }, 5000)
//     return () => clearInterval(timer)
//   }, [])

//   const nextSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
//   }

//   const prevSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselItems.length) % carouselItems.length)
//   }



    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [msSuccess, setMsSuccess] = useState("");

    async function handlerSubmit(event) {
        event.preventDefault();
        setSubmitting(true);

        if (email === "") {
            alert("El email es requerido.");
        }
        try {
            const response = await axiosInstance.post('Api/Responsible/ResetPassUser', { emai_Responsible: email });
            console.log(response);
            setMsSuccess(response.data)
            setSuccess(true);
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
            alert(error.response.data.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <PublicNav />
            <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-white overflow-hidden">
      <Card className="w-full max-w-lg">
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-center">Recuperar contraseña</h3>
          <p className="text-gray-600 text-center mt-2 mb-6">
            Digita el correo para reenviar un token al email y poder restablecer la contraseña
          </p>
          <form onSubmit={handlerSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Ingrese Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="pl-10"
                  required
                />
                <Envelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[#e87204] hover:bg-[#030712]"
            >
              {isSubmitting ? "Enviando.." : "Restablecer"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
        </>
    );
}

export default ResetPassword;

