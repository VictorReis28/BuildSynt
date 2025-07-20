import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconComponent from './IconComponent';
import { User } from '../types';
import { useDropdown } from '../hooks/useDropdown';

interface UserProfileDropdownProps {
  user: User;
  onLogout: () => void;
  onOpenSettings?: () => void;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ user, onLogout, onOpenSettings }) => {
  const { isOpen, toggleDropdown, closeDropdown, dropdownRef } = useDropdown();

  const menuItems = [
    { 
      id: 'profile', 
      label: 'Perfil do Usuário', 
      icon: 'user',
      action: () => {
        if (onOpenSettings) {
          onOpenSettings();
        }
        closeDropdown();
      }
    },
    { 
      id: 'settings', 
      label: 'Configurações', 
      icon: 'settings',
      action: () => {
        if (onOpenSettings) {
          onOpenSettings();
        }
        closeDropdown();
      }
    },
    { 
      id: 'preferences', 
      label: 'Preferências', 
      icon: 'sliders',
      action: () => {
        if (onOpenSettings) {
          onOpenSettings();
        }
        closeDropdown();
      }
    },
    { 
      id: 'help', 
      label: 'Ajuda & Suporte', 
      icon: 'help-circle',
      action: () => {
        console.log('Navigate to help');
        closeDropdown();
      }
    }
  ];

  const handleLogout = () => {
    onLogout();
    closeDropdown();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={toggleDropdown}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-800 transition-colors group"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative">
          <img
            src={user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-slate-600 group-hover:border-blue-500 transition-colors"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <IconComponent 
            name="chevron-down" 
            size={16} 
            className="text-slate-400 group-hover:text-white transition-colors"
          />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* User Info Header */}
            <div className="p-4 border-b border-slate-700 bg-slate-750">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{user.name}</p>
                  <p className="text-slate-400 text-sm truncate">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={item.action}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors group"
                >
                  <IconComponent 
                    name={item.icon} 
                    size={18} 
                    className="text-slate-400 group-hover:text-blue-400 transition-colors"
                  />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Logout Section */}
            <div className="border-t border-slate-700 p-2">
              <motion.button
                onClick={handleLogout}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors group"
              >
                <IconComponent 
                  name="log-out" 
                  size={18} 
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-medium">Sair</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileDropdown;