"use client"

import { useState } from "react"
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaClock,
} from "react-icons/fa"
import PublicNav from "@/components/navs/PublicNav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/components/ui/use-toast"
import { Toast } from "@radix-ui/react-toast"
import { Toaster } from "@/components/ui/toaster"

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de envío
    setTimeout(() => {
      Toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos pronto.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(to bottom, #fcfbf8, #f3f1ec);
          color: #333;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 193, 7, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
          }
        }

        .contact-header {
          animation: fadeIn 1s ease-out;
        }

        .contact-info-card {
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
          animation-delay: calc(var(--index) * 0.1s);
        }

        .contact-form-container {
          animation: slideInRight 0.8s ease-out;
        }

        .social-icon {
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-5px);
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }
      `}</style>

      <PublicNav />
      <Toaster />

      <div className="min-h-screen">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16 contact-header">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contáctanos</h1>
            <p className="text-white text-lg max-w-2xl mx-auto">
              Estamos aquí para responder tus preguntas y ayudarte con cualquier información que necesites sobre
              nuestros servicios.
            </p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna de información de contacto */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Información de Contacto</h2>

                <div className="space-y-6">
                  {[
                    {
                      icon: <FaMapMarkerAlt className="text-yellow-500" />,
                      title: "Dirección",
                      content: "Centro Agropecuario La Granja, Sena Espinal, Tolima",
                      link: "https://www.google.com/maps?q=Sena+Espinal+Tolima",
                      index: 1,
                    },
                    {
                      icon: <FaPhone className="text-yellow-500" />,
                      title: "Teléfono",
                      content: "(314) 123-4567",
                      link: "tel:3141234567",
                      index: 2,
                    },
                    {
                      icon: <FaWhatsapp className="text-yellow-500" />,
                      title: "WhatsApp",
                      content: "(321) 456-7890",
                      link: "https://wa.me/573214567890",
                      index: 3,
                    },
                    {
                      icon: <FaEnvelope className="text-yellow-500" />,
                      title: "Correo Electrónico",
                      content: "apimarket@email.com",
                      link: "mailto:apimarket@email.com",
                      index: 4,
                    },
                    {
                      icon: <FaClock className="text-yellow-500" />,
                      title: "Horario de Atención",
                      content: "Lunes a Viernes: 7:00 AM - 4:00 PM",
                      link: null,
                      index: 5,
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 contact-info-card"
                      style={{ "--index": item.index }}
                    >
                      <div className="bg-yellow-100 p-3 rounded-full flex-shrink-0">{item.icon}</div>
                      <div>
                        <h3 className="font-medium text-gray-800">{item.title}</h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            target={item.link.startsWith("http") ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-yellow-600 transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-600">{item.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Redes sociales */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Síguenos</h2>
                <div className="flex justify-between">
                  {[
                    { icon: <FaFacebook size={24} />, color: "#1877F2", link: "https://facebook.com" },
                    { icon: <FaTwitter size={24} />, color: "#1DA1F2", link: "https://twitter.com" },
                    { icon: <FaInstagram size={24} />, color: "#E4405F", link: "https://instagram.com" },
                    { icon: <FaLinkedin size={24} />, color: "#0A66C2", link: "https://linkedin.com" },
                  ].map((social, index) => (
                    <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="social-icon">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: social.color }}
                      >
                        <span className="text-white">{social.icon}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna de formulario y mapa */}
            <div className="lg:col-span-2">
              {/* Formulario de contacto */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-6 contact-form-container">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Envíanos un Mensaje</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre Completo
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Correo Electrónico
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Asunto
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Asunto de tu mensaje"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={5}
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="text-right">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white pulse-animation"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Mapa */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Nuestra Ubicación</h2>
                  <p className="text-gray-600 mb-4">Centro Agropecuario La Granja, SENA Regional Tolima</p>
                </div>
                <div className="h-[400px] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.614046747364!2d-74.88181282433691!3d4.136722896421702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3eb60c5af0b83b%3A0xa17404b42b49db89!2sCentro%20Agropecuario%20La%20Granja!5e0!3m2!1ses!2sco!4v1700565032820!5m2!1ses!2sco"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banner de llamada a la acción */}
        <div className="bg-yellow-500 py-12 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">¿Tienes alguna pregunta?</h2>
            <p className="text-white text-lg mb-6">
              Nuestro equipo está listo para ayudarte con cualquier consulta sobre nuestros servicios.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="tel:3141234567"
                className="bg-white text-yellow-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <FaPhone /> Llamar Ahora
              </a>
              <a
                href="https://wa.me/573214567890"
                className="bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#128C7E] transition-colors inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage;