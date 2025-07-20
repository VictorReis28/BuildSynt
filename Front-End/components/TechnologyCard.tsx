import React from "react";
import { motion } from "framer-motion";
import IconComponent from "./IconComponent";
import { Technology } from "../types";

interface TechnologyCardProps {
  technology: Technology;
  index: number;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  technology,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-colors duration-200 group"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <IconComponent
            name={technology.icon}
            size={24}
            className="text-white"
          />
        </div>
        <h3 className="text-xl font-bold text-white">{technology.name}</h3>
      </div>
      <p className="text-slate-400 leading-relaxed">{technology.description}</p>
    </motion.div>
  );
};

export default TechnologyCard;
