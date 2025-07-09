import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Armchair, User, Users, Flame } from 'lucide-react';
import { StepContainer } from '../StepContainer';
import { UserData } from '../../types';

interface ActivityStepProps {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ActivityStep: React.FC<ActivityStepProps> = ({
  userData,
  updateUserData,
  onNext,
  onBack,
}) => {
  const [activityLevel, setActivityLevel] = useState(userData.activity_level || null);

  const activities = [
    {
      id: 'sedentary' as const,
      title: 'Sedentario',
      description: 'Trabajo de oficina, poco o nada de ejercicio',
      icon: Armchair,
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-500',
    },
    {
      id: 'light' as const,
      title: 'Ligera',
      description: 'Ejercicio ligero 1-3 días por semana',
      icon: User,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
    },
    {
      id: 'moderate' as const,
      title: 'Moderada',
      description: 'Ejercicio moderado 3-5 días por semana',
      icon: Users,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-500',
    },
    {
      id: 'high' as const,
      title: 'Alta',
      description: 'Ejercicio intenso 6-7 días por semana',
      icon: Flame,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
    },
  ];

  const handleSubmit = () => {
    if (activityLevel) {
      updateUserData({ activity_level: activityLevel });
      onNext();
    }
  };

  return (
    <StepContainer
      title="¿Qué tan activo eres?"
      subtitle="Tu nivel de actividad física nos ayuda a calcular tus necesidades calóricas"
      onBack={onBack}
    >
      <div className="space-y-6">
        <div className="grid gap-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            const isSelected = activityLevel === activity.id;
            
            return (
              <motion.button
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActivityLevel(activity.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? `${activity.borderColor} ${activity.bgColor}`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${activity.bgColor}`}>
                    <Icon className={`w-6 h-6 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: activityLevel ? 1.02 : 1 }}
          whileTap={{ scale: activityLevel ? 0.98 : 1 }}
          onClick={handleSubmit}
          disabled={!activityLevel}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            activityLevel
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
