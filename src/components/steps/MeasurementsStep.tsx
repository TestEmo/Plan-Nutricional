import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Ruler } from 'lucide-react';
import { StepContainer } from '../StepContainer';
import { UserData } from '../../types';

interface MeasurementsStepProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const MeasurementsStep: React.FC<MeasurementsStepProps> = ({
  userData,
  updateUserData,
  onNext,
  onBack,
}) => {
  const [weight, setWeight] = useState(userData.weight?.toString() || '');
  const [height, setHeight] = useState(userData.height?.toString() || '');

  const handleSubmit = () => {
    if (weight && height) {
      updateUserData({ 
        weight: parseFloat(weight), 
        height: parseFloat(height) 
      });
      onNext();
    }
  };

  const isValid = weight && height && 
    parseFloat(weight) > 0 && parseFloat(weight) < 500 &&
    parseFloat(height) > 0 && parseFloat(height) < 300;

  const calculateBMI = () => {
    if (weight && height) {
      const bmi = parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2);
      return bmi.toFixed(1);
    }
    return null;
  };

  const bmi = calculateBMI();

  return (
    <StepContainer
      title="¿Cuál es tu peso y estatura?"
      subtitle="Estos datos nos ayudan a personalizar tu plan nutricional"
      onBack={onBack}
    >
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <div className="flex items-center space-x-2">
                <Scale className="w-4 h-4" />
                <span>Peso (kg)</span>
              </div>
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ejemplo: 70"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg"
              step="0.1"
              min="1"
              max="500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <div className="flex items-center space-x-2">
                <Ruler className="w-4 h-4" />
                <span>Estatura (cm)</span>
              </div>
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Ejemplo: 175"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg"
              min="1"
              max="300"
            />
          </div>
        </div>

        {bmi && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 p-4 rounded-xl border border-blue-200"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-blue-700 font-medium">Tu IMC es:</span>
              <span className="text-2xl font-bold text-blue-800">{bmi}</span>
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: isValid ? 1.02 : 1 }}
          whileTap={{ scale: isValid ? 0.98 : 1 }}
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            isValid
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Generar mi plan
        </motion.button>
      </div>
    </StepContainer>
  );
};
