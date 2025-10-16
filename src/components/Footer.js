import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Phone, MapPin, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">La Ruta del Encanto</h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Sumérgete en la magia de Cartagena, donde cada rincón cuenta una historia y cada atardecer es una promesa de aventura.
            </p>
            <div className="flex items-center gap-2 text-orange-300">
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-sm">Hecho con amor para viajeros soñadores</span>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-300">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span>3332637202</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>info@rutadelencanto.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Cartagena de Indias, Colombia</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-300">Enlaces Rápidos</h4>
            <div className="space-y-2">
              {[
                { name: 'Sitios Turísticos', href: '#sitios' },
                { name: 'Playas Paradisíacas', href: '#playas' },
                { name: 'Gastronomía Local', href: '#comidas' },
                { name: 'Hoteles', href: '#hoteles' },
                { name: 'Transporte', href: '#transporte' },
                { name: 'Compras', href: '#almacenes' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-orange-300">Síguenos</h4>
            <p className="text-gray-300 text-sm mb-4">
              Únete a nuestra comunidad de viajeros y descubre los secretos mejor guardados de Cartagena.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, color: 'hover:text-pink-400' },
                { icon: Facebook, color: 'hover:text-blue-400' },
                { icon: Twitter, color: 'hover:text-sky-400' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`p-2 bg-gray-700 rounded-full text-gray-300 ${social.color} transition-all duration-300 hover:scale-110`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-700 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm">
            © 2025 La Ruta del Encanto. Todos los derechos reservados. 
            <span className="text-orange-300 ml-2">Cartagena te espera ✨</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;