import { motion } from 'framer-motion';
import React from 'react';

import IconComponent from './IconComponent';

const AboutSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id='about'
      className='px-4 py-20'
    >
      <div className='mx-auto max-w-4xl'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-white'>
            Sobre o Projeto
          </h2>
          <p className='text-lg text-slate-400'>
            Análise de código e Gestão de erros
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-2'>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='rounded-xl border border-slate-700 bg-slate-800 p-8'
          >
            <div className='mb-4 flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600'>
                <IconComponent name='info' size={20} className='text-white' />
              </div>
              <h3 className='text-xl font-bold text-white'>Objetivo</h3>
            </div>
            <p className='leading-relaxed text-slate-400'>
              Desenvolver uma solução inteligente e automatizada para
              identificação, análise e correção de erros em projetos web,
              reduzindo significativamente o tempo de debugging e melhorando a
              qualidade do código através de tecnologias modernas e análise
              preditiva.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='rounded-xl border border-slate-700 bg-slate-800 p-8'
          >
            <div className='mb-4 flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500'>
                <IconComponent name='bug' size={20} className='text-white' />
              </div>
              <h3 className='text-xl font-bold text-white'>
                Problema Identificado
              </h3>
            </div>
            <p className='leading-relaxed text-slate-400'>
              Desenvolvedores frequentemente enfrentam dificuldades para
              identificar, atualizar e corrigir erros específicos em seus
              projetos. O sistema propõe uma solução automatizada para a análise
              e sugestão de correções, melhorando a qualidade do código.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='mt-8 rounded-xl border border-slate-700 bg-slate-800 p-8'
        >
          <div className='mb-4 flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-teal-500'>
              <IconComponent
                name='arrow-right'
                size={20}
                className='text-white'
              />
            </div>
            <h3 className='text-xl font-bold text-white'>Diferenciais</h3>
          </div>
          <p className='leading-relaxed text-slate-400'>
            Plataforma integrada que oferece análise de código-fonte
            automatizada, detecção inteligente de vulnerabilidades e sugestões
            de melhorias em tempo real. Proporciona visibilidade completa sobre
            a saúde do projeto através de métricas e indicadores de qualidade.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
