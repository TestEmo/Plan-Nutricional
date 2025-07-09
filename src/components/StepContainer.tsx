import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface StepContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
}

export const StepContainer: React.FC<StepContainerProps> = ({
  title,
  subtitle,
  children,
  onBack,
  showBack = true,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {showBack && onBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Atrás
          </motion.button>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{title}</h2>
            {subtitle && (
              <p className="text-lg text-gray-600">{subtitle}</p>
            )}
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  );
};
