import { motion } from 'framer-motion';
import React from 'react';

import IconComponent from './IconComponent';

const HeroSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id='home'
      className='flex h-screen items-center justify-center px-4 pb-8 pt-20'
    >
      <div className='mx-auto max-w-4xl text-center'>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mb-8'
        >
          <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600'>
            <IconComponent name='bug' size={40} className='text-white' />
          </div>
          <h1 className='mb-6 text-4xl font-bold text-white md:text-6xl'>
            BuildSynt
          </h1>
          <p className='mb-8 text-xl text-slate-400 md:text-2xl'>
            Sistema Inteligente de Análise e Gerenciamento de Erros
          </p>
          <p className='mx-auto max-w-3xl text-lg text-slate-500'>
            Ferramenta inovadora que identifica e corrige problemas em projetos
            web de forma automatizada, proporcionando código mais limpo e
            aplicações mais estáveis através de análise inteligente.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='flex flex-col justify-center gap-4 sm:flex-row'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById('analyzer')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className='flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-medium text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-700'
          >
            <IconComponent name='search' size={20} />
            Testar Analisador
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById('about')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className='flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-8 py-3 font-medium text-white transition-all duration-300 hover:border-blue-500'
          >
            <IconComponent name='info' size={20} />
            Saiba Mais
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
