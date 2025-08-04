import React from "react";
import { motion } from "framer-motion";
import IconComponent from "./IconComponent";

interface AuthSectionProps {
  onLogin: () => void;
  onRegister: () => void;
  onClose?: () => void;
}

const AuthSection: React.FC<AuthSectionProps> = ({ onLogin, onRegister, onClose }) => {
  const handleLogin = () => {
    onLogin();
    onClose?.();
  };

  const handleRegister = () => {
    onRegister();
    onClose?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-slate-700 pt-6 mt-6"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
          Autenticação
        </h3>
      </div>

      <div className="space-y-3">
        <motion.button
          onClick={handleLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 group font-medium"
        >
          <IconComponent
            name="log-in"
            size={18}
            className="group-hover:scale-110 transition-transform"
          />
          <span>Entrar</span>
        </motion.button>

        <motion.button
          onClick={handleRegister}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white rounded-lg transition-all duration-300 group font-medium"
        >
          <IconComponent
            name="user-plus"
            size={18}
            className="group-hover:scale-110 transition-transform"
          />
          <span>Registrar</span>
        </motion.button>
      </div>

      <div className="mt-4 p-3 bg-slate-800 rounded-lg">
        <div className="flex items-start gap-2">
          <IconComponent name="info" size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-400">
            Faça login para acessar funcionalidades avançadas de análise
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AuthSection;
