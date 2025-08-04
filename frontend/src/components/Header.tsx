import { motion } from 'framer-motion';
import React from 'react';

import { useAuth } from '../hooks/useAuth';

import IconComponent from './IconComponent';
import UserProfileDropdown from './UserProfileDropdown';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className='fixed left-0 right-0 top-0 z-30 border-b border-slate-700 bg-slate-900/80 backdrop-blur-md'
    >
      <div className='px-4 py-4'>
        <div className='flex items-center justify-between'>
          <button
            onClick={onMenuClick}
            className='rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white'
            aria-label='Open menu'
          >
            <IconComponent name='menu' size={24} />
          </button>

          <div className='flex items-center gap-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600'>
              <IconComponent name='bug' size={18} className='text-white' />
            </div>
            <h1 className='text-lg font-bold text-white'>BuildSynt</h1>
          </div>

          <div className='flex items-center gap-4'>
            {isAuthenticated && user ? (
              <UserProfileDropdown user={user} onLogout={logout} />
            ) : (
              <div className='flex items-center gap-2'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-blue-500 hover:text-white'
                >
                  Entrar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1.5 text-sm text-white transition-all hover:from-blue-600 hover:to-purple-700'
                >
                  Registrar
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
