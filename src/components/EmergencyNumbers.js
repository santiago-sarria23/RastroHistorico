import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Shield, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { numerosEmergencia } from '../data/emergencias';

const EmergencyNumbers = () => {
  const [openSections, setOpenSections] = useState({});
  
  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const makeCall = (numero) => {
    window.open(`tel:${numero}`, '_self');
  };

  const getIconColor = (index) => {
    const colors = ['text-red-500', 'text-blue-500', 'text-green-500', 'text-purple-500', 'text-orange-500', 'text-pink-500'];
    return colors[index % colors.length];
  };

  const getBgGradient = (index) => {
    const gradients = [
      'from-red-500 to-pink-500',
      'from-blue-500 to-purple-500', 
      'from-green-500 to-teal-500',
      'from-purple-500 to-indigo-500',
      'from-orange-500 to-red-500',
      'from-pink-500 to-purple-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Números de Emergencia
          </h2>
          
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Tu seguridad es nuestra prioridad. Guarda estos números importantes y viaja tranquilo por Colombia
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Número 123 destacado */}
        <motion.div 
          className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 mb-12 text-white text-center shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center gap-4 mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Phone className="w-12 h-12 text-white" />
            <span className="text-6xl md:text-8xl font-bold">123</span>
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Línea Nacional de Emergencias</h3>
          <p className="text-xl text-red-100 mb-4">Policía • Bomberos • Ambulancia</p>
          <motion.button
            onClick={() => makeCall('123')}
            className="px-8 py-4 bg-white text-red-500 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Llamar Ahora
          </motion.button>
        </motion.div>

        {/* Secciones de emergencia */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {numerosEmergencia.map((seccion, sectionIndex) => (
            <motion.div
              key={seccion.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              <motion.button
                onClick={() => toggleSection(seccion.id)}
                className={`w-full px-8 py-6 bg-gradient-to-r ${getBgGradient(sectionIndex)} text-white font-bold text-left flex items-center justify-between hover:shadow-lg transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <Shield className="w-6 h-6" />
                  <span className="text-lg">{seccion.categoria}</span>
                </div>
                {openSections[seccion.id] ? 
                  <ChevronUp className="w-6 h-6" /> : 
                  <ChevronDown className="w-6 h-6" />
                }
              </motion.button>

              <AnimatePresence>
                {openSections[seccion.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 space-y-4">
                      {seccion.servicios.map((servicio, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">
                              {servicio.nombre}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {servicio.descripcion}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3 ml-4">
                            <span className="font-bold text-lg text-gray-800">
                              {servicio.numero}
                            </span>
                            <motion.button
                              onClick={() => makeCall(servicio.numero)}
                              className={`p-3 bg-gradient-to-r ${getBgGradient(sectionIndex)} text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Phone className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Consejos de seguridad */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AlertTriangle className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Consejos de Seguridad</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold mb-2">🚨 En emergencias</h4>
              <p className="text-sm text-blue-100">Mantén la calma y marca 123. Proporciona tu ubicación exacta.</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold mb-2">📱 Guarda los números</h4>
              <p className="text-sm text-blue-100">Añade estos números a tu lista de contactos de emergencia.</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
              <h4 className="font-semibold mb-2">🏥 Información médica</h4>
              <p className="text-sm text-blue-100">Ten a mano información sobre alergias y medicamentos.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmergencyNumbers;