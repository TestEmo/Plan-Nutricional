import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, Target } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-full mb-6">
            <Leaf className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          🌿 Crea tu plan nutricional ideal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-xl text-gray-600 mb-12 leading-relaxed"
        >
          Personalizado según tus objetivos, hábitos y estilo de vida
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <Heart className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Personalizado</h3>
            <p className="text-sm text-gray-600">Adaptado a tu estilo de vida único</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <Target className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Basado en Ciencia</h3>
            <p className="text-sm text-gray-600">Recomendaciones nutricionales validadas</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <Leaf className="w-8 h-8 text-emerald-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Fácil de Seguir</h3>
            <p className="text-sm text-gray-600">Plan simple y práctico para tu día a día</p>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Comenzar
        </motion.button>
      </motion.div>
    </div>
  );
};
