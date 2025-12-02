export default function Footer() {
      const TEST_PHONE = "+573004833345";

  return (
    <footer className="bg-gray-900 dark:bg-black text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <img src="/logolipolisislaser.png" alt="Logo" className="h-8 w-auto" />
                Expertos en Lipólisis
              </h4>
              <p className="text-gray-400 text-sm">
                Profesionales certificados en tratamientos de lipólisis con
                servicio a domicilio. Transformamos vidas con tecnología avanzada.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">
                  <i className="fas fa-chevron-right text-xs mr-2"></i>Lipólisis Láser
                </li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">
                  <i className="fas fa-chevron-right text-xs mr-2"></i>Lipo Inyección
                </li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">
                  <i className="fas fa-chevron-right text-xs mr-2"></i>Plasma Rico en Plaquetas
                </li>
                <li className="hover:text-green-400 transition-colors duration-300 cursor-pointer">
                  <i className="fas fa-chevron-right text-xs mr-2"></i>Mesoterapia
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#inicio" className="hover:text-green-400 transition-colors duration-300">Inicio</a></li>
                <li><a href="#servicios" className="hover:text-green-400 transition-colors duration-300">Servicios</a></li>
                <li><a href="#resultados" className="hover:text-green-400 transition-colors duration-300">Resultados</a></li>
                <li><a href="#contacto" className="hover:text-green-400 transition-colors duration-300">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contacto Rápido</h4>
              <a
                href={`https://wa.me/${TEST_PHONE}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                <span>WhatsApp</span>
              </a>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Expertos en Lipólisis. Todos los derechos reservados.
            </p>
            <p className="mt-2">
              Diseñado con ❤️ para transformar vidas
            </p>
          </div>
        </div>
      </footer>
  )
}