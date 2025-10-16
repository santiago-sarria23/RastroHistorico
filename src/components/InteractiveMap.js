import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Filter, X } from 'lucide-react';
import { coordenadas } from '../data/coordenadas';
import { sitiosTuristicos } from '../data/sitiosTuristicos';
import { playas } from '../data/playas';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos de Leaflet
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapController = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

const InteractiveMap = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mapCenter, setMapCenter] = useState([coordenadas.cartagena.lat, coordenadas.cartagena.lng]);
  const [mapZoom, setMapZoom] = useState(12);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { key: 'all', label: 'Todos los lugares', color: 'bg-purple-500' },
    { key: 'sitios', label: 'Sitios Turísticos', color: 'bg-orange-500' },
    { key: 'playas', label: 'Playas', color: 'bg-blue-500' }
  ];

  const getMarkersData = () => {
    let markers = [];
    
    if (selectedCategory === 'all' || selectedCategory === 'sitios') {
      markers = markers.concat(
        sitiosTuristicos.map(sitio => ({
          ...sitio,
          type: 'sitio',
          coordinates: coordenadas.sitios[sitio.id],
          color: 'text-orange-500'
        }))
      );
    }
    
    if (selectedCategory === 'all' || selectedCategory === 'playas') {
      markers = markers.concat(
        playas.map(playa => ({
          ...playa,
          type: 'playa',
          coordinates: coordenadas.playas[playa.id],
          color: 'text-blue-500'
        }))
      );
    }
    
    return markers.filter(marker => marker.coordinates);
  };

  const handleMarkerClick = (coordinates) => {
    setMapCenter([coordinates.lat, coordinates.lng]);
    setMapZoom(16);
  };

  const openInGoogleMaps = (address) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const openInWaze = (lat, lng) => {
    const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
    window.open(wazeUrl, '_blank');
  };

  const markers = getMarkersData();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
              <MapPin className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Mapa Interactivo
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explora Cartagena con nuestro mapa interactivo y navega directamente a cada destino
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Filtrar</span>
              </button>
              
              {/* Filtros desktop */}
              <div className="hidden sm:flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      selectedCategory === category.key
                        ? `${category.color} text-white shadow-lg`
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Mostrando {markers.length} lugares
            </div>
          </div>

          {/* Filtros móvil */}
          {isFilterOpen && (
            <motion.div 
              className="sm:hidden mt-4 bg-white rounded-xl shadow-lg p-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">Filtrar por categoría</span>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => {
                      setSelectedCategory(category.key);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedCategory === category.key
                        ? `${category.color} text-white`
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Mapa */}
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-96 md:h-[600px]">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ height: '100%', width: '100%' }}
              className="rounded-3xl"
            >
              <MapController center={mapCenter} zoom={mapZoom} />
              
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {markers.map((marker) => (
                <Marker
                  key={`${marker.type}-${marker.id}`}
                  position={[marker.coordinates.lat, marker.coordinates.lng]}
                  eventHandlers={{
                    click: () => handleMarkerClick(marker.coordinates)
                  }}
                >
                  <Popup className="custom-popup">
                    <div className="p-4 max-w-xs">
                      <img 
                        src={marker.imagen} 
                        alt={marker.nombre}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      
                      <h3 className="font-bold text-gray-800 mb-2">
                        {marker.nombre}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                        {marker.descripcion}
                      </p>
                      
                      {marker.precio && (
                        <div className="text-sm font-semibold text-green-600 mb-3">
                          {marker.precio}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => openInGoogleMaps(marker.coordinates.address)}
                          className="flex-1 px-3 py-2 bg-blue-500 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-1"
                        >
                          <Navigation className="w-3 h-3" />
                          Google Maps
                        </button>
                        
                        <button
                          onClick={() => openInWaze(marker.coordinates.lat, marker.coordinates.lng)}
                          className="flex-1 px-3 py-2 bg-cyan-500 text-white text-xs font-semibold rounded-lg hover:bg-cyan-600 transition-colors duration-300 flex items-center justify-center gap-1"
                        >
                          <Navigation className="w-3 h-3" />
                          Waze
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </motion.div>

        {/* Controles del mapa */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => {
              setMapCenter([coordenadas.cartagena.lat, coordenadas.cartagena.lng]);
              setMapZoom(12);
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MapPin className="w-5 h-5" />
            Ver toda Cartagena
          </button>
          
          <button
            onClick={() => openInGoogleMaps('Cartagena de Indias, Colombia')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Navigation className="w-5 h-5" />
            Navegar a Cartagena
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveMap;