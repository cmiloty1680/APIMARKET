"use client";

import { Flower2, LineChart, Calendar } from "lucide-react";

const features = [
  {
    icon: Flower2,
    title: "Control de Colmenas",
    description: "Registra la salud y producción de cada colmena de manera sencilla.",
    statText: "Colmenas Gestionadas",
  },
  {
    icon: LineChart,
    title: "Seguimiento de Producción",
    description: "Visualiza estadísticas y tendencias de tu producción apícola.",
    statText: "Kg de Miel Registrados",
  },
  {
    icon: Calendar,
    title: "Calendario Apícola",
    description: "Planifica y programa tus actividades de mantenimiento.",
    statText: "Días de Planificación",
  },
];

function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="max-w-screen-xl mx-auto px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center space-y-4 text-center">
            <feature.icon className="h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {feature.description}
            </p>
            <p className="text-sm text-gray-500">{feature.statText}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  
  );
}

export default Features;
