"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    title: "Ahorro de Tiempo",
    description: "Gestiona tus colmenas de manera eficiente y rápida.",
    extendedDescription:
      "Nuestro sistema automatiza tareas repetitivas, permitiéndote enfocarte en lo que realmente importa: tus abejas y tu producción.",
  },
  {
    title: "Datos en Tiempo Real",
    description: "Accede a información actualizada desde cualquier dispositivo.",
    extendedDescription:
      "Con nuestra app móvil, puedes actualizar y consultar datos de tus colmenas en cualquier momento y lugar.",
  },
  {
    title: "Decisiones Informadas",
    description: "Toma mejores decisiones basadas en datos reales.",
    extendedDescription:
      "Nuestros análisis y reportes te ayudan a identificar tendencias y oportunidades para mejorar tu producción apícola.",
  },
];

function Benefits() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
    <div className="max-w-screen-xl mx-auto px-4 md:px-6">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
        ¿Por qué elegirnos?
      </h2>
      <div className="grid gap-6 lg:grid-cols-3">
        {benefits.map((benefit, index) => (
          <Card
            key={index}
            className="border-none shadow-lg cursor-pointer transition-transform duration-300 hover:shadow-xl hover:scale-105"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                {benefit.title}
              </h3>
              <p
                className="text-gray-500 dark:text-gray-400 transition-all duration-300 overflow-hidden"
                style={{
                  maxHeight: expandedIndex === index ? "1000px" : "100px",
                }}
              >
                {expandedIndex === index
                  ? benefit.extendedDescription
                  : benefit.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
  
  );
}

export default Benefits;
