'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

const carouselItems = [
  {
    title: "Gestión Apícola Digital",
    description: "Simplifica el manejo de tus colmenas. Registra, monitorea y optimiza tu producción apícola.",
    image: "/assets/img/apimarkets.png",
  },
  {
    title: "Datos en Tiempo Real",
    description: "Accede a información actualizada de tus colmenas desde cualquier dispositivo.",
    image: "/assets/img/nueva.png"
  },
  {
    title: "Optimiza tu Producción",
    description: "Toma decisiones informadas basadas en análisis de datos de tu apiario.",
    image: "/icon.png"
  }
]

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + carouselItems.length) % carouselItems.length)
  }

  return (
<section className="relative bg-primary/5 py-4 md:py-8 flex justify-center items-center">
  <div className="container max-w-screen-xl mx-auto px-4 md:px-6">
    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            {carouselItems[currentSlide].title}
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            {carouselItems[currentSlide].description}
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button size="lg">
            <a href='/responsible/login'>Comenzar Ahora</a>
          </Button>
          <Button variant="outline" size="lg">
            Ver Tutorial
          </Button>
        </div>
      </div>
      <div className="relative">
        <img
          alt="Colmenas"
          className="mx-auto w-full aspect-video overflow-hidden rounded-xl object-cover object-center lg:aspect-square"
          height="550"
          src={carouselItems[currentSlide].image}
          width="550"
        />
      </div>
    </div>
  </div>
</section>

  )
}

export default Hero;
