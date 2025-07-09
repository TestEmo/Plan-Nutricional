import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, MessageCircle, RotateCcw, PieChart } from 'lucide-react';

interface ResultsScreenProps {
  onRestart: () => void;
  results?: any;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ onRestart, results }) => {
  // Extract nutrition plan from webhook response
  // The webhook returns an array, so we need to get the first element
  const webhookData = Array.isArray(results) ? results[0] : results;
  const nutritionPlan = webhookData?.nutritionPlan || results?.nutritionPlan;
  
  // Fallback to mock data if no real data is available
  const planData = nutritionPlan || {
    dailyCalories: 2200,
    macronutrients: {
      carbs: 50,
      protein: 25,
      fats: 25,
    },
    recommendations: [
      "Consume 5-6 comidas pequeñas al día para mantener el metabolismo activo",
      "Incluye proteína en cada comida para preservar la masa muscular",
      "Mantente hidratado bebiendo al menos 8 vasos de agua al día",
      "Incorpora verduras de hoja verde en tu dieta diaria",
    ],
    mealsPerDay: 5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Tu plan nutricional está listo!
          </h2>
          <p className="text-lg text-gray-600">
            Basado en tus datos personales y objetivos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Tu Plan Nutricional
            </h3>
            
            <div className="space-y-6">
              <div className="text-center p-6 bg-emerald-50 rounded-2xl">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {planData.dailyCalories}
                </div>
                <div className="text-sm text-gray-600">
                  Calorías diarias recomendadas
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Distribución de Macronutrientes
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Carbohidratos</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-500 rounded-full" 
                          style={{ width: `${planData.macronutrients.carbs}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {planData.macronutrients.carbs}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Proteínas</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-emerald-500 rounded-full" 
                          style={{ width: `${planData.macronutrients.protein}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {planData.macronutrients.protein}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Grasas</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-orange-500 rounded-full" 
                          style={{ width: `${planData.macronutrients.fats || planData.macronutrients.fat}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {planData.macronutrients.fats || planData.macronutrients.fat}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {planData.mealsPerDay}
                </div>
                <div className="text-sm text-gray-600">
                  Comidas recomendadas por día
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Recomendaciones Clave
            </h3>
            
            <div className="space-y-4">
              {planData.recommendations.map((recommendation: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {recommendation}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            ¿Qué sigue?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 border-2 border-emerald-200 hover:border-emerald-400 rounded-xl transition-colors text-center"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <PieChart className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Ver menú de ejemplo</h4>
              <p className="text-sm text-gray-600">Descarga ejemplos de comidas</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 border-2 border-blue-200 hover:border-blue-400 rounded-xl transition-colors text-center"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Recibir por correo</h4>
              <p className="text-sm text-gray-600">Te enviamos tu plan completo</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-6 border-2 border-green-200 hover:border-green-400 rounded-xl transition-colors text-center"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Enviar a WhatsApp</h4>
              <p className="text-sm text-gray-600">Recibe recordatorios diarios</p>
            </motion.button>
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRestart}
              className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Crear nuevo plan</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
