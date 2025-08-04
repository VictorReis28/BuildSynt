import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { useAuth } from '../hooks/useAuth';
import { scrollToSection } from '../utils/scrollUtils';

import AuthSection from './AuthSection';
import IconComponent from './IconComponent';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, login, register } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Início', icon: 'home' },
    { id: 'analyzer', label: 'Analisador', icon: 'search' },
    { id: 'about', label: 'Sobre', icon: 'info' },
    { id: 'technologies', label: 'Tecnologias', icon: 'code' },
    { id: 'features', label: 'Funcionalidades', icon: 'settings' },
    { id: 'contact', label: 'Contato', icon: 'user' },
  ];

  const handleItemClick = (sectionId: string) => {
    scrollToSection(sectionId);
    onClose();
  };

  const handleLogin = () => {
    // Mock login for testing
    login('joao.silva@buildsynt.dev', 'password123');
  };

  const handleRegister = () => {
    // Mock registration for testing
    register('Novo Usuário', 'novo.usuario@buildsynt.dev', 'password123');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden'
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='fixed left-0 top-0 z-50 h-full w-72 overflow-y-auto border-r border-slate-700 bg-slate-900'
          >
            <div className='p-6'>
              <div className='mb-8 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600'>
                    <IconComponent
                      name='bug'
                      size={18}
                      className='text-white'
                    />
                  </div>
                  <h2 className='text-lg font-bold text-white'>Menu</h2>
                </div>
                <button
                  onClick={onClose}
                  className='rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white'
                  aria-label='Fechar menu'
                >
                  <IconComponent name='x' size={20} />
                </button>
              </div>

              <nav className='space-y-2'>
                <div className='mb-6'>
                  <h3 className='mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400'>
                    Navegação
                  </h3>
                  {menuItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className='group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white'
                    >
                      <IconComponent
                        name={item.icon}
                        size={20}
                        className='transition-transform group-hover:scale-110'
                      />
                      <span className='font-medium'>{item.label}</span>
                    </button>
                  ))}
                </div>
              </nav>

              {/* Authentication Section */}
              {!isAuthenticated && (
                <AuthSection
                  onLogin={handleLogin}
                  onRegister={handleRegister}
                  onClose={onClose}
                />
              )}

              {/* User Status for Authenticated Users */}
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className='mt-6 border-t border-slate-700 pt-6'
                >
                  <div className='flex items-center gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-3'>
                    <div className='h-2 w-2 animate-pulse rounded-full bg-green-500'></div>
                    <span className='text-sm font-medium text-green-400'>
                      Conectado
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
