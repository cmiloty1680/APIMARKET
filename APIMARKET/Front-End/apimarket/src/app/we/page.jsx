"use client"

import { useState } from "react"
import Image from "next/image"
import PublicNav from "@/components/navs/PublicNav"
import { Mail, Phone, Calendar, User, MessageCircle, Briefcase, Code } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const teamMembers = [
  {
    id: "cristian",
    name: "Cristian Camilo Tique Tique",
    role: "Analista y Desarrollador de Software",
    image: "/assets/img/tique.jpg?height=400&width=400",
    fullName: "Cristian Camilo Tique Tique",
    phone: "312-539-6493",
    email: "cmiloty1680@gmail.com",
    whatsapp: "312-539-6493",
    age: 19,
    skills: ["React", "Node.js", "JavaScript", "CSS"],
    bio: "Desarrollador apasionado por crear soluciones innovadoras y eficientes.",
  },
  {
    id: "stefany",
    name: "Stefany Vaquiro Bocanegra",
    role: "Analista y Desarrollador de Software",
    image: "/assets/img/stefany.jpg?height=400&width=400",
    fullName: "Stefany Vaquiro Bocanegra",
    phone: "314-765-4321",
    email: "stefanyvaquiro15@gmail.com",
    whatsapp: "314-765-4321",
    age: 18,
    skills: ["UI/UX", "React", "HTML", "CSS"],
    bio: "Especialista en diseño de interfaces y experiencia de usuario.",
  },
  {
    id: "jhonnier",
    name: "Jhonnier Fernando Tique",
    role: "Analista y Desarrollador de Software",
    image: "/assets/img/jhonnier.jpg?height=400&width=400",
    fullName: "Jhonnier Fernando Tique",
    phone: "321-123-4567",
    email: "jhonniertique@gmail.com",
    whatsapp: "321-123-4567",
    age: 18,
    skills: ["Java", "Python", "Bases de datos", "Backend"],
    bio: "Enfocado en el desarrollo de sistemas robustos y escalables.",
  },
  {
    id: "victor",
    name: "Victor David Ruiz Padilla",
    role: "Analista y Desarrollador de Software",
    image: "/assets/img/victor.jpg?height=400&width=400",
    fullName: "Victor David Ruiz",
    phone: "322-555-6666",
    email: "victorruiz@gmail.com",
    whatsapp: "322-555-6666",
    age: 22,
    skills: ["DevOps", "Cloud", "Seguridad", "Arquitectura"],
    bio: "Especialista en infraestructura y despliegue de aplicaciones.",
  },
]

function InformationPage() {
  const [activeTab, setActiveTab] = useState("equipo")
  const [selectedMember, setSelectedMember] = useState(teamMembers[0])

  return (
    <>
      <PublicNav />

      <div className="min-h-screen bg-gray-50">
        {/* Encabezado */}
        <div className="bg-primary/5 from-gray-400 to-gray-500 py-2">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold md:text-5xl sm:text-5xl xl:text-5xl/none text-center mb-4">Quiénes Somos</h1>
            <p className="text-gray-500 text-center max-w-2xl mx-auto">
              Un equipo de profesionales dedicados a crear soluciones tecnológicas innovadoras y de alta calidad.
            </p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Tabs defaultValue="equipo" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="equipo">Nuestro Equipo</TabsTrigger>
              <TabsTrigger value="nosotros">Sobre Nosotros</TabsTrigger>
            </TabsList>

            <TabsContent value="equipo" className="space-y-8">
              {/* Selector de miembros */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`cursor-pointer transition-all duration-300 text-center ${
                      selectedMember.id === member.id ? "scale-105" : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setSelectedMember(member)}
                  >
                    <div
                      className={`relative w-20 h-20 mx-auto rounded-full overflow-hidden border-4 ${
                        selectedMember.id === member.id ? "border-yellow-400" : "border-gray-200"
                      }`}
                    >
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <p className="mt-2 font-medium text-sm">{member.name.split(" ")[0]}</p>
                  </div>
                ))}
              </div>

              {/* Información detallada del miembro seleccionado */}
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="relative w-full aspect-square md:max-w-xs mx-auto rounded-xl overflow-hidden border-4 border-yellow-400 shadow-lg">
                        <Image
                          src={selectedMember.image || "/placeholder.svg"}
                          alt={selectedMember.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <h2 className="text-2xl font-bold text-center mt-4">{selectedMember.name}</h2>
                      <p className="text-yellow-600 font-medium text-center mb-4">{selectedMember.role}</p>

                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {selectedMember.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-yellow-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre Completo */}
                        <div className="flex items-start gap-3">
                          <div className="bg-yellow-100 p-3 rounded-full mt-1">
                            <User className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Nombre Completo</p>
                            <p className="font-medium">{selectedMember.fullName}</p>
                          </div>
                        </div>

                        {/* Teléfono */}
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 p-3 rounded-full mt-1">
                            <Phone className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Teléfono</p>
                            <a
                              href={`tel:${selectedMember.phone}`}
                              className="font-medium hover:text-blue-600 hover:underline transition-colors"
                            >
                              {selectedMember.phone}
                            </a>
                          </div>
                        </div>

                        {/* Correo */}
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 p-3 rounded-full mt-1">
                            <Mail className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Correo</p>
                            <a
                              href={`mailto:${selectedMember.email}`}
                              className="font-medium hover:text-green-600 hover:underline transition-colors"
                            >
                              {selectedMember.email}
                            </a>
                          </div>
                        </div>

                        {/* Edad */}
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 p-3 rounded-full mt-1">
                            <Calendar className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Edad</p>
                            <p className="font-medium">{selectedMember.age} años</p>
                          </div>
                        </div>

                        {/* WhatsApp */}
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 p-3 rounded-full mt-1">
                            <MessageCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">WhatsApp</p>
                            <a
                              href={`https://wa.me/${selectedMember.whatsapp.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-green-600 hover:underline"
                            >
                              Enviar mensaje
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-2">Biografía</h3>
                        <p className="text-gray-700">{selectedMember.bio}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="nosotros">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/3">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Misión</h2>
                    <div className="h-1 w-20 bg-yellow-400 mb-6"></div>
                    <p className="text-gray-600 mb-6">
                      Desarrollar soluciones tecnológicas innovadoras que transformen y mejoren los procesos de nuestros
                      clientes, aportando valor real a través de la excelencia técnica y el compromiso con la calidad.
                    </p>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Code className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Desarrollo de Software</h3>
                        <p className="text-sm text-gray-500">Soluciones a medida para cada necesidad</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-100 p-3 rounded-full">
                        <Briefcase className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Consultoría Tecnológica</h3>
                        <p className="text-sm text-gray-500">Asesoramiento experto para tu negocio</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-2/3">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestro Equipo</h2>
                    <div className="h-1 w-20 bg-yellow-400 mb-6"></div>
                    <p className="text-gray-600 mb-4">
                      Somos un equipo diverso y apasionado de profesionales en tecnología, unidos por nuestra dedicación
                      a la excelencia en programación. Cada miembro aporta habilidades únicas y especializadas,
                      trabajando en armonía para crear soluciones innovadoras y eficientes.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Nuestra ética de trabajo se basa en la colaboración y el compromiso con la calidad, siempre
                      buscando la mejora continua y la adaptación a nuevas tecnologías para ofrecer el mejor servicio a
                      nuestros clientes.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-yellow-600 font-bold text-2xl">4+</div>
                        <div className="text-gray-600 text-sm">Años de experiencia</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-yellow-600 font-bold text-2xl">20+</div>
                        <div className="text-gray-600 text-sm">Proyectos completados</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-yellow-600 font-bold text-2xl">100%</div>
                        <div className="text-gray-600 text-sm">Satisfacción</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <div className="text-yellow-600 font-bold text-2xl">24/7</div>
                        <div className="text-gray-600 text-sm">Soporte técnico</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default InformationPage;