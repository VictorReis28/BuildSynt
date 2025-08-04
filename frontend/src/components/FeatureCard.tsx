import { motion } from 'framer-motion';
import React from 'react';

import IconComponent from './IconComponent';

import type { Feature } from '../types';

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
      className='group rounded-xl border border-slate-700 bg-slate-800 p-6 transition-all duration-300 hover:border-purple-500/50'
    >
      <div className='mb-4'>
        <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 transition-transform group-hover:scale-110'>
          <IconComponent name={feature.icon} size={24} className='text-white' />
        </div>
        <h3 className='mb-2 text-xl font-bold text-white'>{feature.title}</h3>
        <p className='leading-relaxed text-slate-400'>{feature.description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
