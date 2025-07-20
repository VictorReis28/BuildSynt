import React from "react";
import { motion } from "framer-motion";
import IconComponent from "./IconComponent";

const AboutSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id="about"
      className="py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sobre o Projeto
          </h2>
          <p className="text-slate-400 text-lg">
            Análise de código e Gestão de erros
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800 rounded-xl p-8 border border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <IconComponent name="info" size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Objetivo</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Desenvolver uma solução inteligente e automatizada para
              identificação, análise e correção de erros em projetos web,
              reduzindo significativamente o tempo de debugging e melhorando a
              qualidade do código através de tecnologias modernas e análise
              preditiva.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-800 rounded-xl p-8 border border-slate-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <IconComponent name="bug" size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Problema Identificado
              </h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Desenvolvedores frequentemente enfrentam dificuldades para
              identificar, atualizar e corrigir erros específicos em seus
              projetos. O sistema propõe uma solução automatizada para a análise
              e sugestão de correções, melhorando a qualidade do código.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-slate-800 rounded-xl p-8 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
              <IconComponent
                name="arrow-right"
                size={20}
                className="text-white"
              />
            </div>
            <h3 className="text-xl font-bold text-white">Diferenciais</h3>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Plataforma integrada que oferece análise de código-fonte
            automatizada, detecção inteligente de vulnerabilidades e sugestões
            de melhorias em tempo real. Proporciona visibilidade completa sobre
            a saúde do projeto através de métricas e indicadores de qualidade.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
