import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, DollarSign, Navigation } from 'lucide-react';
import ImageChanger from './ImageChanger';
import { coordenadas } from '../data/coordenadas';

const SectionCard = ({ item, index, type, onImageChange }) => {
  const [currentImage, setCurrentImage] = useState(item.imagen);

  const getIcon = () => {
    switch (type) {
      case 'sitios':
        return <MapPin className="w-5 h-5 text-orange-500" />;
      case 'hoteles':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'comidas':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getGradient = () => {
    const gradients = [
      'from-orange-500 to-pink-500',
      'from-blue-500 to-purple-500',
      'from-green-500 to-teal-500',
      'from-red-500 to-orange-500',
      'from-purple-500 to-pink-500',
      'from-teal-500 to-blue-500'
    ];
    return gradients[index % gradients.length];
  };

  const getCoordinates = () => {
    if (type === 'sitios') {
      return coordenadas.sitios[item.id];
    } else if (type === 'playas') {
      return coordenadas.playas[item.id];
    }
    return null;
  };

  const openInGoogleMaps = () => {
    const coords = getCoordinates();
    if (coords) {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  const openInWaze = () => {
    const coords = getCoordinates();
    if (coords) {
      const wazeUrl = `https://waze.com/ul?ll=${coords.lat},${coords.lng}&navigate=yes`;
      window.open(wazeUrl, '_blank');
    }
  };

  const handleImageChange = (newImageUrl) => {
    setCurrentImage(newImageUrl);
    if (onImageChange) {
      onImageChange(item.id, newImageUrl);
    }
  };

  const coordinates = getCoordinates();

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={currentImage} 
          alt={item.nombre || item.aerolinea || item.empresa}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${getGradient()} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
        
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
            {getIcon()}
          </div>
        </div>

        {/* Cambiador de imagen */}
        <ImageChanger 
          currentImage={currentImage}
          onImageChange={handleImageChange}
          itemName={item.nombre || item.aerolinea || item.empresa}
        />

        {item.categoria && (
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1 bg-gradient-to-r ${getGradient()} text-white text-sm font-semibold rounded-full`}>
              {item.categoria}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300">
          {item.nombre || item.aerolinea || item.empresa}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {item.descripcion}
        </p>

        <div className="space-y-2 mb-4">
          {item.precio && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-green-600">{item.precio}</span>
            </div>
          )}
          
          {item.horario && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">{item.horario}</span>
            </div>
          )}
          
          {item.ubicacion && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-600">{item.ubicacion}</span>
            </div>
          )}

          {item.distancia && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600">{item.distancia}</span>
            </div>
          )}

          {item.duracion && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-gray-600">{item.duracion}</span>
            </div>
          )}

          {item.estrellas && (
            <div className="flex items-center gap-1">
              {[...Array(item.estrellas)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          )}
        </div>

        {/* Botones de navegación */}
        {coordinates && (
          <div className="flex gap-2 mb-4">
            <motion.button
              onClick={openInGoogleMaps}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Navigation className="w-4 h-4" />
              Google Maps
            </motion.button>
            
            <motion.button
              onClick={openInWaze}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-500 text-white text-sm font-semibold rounded-xl hover:bg-cyan-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Navigation className="w-4 h-4" />
              Waze
            </motion.button>
          </div>
        )}

        <motion.button
          className={`w-full py-3 bg-gradient-to-r ${getGradient()} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Más información
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SectionCard;