import { motion } from 'framer-motion';
import React from 'react';

import IconComponent from './IconComponent';

interface ErrorFallbackProps {
  error?: Error;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-900 px-4'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-8 text-center'
      >
        <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20'>
          <IconComponent name='bug' size={32} className='text-red-400' />
        </div>

        <h1 className='mb-4 text-2xl font-bold text-white'>
          Oops! Algo deu errado
        </h1>

        <p className='mb-6 text-slate-400'>
          Ocorreu um erro inesperado. Nossa equipe foi notificada e está
          trabalhando para resolver o problema.
        </p>

        {error && (
          <details className='mb-6 text-left'>
            <summary className='cursor-pointer text-slate-300 transition-colors hover:text-white'>
              Detalhes técnicos
            </summary>
            <pre className='mt-2 overflow-auto rounded bg-slate-900 p-3 text-xs text-red-400'>
              {error.message}
            </pre>
          </details>
        )}

        <motion.button
          onClick={handleReload}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:from-blue-600 hover:to-purple-700'
        >
          <IconComponent name='arrow-right' size={20} />
          Recarregar Página
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ErrorFallback;
