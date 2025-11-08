import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatient,
  resetPatientState,
  selectPatientLoading,
  selectPatientError,
  selectPatientSuccess,
} from "../redux/slices/patientSlice";
import CardCarousel from "../components/CardCarousel";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectPatientLoading);
  const error = useSelector(selectPatientError);
  const success = useSelector(selectPatientSuccess);

  const TEST_PHONE = "+573004833345";

  useEffect(() => {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const handleSubmit = async (e) => {
      e.preventDefault();

      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const cellphone = document.getElementById("cellphone").value.trim();
      const message = document.getElementById("message").value.trim();

      const errorElement = document.querySelector(".form-feedback.error");
      const successElement = document.querySelector(".form-feedback.success");
      if (errorElement) errorElement.style.display = "none";
      if (successElement) successElement.style.display = "none";

      if (!fullName) {
        showError("❌ El nombre completo es obligatorio");
        return;
      }

      if (!email) {
        showError("❌ El correo electrónico es obligatorio");
        return;
      }

      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError("❌ Por favor ingresa un correo electrónico válido");
        return;
      }

      if (!cellphone) {
        showError("❌ El teléfono es obligatorio");
        return;
      }

      if (!cellphone.match(/^[0-9]{10}$/)) {
        showError("❌ El teléfono debe tener exactamente 10 números");
        return;
      }

      if (message && message.length < 10) {
        showError(
          "❌ Si escribes un mensaje, debe tener al menos 10 caracteres"
        );
        return;
      }

      if (!fullName.match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)) {
        showError("❌ El nombre solo puede contener letras y espacios");
        return;
      }

      try {
        await dispatch(
          createPatient({
            fullName,
            email,
            cellphone,
            message,
          })
        ).unwrap();

        const mensajeWhatsApp = `Hola, soy ${fullName}. Tel: ${cellphone}. ${message}`;
        window.open(
          `https://wa.me/${TEST_PHONE}?text=${encodeURIComponent(
            mensajeWhatsApp
          )}`,
          "_blank"
        );

        showSuccess("✅ ¡Redirigiendo a WhatsApp!");

        form.reset();

        setTimeout(() => {
          hideMessages();
          dispatch(resetPatientState());
        }, 3000);
      } catch (error) {
        showError("❌ Hubo un error al enviar los datos. Intenta de nuevo.");
        console.error("Error:", error);
      }
    };

    const showError = (message) => {
      const errorElement = document.querySelector(".form-feedback.error");
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
      }
    };

    const showSuccess = (message) => {
      const successElement = document.querySelector(".form-feedback.success");
      if (successElement) {
        successElement.textContent = message;
        successElement.style.display = "block";
      }
    };

    const hideMessages = () => {
      const errorElement = document.querySelector(".form-feedback.error");
      const successElement = document.querySelector(".form-feedback.success");
      if (errorElement) errorElement.style.display = "none";
      if (successElement) successElement.style.display = "none";
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Error al crear paciente:", error);
    }
  }, [error]);

  return (
    <>
      {/* Header */}
      <header className="header-home">
        <div className="container-home">
          <div className="logo">
            <img
              src="/logolipolisislaser.png"
              alt="expertoslipolisis"
              className="logo-img"
            />
            <h1>expertoslipolisis</h1>
          </div>
          <nav className="nav-home">
            <ul>
              <li>
                <a href="#inicio">Inicio</a>
              </li>
              <li>
                <a href="#servicios">Servicios</a>
              </li>
              <li>
                <a href="#resultados">Resultados</a>
              </li>
              <li>
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero">
        <div className="container-home">
          <div className="hero-flex-home">
            <div className="hero-content-home">
              <h2>Tratamientos de Lipólisis Profesional</h2>
              <p>Ofrecemos servicios especializados</p>
              <div className="hero-buttons-home">
                <a href="#servicios" className="btn btn-primary-home">
                  Nuestros Servicios
                </a>
                <a
                  href="https://wa.me/+573004833345?text=Hola,%20me%20interesa%20información%20sobre%20los%20servicios%20de%20lipólisis%20a%20domicilio"
                  target="_blank"
                  className="btn btn-whatsapp"
                  rel="noreferrer"
                >
                  <i className="fab fa-whatsapp"></i> Consulta por WhatsApp
                </a>
              </div>
            </div>
            <div className="hero-image-home">
              <img
                src="/mujerdelgadalipolisis.png"
                alt="Tratamientos de Lipólisis Profesional"
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="services">
        <div className="container-home">
          <h2>Servicios a Domicilio</h2>
          <div className="services-grid-home">
            {[
              {
                icon: "fa-dumbbell",
                title: "Corporales",
                text: "Tratamientos especializados para moldear y mejorar la apariencia de tu cuerpo.",
                query:
                  "Me%20interesa%20información%20sobre%20tratamientos%20corporales",
              },
              {
                icon: "fa-female",
                title: "Lipólisis Láser",
                text: "Tecnología láser avanzada para la eliminación de grasa localizada de forma no invasiva.",
                query: "Me%20interesa%20el%20servicio%20de%20Lipólisis%20Láser",
              },
              {
                icon: "fa-spa",
                title: "Faciales",
                text: "Tratamientos faciales especializados para rejuvenecer y mejorar la apariencia de tu rostro.",
                query:
                  "Me%20interesa%20información%20sobre%20tratamientos%20faciales",
              },
              {
                icon: "fa-tint",
                title: "Plasma Rico en Plaquetas (PRP)",
                text: "Terapia regenerativa con plasma rico en plaquetas para rejuvenecimiento y cicatrización.",
                query: "Me%20interesa%20el%20tratamiento%20de%20PRP",
              },
              {
                icon: "fa-stethoscope",
                title: "Consultas",
                text: "Evaluación profesional personalizada para determinar el mejor tratamiento para ti.",
                query: "Me%20interesa%20agendar%20una%20consulta",
              },
              {
                icon: "fa-video",
                title: "Valoración Virtual / Personalizada",
                text: "Consulta virtual personalizada desde la comodidad de tu hogar con evaluación profesional.",
                query: "Me%20interesa%20una%20valoración%20virtual",
              },
            ].map((s, i) => (
              <div key={i} className="service-card-home">
                <i className={`fas ${s.icon}`}></i>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <a
                  href={`https://wa.me/+573004833345?text=${s.query}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp-small"
                >
                  <i className="fab fa-whatsapp"></i> Consultar
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="resultados" className="results-home">
        <div className="container-home">
          <h2 style={{ marginBottom: "10px" }}>
            Resultados de Nuestros Pacientes
          </h2>
          <div className="results-grid-home">
            <CardCarousel />
          </div>
          <div className="results-cta-home" style={{ padding: "5px 0" }}>
            <p>¿Quieres ver más resultados?</p>
            <a
              href="https://wa.me/+573004833345?text=Me%20gustaría%20ver%20más%20resultados%20de%20tratamientos%20de%20lipólisis"
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <i className="fab fa-whatsapp"></i> Ver más resultados
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="contact">
        <div className="container-home">
          <h2>Contáctanos</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Información de Contacto</h3>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+57 310 271 9284</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@expertoslipolisis.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Servicios a domicilio en toda la ciudad</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>Lunes a Sábado: 8:00 AM - 6:00 PM</span>
              </div>
            </div>
            <div className="contact-form">
              <h3>Envíanos un mensaje</h3>
              <form id="contactForm" noValidate>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName">Nombre completo</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      minLength="3"
                      maxLength="50"
                      pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+"
                      placeholder="Ej: Juan Pérez"
                    />
                    <span className="error-message">
                      Ingresa un nombre válido (solo letras).
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="ejemplo@gmail.com"
                    />
                    <span className="error-message">
                      Por favor, ingresa un correo válido.
                    </span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cellphone">Teléfono</label>
                    <input
                      type="tel"
                      id="cellphone"
                      name="cellphone"
                      pattern="^[0-9]{10}$"
                      required
                      placeholder="Ej: 3001234567"
                    />
                    <span className="error-message">
                      Debe contener exactamente 10 números.
                    </span>
                  </div>
                  <div className="form-group full">
                    <label htmlFor="message">Mensaje (opcional)</label>
                    <textarea
                      id="message"
                      name="message"
                      minLength="10"
                      maxLength="300"
                      placeholder="Escribe tu mensaje "
                    ></textarea>
                    <span className="error-message">
                      Si escribes un mensaje, debe tener al menos 10 caracteres.
                    </span>
                  </div>
                </div>
                <button type="submit" className="btn-primary-home">
                  {loading ? "Enviando..." : "Enviar por WhatsApp"}
                </button>
                <p className="form-feedback success">
                  ✅ ¡Redirigiendo a WhatsApp!
                </p>
                <p className="form-feedback error">
                  ❌ Por favor completa correctamente todos los campos
                  obligatorios.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-home">
        <div className="container-home">
          <div className="footer-content-home">
            <div className="footer-section-home">
              <h4>Expertos en Lipólisis</h4>
              <p>
                Profesionales certificados en tratamientos de lipólisis con
                servicio a domicilio.
              </p>
            </div>
            <div className="footer-section-home">
              <h4>Servicios</h4>
              <ul>
                <li>Lipólisis Láser</li>
                <li>Lipo Inyección</li>
                <li>Plasma rico en plaquetas</li>
                <li>Mesoterapia</li>
                <li>Marcación lumbar definida</li>
              </ul>
            </div>
            <div className="footer-section-home">
              <h4>Contacto Rápido</h4>
              <a
                href="https://wa.me/+573004833345"
                target="_blank"
                rel="noreferrer"
                className="whatsapp-footer"
              >
                <i className="fab fa-whatsapp"></i> WhatsApp
              </a>
            </div>
          </div>
          <div className="footer-bottom-home">
            <p>
              &copy; 2024 Expertos en Lipólisis. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+573004833345?text=Hola,%20me%20interesa%20información%20sobre%20sus%20servicios"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
};

export default Home;
