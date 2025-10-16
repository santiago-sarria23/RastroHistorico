import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Shield, AlertTriangle, X, ChevronUp, ChevronDown } from 'lucide-react';

const EmergencyFloatingWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfirmCall, setShowConfirmCall] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const emergencyNumbers = [
    {
      name: "123",
      label: "Emergencias",
      description: "Policía, Bomberos, Ambulancia",
      color: "bg-red-500",
      priority: "high"
    },
    {
      name: "112",
      label: "Policía",
      description: "Seguridad y orden público",
      color: "bg-blue-500",
      priority: "high"
    },
    {
      name: "3015558888",
      label: "Policía Turística",
      description: "Seguridad para turistas",
      color: "bg-green-500",
      priority: "medium"
    },
    {
      name: "132",
      label: "Cruz Roja",
      description: "Emergencias médicas",
      color: "bg-red-600",
      priority: "high"
    }
  ];

  // Auto-hide after scrolling
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!isExpanded) {
          setIsVisible(false);
        }
      }, 3000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [isExpanded]);

  const handleCallConfirmation = (number, label) => {
    setSelectedNumber({ number, label });
    setShowConfirmCall(true);
  };

  const makeCall = () => {
    if (selectedNumber) {
      // Detectar si es móvil o desktop
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        window.location.href = `tel:${selectedNumber.number}`;
      } else {
        // En desktop, mostrar el número para marcación manual
        alert(`Marca este número: ${selectedNumber.number}\n${selectedNumber.label}`);
      }
      
      setShowConfirmCall(false);
      setSelectedNumber(null);
      setIsExpanded(false);
    }
  };

  const cancelCall = () => {
    setShowConfirmCall(false);
    setSelectedNumber(null);
  };

  return (
    <>
      {/* Widget principal */}
      <motion.div
        className={`fixed bottom-6 right-6 z-50 ${isVisible ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500`}
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <div className="relative">
          {/* Botón principal de emergencia */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-2xl hover:shadow-red-500/25 flex items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: isExpanded ? "0 0 30px rgba(239, 68, 68, 0.6)" : "0 10px 30px rgba(0, 0, 0, 0.3)"
            }}
          >
            {/* Animación de pulso */}
            <motion.div
              className="absolute inset-0 bg-red-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <Shield className="w-8 h-8 z-10 relative" />
            
            {/* Indicador de expansión */}
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-white text-red-500 rounded-full flex items-center justify-center text-xs"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </motion.div>
          </motion.button>

          {/* Panel expandido */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header del panel */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold text-lg">Emergencias</h3>
                      <p className="text-red-100 text-sm">Números de emergencia rápidos</p>
                    </div>
                  </div>
                </div>

                {/* Lista de números */}
                <div className="p-2 space-y-1 max-h-64 overflow-y-auto">
                  {emergencyNumbers.map((emergency, index) => (
                    <motion.button
                      key={emergency.name}
                      onClick={() => handleCallConfirmation(emergency.name, emergency.label)}
                      className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all duration-300 group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-12 h-12 ${emergency.color} rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                        <Phone className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800">{emergency.name}</span>
                          <span className="text-sm font-semibold text-gray-600">{emergency.label}</span>
                        </div>
                        <p className="text-xs text-gray-500">{emergency.description}</p>
                      </div>
                      
                      <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-3 text-center">
                  <p className="text-xs text-gray-600">
                    🚨 En emergencias mantén la calma y proporciona tu ubicación
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modal de confirmación de llamada */}
      <AnimatePresence>
        {showConfirmCall && selectedNumber && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Phone className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Confirmar Llamada
              </h3>
              
              <p className="text-gray-600 mb-2">
                ¿Deseas llamar a:
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="text-3xl font-bold text-red-500 mb-1">
                  {selectedNumber.number}
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {selectedNumber.label}
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  onClick={cancelCall}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancelar
                </motion.button>
                
                <motion.button
                  onClick={makeCall}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-5 h-5" />
                  Llamar
                </motion.button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                Solo usa los números de emergencia en situaciones reales de peligro
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EmergencyFloatingWidget;