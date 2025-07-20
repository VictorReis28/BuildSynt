import React from 'react';
import { motion } from 'framer-motion';
import IconComponent from './IconComponent';
import { contacts } from '../data/content';

const ContactSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="contact"
      className="py-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Entre em Contato
        </h2>
        <p className="text-slate-400 text-lg mb-12">
          Conecte-se comigo para discutir este projeto ou futuras colaborações
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.name}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 text-white px-6 py-3 rounded-lg transition-all duration-300 group"
            >
              <IconComponent name={contact.icon} size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">{contact.name}</span>
              <IconComponent name="external-link" size={16} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;