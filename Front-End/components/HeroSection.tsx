import React from "react";
import { motion } from "framer-motion";
import IconComponent from "./IconComponent";

const HeroSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="home"
      className="h-screen flex items-center justify-center px-4 pt-20 pb-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <IconComponent name="bug" size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            BuildSynt
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-8">
            Sistema Inteligente de Análise e Gerenciamento de Erros
          </p>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            Ferramenta inovadora que identifica e corrige problemas em projetos
            web de forma automatizada, proporcionando código mais limpo e
            aplicações mais estáveis através de análise inteligente.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("analyzer")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2 justify-center"
          >
            <IconComponent name="search" size={20} />
            Testar Analisador
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="border border-slate-600 hover:border-blue-500 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2 justify-center"
          >
            <IconComponent name="info" size={20} />
            Saiba Mais
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
