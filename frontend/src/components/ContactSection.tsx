import { motion } from 'framer-motion';
import React from 'react';

import { contacts } from '../data/content';

import IconComponent from './IconComponent';

const ContactSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id='contact'
      className='px-4 py-20'
    >
      <div className='mx-auto max-w-4xl text-center'>
        <h2 className='mb-4 text-3xl font-bold text-white'>Entre em Contato</h2>
        <p className='mb-12 text-lg text-slate-400'>
          Conecte-se comigo para discutir este projeto ou futuras colaborações
        </p>

        <div className='flex flex-wrap justify-center gap-6'>
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.name}
              href={contact.url}
              target='_blank'
              rel='noopener noreferrer'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='group flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-6 py-3 text-white transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-700'
            >
              <IconComponent
                name={contact.icon}
                size={20}
                className='transition-transform group-hover:scale-110'
              />
              <span className='font-medium'>{contact.name}</span>
              <IconComponent
                name='external-link'
                size={16}
                className='text-slate-400 transition-colors group-hover:text-blue-400'
              />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
