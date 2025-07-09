import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingDown, TrendingUp, Heart, Zap } from 'lucide-react';
import { StepContainer } from '../StepContainer';
import { UserData } from '../../types';

interface GoalStepProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const GoalStep: React.FC<GoalStepProps> = ({
  userData,
  updateUserData,
  onNext,
  onBack,
}) => {
  const [goal, setGoal] = useState(userData.goal || null);

  const goals = [
    {
      id: 'lose_weight' as const,
      title: 'Perder peso',
      description: 'Reducir grasa corporal de forma saludable',
      icon: TrendingDown,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
    },
    {
      id: 'gain_muscle' as const,
      title: 'Ganar masa muscular',
      description: 'Aumentar músculo y fuerza',
      icon: TrendingUp,
      bgColor: 'bg-blue-50',
      color: 'text-blue-500',
      borderColor: 'border-blue-500',
    },
    {
      id: 'maintain_health' as const,
      title: 'Mantenerte saludable',
      description: 'Nutrición equilibrada para bienestar general',
      icon: Heart,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-500',
    },
    {
      id: 'improve_performance' as const,
      title: 'Mejorar rendimiento',
      description: 'Optimizar energía y performance deportivo',
      icon: Zap,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500',
    },
  ];

  const handleSubmit = () => {
    if (goal) {
      updateUserData({ goal });
      onNext();
    }
  };

  return (
    <StepContainer
      title="¿Qué deseas lograr?"
      subtitle="Tu objetivo nos ayudará a crear el plan perfecto para ti"
      onBack={onBack}
    >
      <div className="space-y-6">
        <div className="grid gap-4">
          {goals.map((goalOption, index) => {
            const Icon = goalOption.icon;
            const isSelected = goal === goalOption.id;
            
            return (
              <motion.button
                key={goalOption.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setGoal(goalOption.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? `${goalOption.borderColor} ${goalOption.bgColor}`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${goalOption.bgColor}`}>
                    <Icon className={`w-6 h-6 ${goalOption.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {goalOption.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {goalOption.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: goal ? 1.02 : 1 }}
          whileTap={{ scale: goal ? 0.98 : 1 }}
          onClick={handleSubmit}
          disabled={!goal}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            goal
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
