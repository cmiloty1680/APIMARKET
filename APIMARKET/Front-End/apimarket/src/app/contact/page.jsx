"use client";

import React, { useState } from "react";
import { FaPhone, FaFax, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./contactPage.css";
import PublicNav from "@/components/navs/PublicNav";

function ContactPage() {
  const [submissionStatus, setSubmissionStatus] = useState("");

  return (
    <>
      <PublicNav />

      <div className="contact-container">
      <h1>Contactanos</h1>


        <div className="info-section">
          <a href="https://www.google.com/maps?q=Sena+Espinal+Tolima"
            target="_blank"
            rel="noopener noreferrer"
            className="info-box"
            style={{ textDecoration: 'none', color: 'white' }}>
            <FaMapMarkerAlt className="icon" />
            <h3>Mapa</h3>
            <p>Sena Espinal Tolima</p>
          </a>

          <a href="tel:3141234567"
            className="info-box"
            style={{ textDecoration: 'none', color: 'white' }}>
            <FaPhone className="icon" />
            <h3>Teléfono</h3>
            <p>
              <span style={{ color: 'white' }}>(314) 123-4567</span>
              <br />
              Horario: 7AM-4PM
            </p>
          </a>

          <a href="tel:3214567890"
            className="info-box"
            style={{ textDecoration: 'none', color: 'white' }}>
            <FaFax className="icon" />
            <h3>Unidad Apicultura</h3>
            <p>📞
              <span style={{ color: 'white' }}>(321) 456-7890</span>
            </p>
          </a>

          <a href="mailto:apimarket@email.com"
            className="info-box"
            style={{ textDecoration: 'none', color: 'white' }}>
            <FaEnvelope className="icon" />
            <h3>Correo Electrónico</h3>
            <p>
              <span style={{ color: 'white' }}>apimarket@email.com</span>
            </p>
          </a>
        </div>


        {/* Sección de Mapa */}
        <section className="map-section">
          <h3> Nos ubicamos en:</h3>
          <div className="map-container">
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
  );
}

export default ContactPage;
