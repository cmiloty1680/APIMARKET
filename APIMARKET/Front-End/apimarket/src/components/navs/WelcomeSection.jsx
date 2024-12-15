import { Card } from "@/components/ui/card"
import Link from "next/link"

function WelcomeSection() {
    const modules = [
        { name: "Colmena", href: "/dashboard/hive" },
        { name: "Producción", href: "/dashboard/production" },
        { name: "Protocolo", href: "/dashboard/protocol" },
        { name: "Alimentación", href: "/dashboard/feeding"},
        { name: "Revisión", href: "/dashboard/review"},
        { name: "Implemento", href: "/dashboard/implement"},
        { name: "Raza", href: "/dashboard/race"},
        { name: "Recolección", href: "/dashboard/collecdrone"},
        { name: "Extracción", href: "/dashboard/extractions"},
        { name: "Fertilización", href: "/dashboard/fertilizations"},
        { name: "Responsable", href: "/dashboard/responsable" },
      ]
    return ( 
        <>
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-8  text-[#030712]">
      <h1 className="text-4xl font-bold mb-2">
        Bienvenidos a <span className="text-[#e87204]">APIMARKET</span>
      </h1>
      <h2 className="text-xl text-[#030712] mb-12">Módulos Disponibles</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl">
        {modules.map((module) => (
          <Link
            key={module.name}
            href={module.href}
            className="group flex items-center justify-center"
          >
            <Card className="w-full p-4 text-center  border-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#e87204] hover:text-white">
              <span className="text-sm font-medium group-hover:text-white">
                {module.name}
              </span>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-[#030712]">
        <p>Gestión de Apiarios - APIMARKET</p>
        <p>Centro Agropecuario La Granja</p>
      </div>
    </div>

        </>
     );
}

export default WelcomeSection;