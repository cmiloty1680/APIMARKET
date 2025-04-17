"use client"

import { useState } from "react"
import { FaPhone, FaFax, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"
import PublicNav from "@/components/navs/PublicNav"

function ContactPage() {
  const [submissionStatus, setSubmissionStatus] = useState("")

  // Estilos integrados directamente en el componente
  const styles = {
    body: {
      margin: 0,
      fontFamily: "'Roboto', sans-serif",
      background: "linear-gradient(to bottom, #fcfbf8, #f3f1ec)",
      color: "#333",
    },
    contactContainer: {
      textAlign: "center",
      padding: "20px",
      animation: "fadeIn 1.5s ease-in-out",
    },
    h1: {
      fontSize: "2.8rem",
      color: "#444",
      margin: "10px 0",
    },
    headerSectionP: {
      fontSize: "1.2rem",
      margin: "5px 0 0",
    },
    infoSection: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
      margin: "40px 0",
    },
    infoBox: {
      background: "#333",
      color: "#fff",
      padding: "20px",
      borderRadius: "12px",
      width: "250px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s ease, background-color 0.3s ease",
      textDecoration: "none",
    },
    icon: {
      fontSize: "2.5rem",
      marginBottom: "10px",
      color: "#ff9900",
    },
    infoBoxH3: {
      fontSize: "1.5rem",
      margin: "10px 0",
    },
    mapSection: {
      padding: "20px",
      textAlign: "center",
    },
    mapSectionH3: {
      fontSize: "1.8rem",
      marginBottom: "20px",
      color: "#444",
    },
    mapContainer: {
      maxWidth: "800px",
      height: "500px",
      margin: "0 auto",
      borderRadius: "8px",
      overflow: "hidden",
      border: "2px solid rgba(200, 200, 200, 0.8)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
  }

  return (
    <>
      <style jsx>{`
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

        .info-box:hover {
          transform: scale(1.05);
          background-color: #444;
        }
      `}</style>

      <PublicNav />

      <div style={styles.contactContainer} className="contact-container">
        <h1 style={styles.h1}>Contactanos</h1>

        <div style={styles.infoSection} className="info-section">
          <a
            href="https://www.google.com/maps?q=Sena+Espinal+Tolima"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.infoBox}
            className="info-box"
          >
            <FaMapMarkerAlt style={styles.icon} />
            <h3 style={styles.infoBoxH3}>Mapa</h3>
            <p>Sena Espinal Tolima</p>
          </a>

          <a href="tel:3141234567" style={styles.infoBox} className="info-box">
            <FaPhone style={styles.icon} />
            <h3 style={styles.infoBoxH3}>Teléfono</h3>
            <p>
              <span style={{ color: "white" }}>(314) 123-4567</span>
              <br />
              Horario: 7AM-4PM
            </p>
          </a>

          <a href="tel:3214567890" style={styles.infoBox} className="info-box">
            <FaFax style={styles.icon} />
            <h3 style={styles.infoBoxH3}>Unidad Apicultura</h3>
            <p>
              📞<span style={{ color: "white" }}>(321) 456-7890</span>
            </p>
          </a>

          <a href="mailto:apimarket@email.com" style={styles.infoBox} className="info-box">
            <FaEnvelope style={styles.icon} />
            <h3 style={styles.infoBoxH3}>Correo Electrónico</h3>
            <p>
              <span style={{ color: "white" }}>apimarket@email.com</span>
            </p>
          </a>
        </div>

        {/* Sección de Mapa */}
        <section style={styles.mapSection}>
          <h3 style={styles.mapSectionH3}>Nos ubicamos en:</h3>
          <div style={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.614046747364!2d-74.88181282433691!3d4.136722896421702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3eb60c5af0b83b%3A0xa17404b42b49db89!2sCentro%20Agropecuario%20La%20Granja!5e0!3m2!1ses!2sco!4v1700565032820!5m2!1ses!2sco"
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
    </>
  )
}

export default ContactPage;