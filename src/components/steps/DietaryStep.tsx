import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, Shield, Wheat, Milk, X } from 'lucide-react';
import { StepContainer } from '../StepContainer';
import { UserData } from '../../types';

interface DietaryStepProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DietaryStep: React.FC<DietaryStepProps> = ({
  userData,
  updateUserData,
  onNext,
  onBack,
}) => {
  const [preferences, setPreferences] = useState<string[]>(userData.dietary_preferences || []);

  const dietaryOptions = [
    {
      id: 'vegan',
      title: 'Vegano',
      description: 'Sin productos de origen animal',
      icon: Leaf,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
    },
    {
      id: 'vegetarian',
      title: 'Vegetariano',
      description: 'Sin carne, puede incluir lácteos y huevos',
      icon: Heart,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-500',
    },
    {
      id: 'keto',
      title: 'Keto',
      description: 'Baja en carbohidratos, alta en grasas',
      icon: Shield,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500',
    },
    {
      id: 'gluten_free',
      title: 'Sin gluten',
      description: 'Libre de trigo, cebada y centeno',
      icon: Wheat,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-500',
    },
    {
      id: 'lactose_free',
      title: 'Sin lácteos',
      description: 'Sin leche ni productos lácteos',
      icon: Milk,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
    },
    {
      id: 'none',
      title: 'Ninguna',
      description: 'Sin restricciones alimentarias',
      icon: X,
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-500',
    },
  ];

  const togglePreference = (preferenceId: string) => {
    if (preferenceId === 'none') {
      setPreferences(['none']);
    } else {
      setPreferences(prev => {
        const filtered = prev.filter(p => p !== 'none');
        if (filtered.includes(preferenceId)) {
          return filtered.filter(p => p !== preferenceId);
        } else {
          return [...filtered, preferenceId];
        }
      });
    }
  };

  const handleSubmit = () => {
    updateUserData({ dietary_preferences: preferences });
    onNext();
  };

  return (
    <StepContainer
      title="¿Tienes alguna preferencia o restricción?"
      subtitle="Puedes seleccionar múltiples opciones o ninguna"
      onBack={onBack}
    >
      <div className="space-y-6">
        <div className="grid gap-4">
          {dietaryOptions.map((option, index) => {
            const Icon = option.icon;
            const isSelected = preferences.includes(option.id);
            
            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => togglePreference(option.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? `${option.borderColor} ${option.bgColor}`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${option.bgColor}`}>
                    <Icon className={`w-6 h-6 ${option.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                  {isSelected && (
                    <div className={`w-6 h-6 rounded-full ${option.color.replace('text-', 'bg-')} flex items-center justify-center`}>
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl"
        >
          Continuar
        </motion.button>
      </div>
    </StepContainer>
  );
};
