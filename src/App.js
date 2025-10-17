import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Section from './components/Section';
// import InteractiveMap from './components/InteractiveMap';
import EmergencyNumbers from './components/EmergencyNumbers';
import EmergencyFloatingWidget from './components/EmergencyFloatingWidget';
import TransportSection from './components/TransportSection';
import Footer from './components/Footer';

// Data imports
import { sitiosTuristicos } from './data/sitiosTuristicos';
import { playas } from './data/playas';
import { comidas } from './data/comidas';
import { hoteles } from './data/hoteles';
import { vuelos, buses } from './data/transporte';
import { almacenes } from './data/almacenes';

// Icons
import { MapPin, Waves, UtensilsCrossed, Hotel, ShoppingBag } from 'lucide-react';

const App = () => {
  const [sitiosData, setSitiosData] = useState(sitiosTuristicos);
  const [playasData, setPlayasData] = useState(playas);
  const [comidasData, setComidasData] = useState(comidas);
  const [hotelesData, setHotelesData] = useState(hoteles);
  const [almacenesData, setAlmacenesData] = useState(almacenes);

  const handleImageChange = (type, itemId, newImageUrl) => {
    switch (type) {
      case 'sitios':
        setSitiosData(prev => prev.map(item => 
          item.id === itemId ? { ...item, imagen: newImageUrl } : item
        ));
        break;
      case 'playas':
        setPlayasData(prev => prev.map(item => 
          item.id === itemId ? { ...item, imagen: newImageUrl } : item
        ));
        break;
      case 'comidas':
        setComidasData(prev => prev.map(item => 
          item.id === itemId ? { ...item, imagen: newImageUrl } : item
        ));
        break;
      case 'hoteles':
        setHotelesData(prev => prev.map(item => 
          item.id === itemId ? { ...item, imagen: newImageUrl } : item
        ));
        break;
      case 'almacenes':
        setAlmacenesData(prev => prev.map(item => 
          item.id === itemId ? { ...item, imagen: newImageUrl } : item
        ));
        break;
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Header />
      <Hero />
      
      <Section 
        id="sitios"
        title="Sitios Turísticos"
        subtitle="Descubre los tesoros históricos y culturales que hacen de Cartagena una ciudad única en el mundo"
        items={sitiosData}
        type="sitios"
        icon={MapPin}
        onImageChange={(itemId, newImageUrl) => handleImageChange('sitios', itemId, newImageUrl)}
      />
      
      <Section 
        id="playas"
        title="Playas Paradisíacas"
        subtitle="Aguas cristalinas y arenas blancas te esperan en los rincones más hermosos del Caribe colombiano"
        items={playasData}
        type="playas"
        icon={Waves}
        onImageChange={(itemId, newImageUrl) => handleImageChange('playas', itemId, newImageUrl)}
      />
      
      
      <Section 
        id="comidas"
        title="Gastronomía Caribeña"
        subtitle="Sabores auténticos que despiertan los sentidos y cuentan la historia culinaria de la costa"
        items={comidasData}
        type="comidas"
        icon={UtensilsCrossed}
        onImageChange={(itemId, newImageUrl) => handleImageChange('comidas', itemId, newImageUrl)}
      />
      
      <Section 
        id="hoteles"
        title="Hoteles de Ensueño"
        subtitle="Desde lujo colonial hasta modernos resorts, encuentra el lugar perfecto para descansar"
        items={hotelesData}
        type="hoteles"
        icon={Hotel}
        onImageChange={(itemId, newImageUrl) => handleImageChange('hoteles', itemId, newImageUrl)}
      />
      
      
      <Section 
        id="almacenes"
        title="Compras y Souvenirs"
        subtitle="Llévate un pedacito de Cartagena contigo, desde artesanías únicas hasta tesoros locales"
        items={almacenesData}
        type="almacenes"
        icon={ShoppingBag}
        onImageChange={(itemId, newImageUrl) => handleImageChange('almacenes', itemId, newImageUrl)}
      />
      {/* <InteractiveMap /> */}
      <TransportSection vuelos={vuelos} buses={buses} />
      <EmergencyNumbers />  
      {/* Widget flotante de emergencias */}
      <EmergencyFloatingWidget />
      
      <Footer />
    </motion.div>
  );
};

export default App;