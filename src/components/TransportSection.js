import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Bus, Clock, DollarSign, MapPin } from 'lucide-react';

const TransportCard = ({ item, index, type }) => {
  const Icon = type === 'vuelo' ? Plane : Bus;
  const bgColor = type === 'vuelo' ? 'from-blue-500 to-sky-500' : 'from-green-500 to-emerald-500';

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, x: type === 'vuelo' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 bg-gradient-to-r ${bgColor} rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            {item.aerolinea || item.empresa}
          </h3>
          <p className="text-sm text-gray-500">Desde {item.origen}</p>
        </div>
      </div>

      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
        {item.descripcion}
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-green-600">{item.precio}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">{item.duracion}</span>
          </div>
        </div>
        
        {item.frecuencia && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-600">{item.frecuencia}</span>
          </div>
        )}

        {item.comodidad && (
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
            {item.comodidad}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const TransportSection = ({ vuelos, buses }) => {
  return (
    <section id="transporte" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl">
              <Plane className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Cómo Llegar
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Todas las rutas llevan a Cartagena, elige la tuya y prepárate para vivir la magia caribeña
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vuelos */}
          <div>
            <motion.h3 
              className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Plane className="w-6 h-6 text-blue-500" />
              Vuelos
            </motion.h3>
            <div className="space-y-4">
              {vuelos.map((vuelo, index) => (
                <TransportCard 
                  key={vuelo.id} 
                  item={vuelo} 
                  index={index} 
                  type="vuelo"
                />
              ))}
            </div>
          </div>

          {/* Buses */}
          <div>
            <motion.h3 
              className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Bus className="w-6 h-6 text-green-500" />
              Buses
            </motion.h3>
            <div className="space-y-4">
              {buses.map((bus, index) => (
                <TransportCard 
                  key={bus.id} 
                  item={bus} 
                  index={index} 
                  type="bus"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransportSection;