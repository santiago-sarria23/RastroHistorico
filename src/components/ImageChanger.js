import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Check } from 'lucide-react';

const ImageChanger = ({ currentImage, onImageChange, itemName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const unsplashSearchTerms = {
    // Sitios turísticos
    'Ciudad Amurallada': 'cartagena+walled+city',
    'Castillo San Felipe': 'san+felipe+castle+cartagena',
    'Teatro Heredia': 'heredia+theater+cartagena',
    'Plaza de los Coches': 'plaza+coches+cartagena',
    'Convento de la Popa': 'convento+popa+cartagena',
    'Palacio de la Inquisición': 'inquisition+palace+cartagena',
    'Las Bóvedas': 'las+bovedas+cartagena',
    'Plaza Santo Domingo': 'santo+domingo+plaza+cartagena',
    'Museo del Oro Zenú': 'gold+museum+cartagena',
    'Catedral de Cartagena': 'cathedral+cartagena',
    
    // Playas
    'Playa Blanca': 'playa+blanca+baru+cartagena',
    'Islas del Rosario': 'rosario+islands+cartagena',
    'Playa de Bocagrande': 'bocagrande+beach+cartagena',
    'Isla Múcura': 'mucura+island+colombia',
    'Playa La Boquilla': 'la+boquilla+beach+cartagena',
    'Isla Tierra Bomba': 'tierra+bomba+island',
    'Playa Manzanillo': 'manzanillo+beach+cartagena',
    'Playa Castillo Grande': 'castillo+grande+beach',
    
    // Comidas
    'Arepa de Huevo': 'arepa+huevo+colombian+food',
    'Ceviche': 'ceviche+colombian+seafood',
    'Mote de Queso': 'mote+queso+colombian+soup',
    'Pescado Frito': 'fried+fish+colombian+food',
    'Carimañolas': 'carimañolas+colombian+food',
    'Arroz con Coco': 'coconut+rice+colombian+dessert',
    'Sancocho': 'sancocho+colombian+soup',
    'Empanadas': 'empanadas+colombian+food',
    'Cocadas': 'cocadas+coconut+sweets',
    'Pargo Rojo': 'red+snapper+grilled+fish'
  };

  const getRandomImage = async () => {
    setIsLoading(true);
    try {
      const searchTerm = unsplashSearchTerms[itemName] || 'cartagena+colombia';
      const response = await fetch(`https://api.unsplash.com/photos/random?query=${searchTerm}&orientation=landscape&client_id=demo`);
      
      if (response.ok) {
        const data = await response.json();
        const newImageUrl = `${data.urls.regular}?w=800&h=600&fit=crop`;
        setImageUrl(newImageUrl);
      } else {
        // Fallback images
        const fallbackImages = [
          'https://images.unsplash.com/photo-1544737151-6e4b9d1b6a6b?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
        ];
        const randomIndex = Math.floor(Math.random() * fallbackImages.length);
        setImageUrl(fallbackImages[randomIndex]);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      setImageUrl('https://images.unsplash.com/photo-1544737151-6e4b9d1b6a6b?w=800&h=600&fit=crop');
    }
    setIsLoading(false);
  };

  const handleImageChange = () => {
    if (imageUrl) {
      onImageChange(imageUrl);
      setIsOpen(false);
      setImageUrl('');
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (imageUrl && imageUrl.startsWith('http')) {
      handleImageChange();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Camera className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Camera className="w-6 h-6 text-orange-500" />
                  Cambiar Imagen
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                Cambia la imagen de <span className="font-semibold">{itemName}</span>
              </p>

              {/* Vista previa de imagen actual */}
              <div className="mb-6">
                <img
                  src={imageUrl || currentImage}
                  alt="Vista previa"
                  className="w-full h-40 object-cover rounded-2xl"
                />
              </div>

              {/* Opciones */}
              <div className="space-y-4">
                {/* Imagen aleatoria */}
                <motion.button
                  onClick={getRandomImage}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  <Upload className="w-5 h-5" />
                  {isLoading ? 'Buscando imagen...' : 'Imagen aleatoria'}
                </motion.button>

                {/* URL personalizada */}
                <form onSubmit={handleUrlSubmit} className="space-y-3">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <motion.button
                    type="submit"
                    disabled={!imageUrl || !imageUrl.startsWith('http')}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: imageUrl && imageUrl.startsWith('http') ? 1.02 : 1 }}
                    whileTap={{ scale: imageUrl && imageUrl.startsWith('http') ? 0.98 : 1 }}
                  >
                    <Check className="w-5 h-5" />
                    Usar esta imagen
                  </motion.button>
                </form>
              </div>

              {/* Aplicar cambios */}
              {imageUrl && imageUrl !== currentImage && (
                <motion.div
                  className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-medium">¿Aplicar cambios?</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setImageUrl('')}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleImageChange}
                        className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageChanger;