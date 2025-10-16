import React from 'react';
import { motion } from 'framer-motion';
import SectionCard from './SectionCard';

const Section = ({ id, title, subtitle, items, type, icon: Icon, onImageChange }) => {
  return (
    <section id={id} className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            {title}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <SectionCard 
              key={item.id} 
              item={item} 
              index={index} 
              type={type}
              onImageChange={onImageChange}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;