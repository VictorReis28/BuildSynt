import React from 'react';
import { motion } from 'framer-motion';
import IconComponent from './IconComponent';
import { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-all duration-300 group"
    >
      <div className="mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
          <IconComponent name={feature.icon} size={24} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
        <p className="text-slate-400 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;