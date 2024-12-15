"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import PublicNav from '@/components/navs/PublicNav';

const teamMembers = [
  {
    name: "Cristian Camilo Tique Tique",
    role: "Analista y Desarrollador de Software",
    image: "/assets/img/tique.jpg?height=400&width=400",
    fullName: "Cristian Camilo Tique Tique",
    phone: "312-539-6493",
    email: "cmiloty1680@gmail.com",
    age: 19
  },
  {
    name: "Stefany Vaquiro Bocanegra",
    role: "Analista y Desarrollador de Software",
    image: "/assets/img/stefany.jpg?height=400&width=400",
    fullName: "Stefany Vaquiro Bocanegra",
    phone: "314-765-4321",
    email: "stefanyvaquiro15@gmail.com",
    age: 18
  },
  {
    name: "Jhonnier Fernando Tique",
    role: "Analista y Desarrollador de Software",
    image: "/assets/img/jhonnier.jpg?height=400&width=400",
    fullName: "Jhonnier Fernando Tique",
    phone: "321-123-4567",
    email: "jhonniertique@gmail.com",
    age: 18
  },
  {
    name: "Victor David Ruiz Padilla",
    role: "Analista y Desarrollador de Software",
    image: "/assets/img/victor.jpg?height=400&width=400",
    fullName: "Victor David Ruiz",
    phone: "322-555-6666",
    email: "victorruiz@gmail.com",
    age: 22
  },
];

const OPTIONS = { loop: true };
const AUTOPLAY_INTERVAL = 5000; // 5 segundos

function InformationPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [isPaused, setIsPaused] = useState(false);

  const autoplay = useCallback(() => {
    if (isPaused || !emblaApi) return;

    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollTo(0);
    }
  }, [emblaApi, isPaused]);

  useEffect(() => {
    if (!emblaApi) return;

    const onPointerDown = () => setIsPaused(true);
    const onSettle = () => setIsPaused(false);

    emblaApi.on('pointerDown', onPointerDown);
    emblaApi.on('settle', onSettle);

    return () => {
      emblaApi.off('pointerDown', onPointerDown);
      emblaApi.off('settle', onSettle);
    };
  }, [emblaApi]);

  useEffect(() => {
    const timer = setInterval(autoplay, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [autoplay]);

  return (
    <>
      <PublicNav />

      <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-200 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center relative">
            <span className="absolute -top-4 -left-4 text-5xl" aria-hidden="true">🐝</span>
            Quiénes Somos
            <span className="absolute -bottom-4 -right-4 text-5xl" aria-hidden="true">🐝</span>
          </h1>

          <div className="relative mb-12 max-w-2xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                    <div className="bg-white-100 border-2 border-gray-300 rounded-lg p-6 flex items-center">
                      <div className="relative w-40 h-56 mr-6 overflow-hidden rounded-lg shadow-lg">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="relative">
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2 inline-block bg-gray-200 px-4 py-2 rounded shadow">
                            {member.name}
                          </h3>
                        </div>
                        <p className="text-gray-700 mt-2 inline-block bg-transparent">
                          {member.role}
                        </p>
                        <p className="text-gray-700 mt-2 bg-transparent">
                          <strong>Nombre Completo:</strong> {member.fullName}<br />
                          <strong>Teléfono:</strong> {member.phone}<br />
                          <strong>Correo:</strong> {member.email}<br />
                          <strong>Edad:</strong> {member.age}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-200 p-8 rounded-lg shadow-lg border-2 border-gray-300 relative">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Nuestro Equipo</h2>
            <p className="text-gray-800 leading-relaxed">
              Somos un equipo diverso y apasionado de profesionales en tecnología, unidos por nuestra dedicación a la excelencia en programación. Como una colmena bien organizada, cada miembro aporta habilidades únicas y especializadas, trabajando en armonía para crear soluciones innovadoras y eficientes. Nuestra ética de trabajo se inspira en la diligencia y colaboración de las abejas, siempre buscando la mejora continua y la adaptación a nuevas tecnologías.
            </p>
            <span className="absolute -bottom-4 -right-4 text-5xl" aria-hidden="true">🐝</span>
          </div>
        </div>

        {/* Decoraciones de abejas */}
        <div className="fixed top-1/4 left-4 text-4xl animate-bounce" style={{ animationDuration: '1s' }} aria-hidden="true">🐝</div>
        <div className="fixed top-1/2 right-4 text-4xl animate-bounce" style={{ animationDuration: '1s', animationDelay: '0.5s' }} aria-hidden="true">🐝</div>
        <div className="fixed bottom-1/4 left-4 text-4xl animate-bounce" style={{ animationDuration: '1s', animationDelay: '1s' }} aria-hidden="true">🐝</div>
      </div>
    </>
  );
}

export default InformationPage;
