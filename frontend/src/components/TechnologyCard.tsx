import { motion } from 'framer-motion';
import React from 'react';

import IconComponent from './IconComponent';

import type { Technology } from '../types';

interface TechnologyCardProps {
  technology: Technology;
  index: number;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  technology,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: 'easeOut',
      }}
      className='group rounded-xl border border-slate-700 bg-slate-800 p-6 transition-colors duration-200 hover:border-blue-500/50'
    >
      <div className='mb-4 flex items-center gap-4'>
        <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600'>
          <IconComponent
            name={technology.icon}
            size={24}
            className='text-white'
          />
        </div>
        <h3 className='text-xl font-bold text-white'>{technology.name}</h3>
      </div>
      <p className='leading-relaxed text-slate-400'>{technology.description}</p>
    </motion.div>
  );
};

export default TechnologyCard;
