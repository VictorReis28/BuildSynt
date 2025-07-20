import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconComponent from './IconComponent';
import AuthSection from './AuthSection';
import { scrollToSection } from '../utils/scrollUtils';
import { useAuth } from '../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, login, register } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Início', icon: 'home' },
    { id: 'about', label: 'Sobre', icon: 'info' },
    { id: 'analyzer', label: 'Analisador', icon: 'search' },
    { id: 'technologies', label: 'Tecnologias', icon: 'code' },
    { id: 'features', label: 'Funcionalidades', icon: 'settings' },
    { id: 'contact', label: 'Contato', icon: 'user' }
  ];

  const handleItemClick = (sectionId: string) => {
    scrollToSection(sectionId);
    onClose();
  };

  const handleLogin = () => {
    // Mock login with demo credentials
    login('joao.silva@exemplo.com', 'password123');
  };

  const handleRegister = () => {
    // Mock registration with demo data
    register('Novo Usuário', 'novo.usuario@exemplo.com', 'password123');
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-72 bg-slate-900 border-r border-slate-700 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <IconComponent name="bug" size={18} className="text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-white">Menu</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <IconComponent name="x" size={20} />
                </button>
              </div>
              
              <nav className="space-y-2">
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Navegação
                  </h3>
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors group"
                    >
                      <IconComponent 
                        name={item.icon} 
                        size={20} 
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="font-medium">{item.label}</span>
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
                  className="border-t border-slate-700 pt-6 mt-6"
                >
                  <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Conectado</span>
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