import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Carrot, Fish } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const icons = [Apple, Carrot, Fish];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="relative mb-8">
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                delay: index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className={`p-4 rounded-full ${
                index === 0 ? 'bg-red-100' : 
                index === 1 ? 'bg-orange-100' : 'bg-blue-100'
              }`}>
                <Icon className={`w-8 h-8 ${
                  index === 0 ? 'text-red-500' : 
                  index === 1 ? 'text-orange-500' : 'text-blue-500'
                }`} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          Estamos preparando tu plan personalizado...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-gray-600 mb-8"
        >
          🍎🥦 Analizando tus datos y creando recomendaciones únicas para ti
        </motion.p>

        <motion.div
          className="flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-emerald-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
