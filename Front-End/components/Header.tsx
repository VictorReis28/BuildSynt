import React from "react";
import { motion } from "framer-motion";
import IconComponent from "./IconComponent";
import UserProfileDropdown from "./UserProfileDropdown";
import { useAuth } from "../hooks/useAuth";

interface HeaderProps {
  onMenuClick: () => void;
  onOpenSettings?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onOpenSettings }) => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-700 z-30"
    >
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onMenuClick}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <IconComponent name="menu" size={24} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <IconComponent name="bug" size={18} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">BuildSynt</h1>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <UserProfileDropdown
                user={user}
                onLogout={logout}
                onOpenSettings={onOpenSettings}
              />
            ) : (
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-sm text-slate-300 hover:text-white border border-slate-600 hover:border-blue-500 rounded-lg transition-colors"
                >
                  Entrar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all"
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
