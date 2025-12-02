import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  createPatient,
  resetPatientState,
  selectPatientLoading,
  selectPatientSuccess,
} from "../redux/slices/patientSlice";
import CardCarousel from "../components/CardCarousel";
import ThemeToggle from "../components/ThemeToggle";
import "../index.css";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectPatientLoading);
  const success = useSelector(selectPatientSuccess);
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cellphone: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const TEST_PHONE = "+573004833345";

  // Theme Management
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  // Form Handling
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "El nombre completo es obligatorio";
    } else if (!formData.fullName.match(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)) {
      errors.fullName = "El nombre solo puede contener letras y espacios";
    }

    if (!formData.email.trim()) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Por favor ingresa un correo electrónico válido";
    }

    if (!formData.cellphone.trim()) {
      errors.cellphone = "El teléfono es obligatorio";
    } else if (!formData.cellphone.match(/^[0-9]{10}$/)) {
      errors.cellphone = "El teléfono debe tener exactamente 10 números";
    }

    if (formData.message && formData.message.length < 10) {
      errors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await dispatch(createPatient(formData)).unwrap();

      const mensajeWhatsApp = `Hola, soy ${formData.fullName}. Tel: ${formData.cellphone}. ${formData.message}`;
      window.open(
        `https://wa.me/${TEST_PHONE}?text=${encodeURIComponent(
          mensajeWhatsApp
        )}`,
        "_blank"
      );

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        cellphone: "",
        message: "",
      });
      setFormErrors({});

      // Reset state after 3 seconds
      setTimeout(() => {
        dispatch(resetPatientState());
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setFormErrors({
        submit: "Hubo un error al enviar los datos. Intenta de nuevo.",
      });
    }
  };

  const services = [
    {
      icon: "fa-dumbbell",
      title: "Corporales",
      text: "Tratamientos especializados para moldear y mejorar la apariencia de tu cuerpo.",
      query: "Me%20interesa%20información%20sobre%20tratamientos%20corporales",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "fa-bolt",
      title: "Lipólisis Láser",
      text: "Tecnología láser avanzada para la eliminación de grasa localizada de forma no invasiva.",
      query: "Me%20interesa%20el%20servicio%20de%20Lipólisis%20Láser",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: "fa-spa",
      title: "Faciales",
      text: "Tratamientos faciales especializados para rejuvenecer y mejorar la apariencia de tu rostro.",
      query: "Me%20interesa%20información%20sobre%20tratamientos%20faciales",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: "fa-tint",
      title: "Plasma Rico en Plaquetas (PRP)",
      text: "Terapia regenerativa con plasma rico en plaquetas para rejuvenecimiento y cicatrización.",
      query: "Me%20interesa%20el%20tratamiento%20de%20PRP",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: "fa-stethoscope",
      title: "Consultas",
      text: "Evaluación profesional personalizada para determinar el mejor tratamiento para ti.",
      query: "Me%20interesa%20agendar%20una%20consulta",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: "fa-video",
      title: "Valoración Virtual",
      text: "Consulta virtual personalizada desde la comodidad de tu hogar con evaluación profesional.",
      query: "Me%20interesa%20una%20valoración%20virtual",
      color: "from-amber-500 to-yellow-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-4 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <img
              src="/logolipolisislaser.png"
              alt="expertoslipolisis"
              className="h-12 w-auto transform transition-transform duration-300"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              ExpertosLipolisis
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {["Inicio", "Servicios", "Resultados", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition duration-300 relative group px-3 py-2"
                  >
                    {item}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-green-600 dark:bg-green-400 group-hover:w-3/4 group-hover:left-1/4 transition-all duration-300"></span>
                  </a>
                </li>
              ))}
              
              {/* Enlace al Admin */}
              <li className="ml-4">
                <Link
                  to="/admin-login"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 group"
                >
                  <i className="fas fa-user-shield text-sm"></i>
                  <span className="text-sm">Admin</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
            >
              <i
                className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
            >
              <ul className="py-4 space-y-2">
                {["Inicio", "Servicios", "Resultados", "Contacto"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-green-600 dark:hover:text-green-400 font-medium transition duration-300"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
                {/* Enlace Admin en móvil */}
                <li>
                  <Link
                    to="/admin-login"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2"
                  >
                    <i className="fas fa-user-shield"></i>
                    Acceso Admin
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section id="inicio" className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-transparent dark:from-gray-900 dark:via-gray-800 dark:to-transparent" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 dark:bg-green-600 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400 dark:bg-emerald-600 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 md:space-y-8"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-wider mb-3 md:mb-4"
                >
                  <i className="fas fa-sparkle"></i> Bienvenido
                </motion.span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-green-700 dark:from-white dark:to-green-400 bg-clip-text text-transparent leading-tight">
                  Transforma tu cuerpo con{" "}
                  <span className="text-green-600 dark:text-green-400">
                    Lipólisis Profesional
                  </span>
                </h1>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                Servicios especializados de lipólisis con tecnología avanzada,
                realizados por profesionales certificados directamente en tu
                hogar.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4"
              >
                <a
                  href="#servicios"
                  className="group relative bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white px-6 py-3 md:px-8 md:py-6 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center overflow-hidden"
                >
                  <span className="relative z-10 text-sm md:text-base">Nuestros Servicios</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 dark:from-green-600 dark:to-emerald-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>

                <a
                  href={`https://wa.me/${TEST_PHONE}?text=Hola,%20me%20interesa%20información%20sobre%20los%20servicios%20de%20lipólisis%20a%20domicilio`}
                  target="_blank"
                  rel="noreferrer"
                  className="group bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 md:gap-3 border-2 border-green-600 dark:border-green-400"
                >
                  <i className="fab fa-whatsapp text-xl md:text-2xl text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300"></i>
                  <span className="text-sm md:text-base">Consulta por WhatsApp</span>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap items-center gap-4 md:gap-6 pt-6 md:pt-8"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300">
                    Resultados Garantizados
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full animate-pulse delay-300"></div>
                  <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300">
                    Profesionales Certificados
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative group">
                <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-r from-green-400 to-emerald-400 dark:from-green-600 dark:to-emerald-600 rounded-2xl md:rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse"></div>
                <img
                  src="/mujerdelgadalipolisis.png"
                  alt="Tratamientos de Lipólisis Profesional"
                  className="relative w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition duration-500"
                />
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <i className="fas fa-award text-white text-lg md:text-xl"></i>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm md:text-base">+500</div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                        Clientes Satisfechos
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="servicios"
        className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-wider mb-3 md:mb-4">
              <i className="fas fa-star"></i> Lo que ofrecemos
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Servicios Especializados
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Tecnología avanzada con profesionales certificados llegando
              directamente a tu hogar
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative bg-white dark:bg-gray-800 p-5 md:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="absolute top-3 right-3 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className="fas fa-arrow-right text-green-500 text-base md:text-lg"></i>
                </div>

                <div
                  className={`bg-gradient-to-r ${service.color} w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <i className={`fas ${service.icon} text-xl md:text-2xl text-white`}></i>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">
                  {service.title}
                </h3>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 md:mb-6 leading-relaxed">
                  {service.text}
                </p>

                <a
                  href={`https://wa.me/${TEST_PHONE}?text=${service.query}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-medium hover:gap-3 transition-all duration-300 group text-sm md:text-base"
                >
                  <span>Consultar ahora</span>
                  <i className="fab fa-whatsapp text-base md:text-lg group-hover:scale-110 transition-transform duration-300"></i>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section
        id="resultados"
        className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm uppercase tracking-wider mb-3 md:mb-4">
              <i className="fas fa-trophy"></i> Nuestros Logros
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Resultados Transformadores
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              Historias reales de transformación y satisfacción
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-6 lg:p-8 border border-gray-200 dark:border-gray-700"
          >
            <CardCarousel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center pt-6 md:pt-8"
          >
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 md:mb-8 font-semibold">
              ¿Listo para tu propia transformación?
            </p>
            <a
              href={`https://wa.me/${TEST_PHONE}?text=Me%20gustaría%20ver%20más%20resultados%20y%20agendar%20una%20consulta`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 md:gap-4 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-sm md:text-base">Agendar Consulta Gratuita</span>
              <i className="fab fa-whatsapp text-xl md:text-2xl group-hover:rotate-12 transition-transform duration-300"></i>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contacto"
        className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-green-300 dark:bg-green-900 rounded-full blur-2xl md:blur-3xl opacity-5 md:opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-emerald-300 dark:bg-emerald-900 rounded-full blur-2xl md:blur-3xl opacity-5 md:opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block mb-4 md:mb-6"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <i className="fas fa-comments text-white text-2xl md:text-3xl"></i>
              </div>
            </motion.div>
            
          
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Reserva tu{" "}
              <span className="text-green-600 dark:text-green-400">
                Consulta Gratuita
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
              Completa el formulario y serás dirigido a WhatsApp para agendar tu
              evaluación personalizada sin costo
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
                <span className="relative">
                  <span className="relative z-10">¿Por qué elegirnos?</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 md:h-2 bg-green-500/20 dark:bg-green-400/20 -z-0"></span>
                </span>
              </h3>

              <div className="space-y-4 md:space-y-6">
                {[
                  {
                    icon: "fa-check-circle",
                    title: "Respuesta Inmediata",
                    description: "Te contactamos en menos de 15 minutos",
                    color: "from-green-500 to-emerald-500",
                    animation: "animate-pulse",
                  },
                  {
                    icon: "fa-user-md",
                    title: "Profesionales Certificados",
                    description: "Especialistas con más de 5 años de experiencia",
                    color: "from-blue-500 to-cyan-500",
                    animation: "animate-bounce",
                  },
                  {
                    icon: "fa-home",
                    title: "Servicio a Domicilio",
                    description: "Comodidad y privacidad en tu propio hogar",
                    color: "from-purple-500 to-violet-500",
                    animation: "animate-pulse",
                  },
                  {
                    icon: "fa-shield-alt",
                    title: "Garantía de Resultados",
                    description: "Protocolos seguros con seguimiento personalizado",
                    color: "from-amber-500 to-orange-500",
                    animation: "animate-bounce",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 3 }}
                    className="group relative bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 md:p-5 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
                  >
                    {/* Efecto de fondo animado */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>

                    <div className="relative flex items-center gap-3 md:gap-4">
                      <div
                        className={`bg-gradient-to-r ${item.color} w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 ${item.animation}`}
                      >
                        <i
                          className={`fas ${item.icon} text-white text-base md:text-lg`}
                        ></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1 text-sm md:text-base">
                          {item.title}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate md:whitespace-normal">
                          {item.description}
                        </p>
                      </div>
                      <i className="fas fa-arrow-right text-green-500 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-sm md:text-base"></i>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Estadísticas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-6 p-4 md:p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl md:rounded-2xl border border-green-200 dark:border-green-800"
              >
                <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
                  <div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">500+</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Clientes</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">98%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Satisfacción</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">24h</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Respuesta</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Card */}
              <div className="relative">
                {/* Efecto */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl md:rounded-3xl blur-lg opacity-20 md:opacity-30"></div>

                {/* Formulario principal */}
                <div className="relative bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-gray-100 dark:border-gray-700">
                  {/* Encabezado del formulario */}
                  <div className="text-center mb-6 md:mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-3 md:mb-4 shadow-lg">
                      <i className="fab fa-whatsapp text-white text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">
                      Agenda por WhatsApp
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                      Llena el formulario y te redirigiremos automáticamente
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {/* Campo Nombre con icono */}
                    <div className="group">
                      <label
                        htmlFor="fullName"
                        className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 md:mb-2 flex items-center gap-2"
                      >
                        <i className="fas fa-user text-green-500 text-sm"></i>
                        <span className="text-xs md:text-sm">Nombre completo *</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full px-3 md:px-4 pl-10 md:pl-12 py-3 md:py-4 bg-gray-50 dark:bg-gray-700 border-2 ${
                            formErrors.fullName
                              ? "border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } rounded-xl focus:ring-2 md:focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-sm md:text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                          placeholder="Ej: María González"
                        />
                        <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2">
                          <i className="fas fa-user text-gray-400 text-sm"></i>
                        </div>
                        {formData.fullName && !formErrors.fullName && (
                          <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2">
                            <i className="fas fa-check text-green-500 text-sm"></i>
                          </div>
                        )}
                      </div>
                      {formErrors.fullName && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1 md:gap-2"
                        >
                          <i className="fas fa-exclamation-circle text-xs"></i>
                          {formErrors.fullName}
                        </motion.p>
                      )}
                    </div>

                    {/* Campo Email con icono */}
                    <div className="group">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 md:mb-2 flex items-center gap-2"
                      >
                        <i className="fas fa-envelope text-green-500 text-sm"></i>
                        <span className="text-xs md:text-sm">Correo electrónico *</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 md:px-4 pl-10 md:pl-12 py-3 md:py-4 bg-gray-50 dark:bg-gray-700 border-2 ${
                            formErrors.email
                              ? "border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } rounded-xl focus:ring-2 md:focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-sm md:text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                          placeholder="ejemplo@gmail.com"
                        />
                        <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2">
                          <i className="fas fa-envelope text-gray-400 text-sm"></i>
                        </div>
                        {formData.email && !formErrors.email && (
                          <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2">
                            <i className="fas fa-check text-green-500 text-sm"></i>
                          </div>
                        )}
                      </div>
                      {formErrors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1 md:gap-2"
                        >
                          <i className="fas fa-exclamation-circle text-xs"></i>
                          {formErrors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Campo Teléfono con icono */}
                    <div className="group">
                      <label
                        htmlFor="cellphone"
                        className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 md:mb-2 flex items-center gap-2"
                      >
                        <i className="fas fa-phone text-green-500 text-sm"></i>
                        <span className="text-xs md:text-sm">Teléfono *</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-1 md:gap-2">
                          <span className="text-gray-400 text-sm">+57</span>
                          <div className="w-px h-3 md:h-4 bg-gray-300"></div>
                        </div>
                        <input
                          type="tel"
                          id="cellphone"
                          value={formData.cellphone}
                          onChange={handleInputChange}
                          className={`w-full px-3 md:px-4 pl-16 md:pl-20 py-3 md:py-4 bg-gray-50 dark:bg-gray-700 border-2 ${
                            formErrors.cellphone
                              ? "border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } rounded-xl focus:ring-2 md:focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-sm md:text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                          placeholder="300 123 4567"
                          maxLength="10"
                        />
                        {formData.cellphone && !formErrors.cellphone && (
                          <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2">
                            <i className="fas fa-check text-green-500 text-sm"></i>
                          </div>
                        )}
                      </div>
                      {formErrors.cellphone && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1 md:gap-2"
                        >
                          <i className="fas fa-exclamation-circle text-xs"></i>
                          {formErrors.cellphone}
                        </motion.p>
                      )}
                    </div>

                    {/* Campo Mensaje con icono y contador */}
                    <div className="group">
                      <label
                        htmlFor="message"
                        className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 md:mb-2 flex items-center gap-2"
                      >
                        <i className="fas fa-comment-dots text-green-500 text-sm"></i>
                        <span className="text-xs md:text-sm">Mensaje (opcional)</span>
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="3"
                          className={`w-full px-3 md:px-4 pl-10 md:pl-12 py-3 md:py-4 bg-gray-50 dark:bg-gray-700 border-2 ${
                            formErrors.message
                              ? "border-red-500"
                              : "border-gray-200 dark:border-gray-600"
                          } rounded-xl focus:ring-2 md:focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-sm md:text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none`}
                          placeholder="Cuéntanos sobre tus objetivos y expectativas..."
                          maxLength="300"
                        />
                        <div className="absolute left-3 md:left-4 top-3 md:top-4">
                          <i className="fas fa-comment text-gray-400 text-sm"></i>
                        </div>
                        <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 text-xs text-gray-400">
                          {formData.message.length}/300
                        </div>
                      </div>
                      {formErrors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1 md:gap-2"
                        >
                          <i className="fas fa-exclamation-circle text-xs"></i>
                          {formErrors.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Checkbox de términos */}
                    <div className="flex items-start gap-2 md:gap-3">
                      <div className="flex items-center h-5 mt-0.5">
                        <input
                          id="terms"
                          type="checkbox"
                          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-1 md:focus:ring-2"
                          required
                        />
                      </div>
                      <label
                        htmlFor="terms"
                        className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-tight"
                      >
                        Acepto recibir información sobre servicios y
                        promociones. Al enviar aceptas nuestra{" "}
                        <a
                          href="#"
                          className="text-green-600 dark:text-green-400 hover:underline"
                        >
                          Política de Privacidad
                        </a>
                        .
                      </label>
                    </div>

                    {/* Mensajes de estado */}
                    {formErrors.submit && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 md:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                      >
                        <p className="text-red-600 dark:text-red-400 text-xs md:text-sm flex items-center gap-1 md:gap-2">
                          <i className="fas fa-exclamation-triangle text-xs md:text-sm"></i>
                          {formErrors.submit}
                        </p>
                      </motion.div>
                    )}

                    {success && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-3 md:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
                      >
                        <p className="text-green-600 dark:text-green-400 text-xs md:text-sm flex items-center gap-1 md:gap-2">
                          <i className="fas fa-check-circle animate-pulse text-xs md:text-sm"></i>
                          ¡Formulario enviado! Redirigiendo a WhatsApp...
                        </p>
                      </motion.div>
                    )}

                    {/* Botón de enviar  */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white py-3 md:py-4 lg:py-5 rounded-xl font-semibold hover:shadow-lg md:hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                    >
                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                      <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                        {loading ? (
                          <>
                            <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm md:text-base">Procesando...</span>
                          </>
                        ) : (
                          <>
                            <i className="fab fa-whatsapp text-lg md:text-xl group-hover:scale-110 transition-transform duration-300"></i>
                            <span className="text-sm md:text-base lg:text-lg">
                              Enviar y Continuar en WhatsApp
                            </span>
                            <i className="fas fa-arrow-right text-sm md:text-base group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform duration-300"></i>
                          </>
                        )}
                      </span>
                    </motion.button>

                    {/* Garantías */}
                    <div className="text-center pt-3 md:pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3 lg:gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1 md:gap-2">
                          <i className="fas fa-lock text-green-500 text-xs md:text-sm"></i>
                          <span>Datos protegidos</span>
                        </div>
                        <div className="hidden sm:block w-px h-3 md:h-4 bg-gray-300"></div>
                        <div className="flex items-center gap-1 md:gap-2">
                          <i className="fas fa-clock text-green-500 text-xs md:text-sm"></i>
                          <span>Respuesta 24/7</span>
                        </div>
                        <div className="hidden sm:block w-px h-3 md:h-4 bg-gray-300"></div>
                        <div className="flex items-center gap-1 md:gap-2">
                          <i className="fas fa-shield-alt text-green-500 text-xs md:text-sm"></i>
                          <span>100% Seguro</span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Indicador visual de pasos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-4 md:mt-6 flex justify-center gap-1 md:gap-2"
              >
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
                      step === 2
                        ? "bg-green-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* CTA adicional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 text-center"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
              ¿Prefieres contactarnos directamente?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href={`tel:+573102719284`}
                className="inline-flex items-center gap-2 md:gap-3 bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium hover:bg-gray-900 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                <i className="fas fa-phone text-xs md:text-sm"></i>
                Llamar ahora
              </a>
              <a
                href={`https://wa.me/${TEST_PHONE}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 md:gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              >
                <i className="fab fa-whatsapp text-xs md:text-sm"></i>
                WhatsApp Directo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* WhatsApp Floating Button */}
      <motion.a
        href={`https://wa.me/${TEST_PHONE}?text=Hola,%20me%20interesa%20información%20sobre%20sus%20servicios`}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl hover:shadow-2xl md:hover:shadow-3xl transition-all duration-300 z-50 group"
      >
        <div className="relative">
          <i className="fab fa-whatsapp text-2xl md:text-3xl"></i>
          <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-2 h-2 md:w-4 md:h-4 bg-red-500 rounded-full animate-ping"></div>
        </div>
        <div className="absolute right-12 md:right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          ¡Escríbenos!
        </div>
      </motion.a>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-4 left-4 md:bottom-6 md:left-6 bg-gray-800 dark:bg-gray-700 text-white p-2 md:p-3 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 z-50 hover:bg-gray-900 dark:hover:bg-gray-600"
      >
        <i className="fas fa-chevron-up text-base md:text-xl"></i>
      </motion.button>
    </div>
  );
};

export default Home;