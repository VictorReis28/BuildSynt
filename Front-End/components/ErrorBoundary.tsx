import React from 'react';
import { motion } from 'framer-motion';
import IconComponent from './IconComponent';

interface ErrorFallbackProps {
  error?: Error;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-slate-800 rounded-xl p-8 border border-slate-700 text-center"
      >
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <IconComponent name="bug" size={32} className="text-red-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">
          Oops! Algo deu errado
        </h1>
        
        <p className="text-slate-400 mb-6">
          Ocorreu um erro inesperado. Nossa equipe foi notificada e está trabalhando para resolver o problema.
        </p>
        
        {error && (
          <details className="mb-6 text-left">
            <summary className="text-slate-300 cursor-pointer hover:text-white transition-colors">
              Detalhes técnicos
            </summary>
            <pre className="mt-2 p-3 bg-slate-900 rounded text-xs text-red-400 overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
        
        <motion.button
          onClick={handleReload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <IconComponent name="arrow-right" size={20} />
          Recarregar Página
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ErrorFallback;