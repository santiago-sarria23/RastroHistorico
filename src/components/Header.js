import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Menu, X, Heart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Sitios Turísticos', href: '#sitios' },
    { name: 'Playas', href: '#playas' },
    { name: 'Gastronomía', href: '#comidas' },
    { name: 'Hoteles', href: '#hoteles' },
    { name: 'Transporte', href: '#transporte' },
    { name: 'Compras', href: '#almacenes' }
  ];

  return (
    <motion.header 
      className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-2xl sticky top-0 z-50 z-10000"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                La Ruta del Encanto
              </h1>
              <p className="text-orange-100 text-sm font-medium">
                Sumérgete en la magia de Cartagena ✨
              </p>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-6">
            <motion.div 
              className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-4 h-4 text-white" />
              <span className="text-white font-semibold">3332637202</span>
            </motion.div>
            
            <nav className="flex items-center gap-1">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-medium text-sm"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
          </div>

          <motion.button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="pt-4 pb-2 space-y-2">
            <div className="flex items-center justify-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm mb-4">
              <Phone className="w-4 h-4 text-white" />
              <span className="text-white font-semibold">3332637202</span>
            </div>
            
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;