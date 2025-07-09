import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, UserCheck } from 'lucide-react';
import { StepContainer } from '../StepContainer';
import { UserData } from '../../types';

interface AgeGenderStepProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const AgeGenderStep: React.FC<AgeGenderStepProps> = ({
  userData,
  updateUserData,
  onNext,
  onBack,
}) => {
  const [age, setAge] = useState(userData.age?.toString() || '');
  const [sex, setSex] = useState(userData.sex || null);

  const handleSubmit = () => {
    if (age && sex) {
      updateUserData({ age: parseInt(age), sex });
      onNext();
    }
  };

  const isValid = age && sex && parseInt(age) > 0 && parseInt(age) < 120;

  return (
    <StepContainer
      title="¿Cuál es tu edad y sexo?"
      subtitle="Necesitamos estos datos para personalizar tu plan nutricional"
      onBack={onBack}
    >
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Edad
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Ejemplo: 25"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-lg"
            min="1"
            max="120"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Sexo
          </label>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSex('male')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                sex === 'male'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <User className="w-8 h-8 mx-auto mb-2" />
              <span className="font-medium">Masculino</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSex('female')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                sex === 'female'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <UserCheck className="w-8 h-8 mx-auto mb-2" />
              <span className="font-medium">Femenino</span>
            </motion.button>
          </div>
        </div>

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
          Continuar
        </motion.button>
      </div>
    </StepContainer>
  );
};
