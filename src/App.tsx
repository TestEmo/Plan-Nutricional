import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useOnboarding } from './hooks/useOnboarding';
import { submitUserData } from './utils/api';

// Components
import { WelcomeScreen } from './components/WelcomeScreen';
import { ProgressBar } from './components/ProgressBar';
import { AgeGenderStep } from './components/steps/AgeGenderStep';
import { GoalStep } from './components/steps/GoalStep';
import { ActivityStep } from './components/steps/ActivityStep';
import { DietaryStep } from './components/steps/DietaryStep';
import { MeasurementsStep } from './components/steps/MeasurementsStep';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsScreen } from './components/ResultsScreen';

function App() {
  const { currentStep, userData, updateUserData, nextStep, prevStep, resetOnboarding } = useOnboarding();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleStart = () => {
    nextStep(); // Go to step 1 (AgeGenderStep)
  };

  const handleSubmitData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      setTimeout(async () => {
        try {
          const response = await submitUserData(userData);
          console.log('API Response:', response);
          setResults(response);
          nextStep(); // Go to results screen
        } catch (error) {
          console.error('Error submitting data:', error);
          // For demo purposes, show results anyway with mock data
          setResults({
            nutritionPlan: {
              dailyCalories: 1800,
              macronutrients: {
                carbs: 50,
                protein: 25,
                fats: 25
              },
              recommendations: [
                "Realiza 5 comidas pequeñas al día para mantener el metabolismo activo",
                "Incluye fuentes vegetales de proteína en cada comida, como legumbres, tofu y frutos secos",
                "Mantente hidratado con al menos 2 litros de agua al día",
                "Prioriza alimentos vegetales integrales, como cereales integrales, frutas y verduras",
                "Evita alimentos procesados, azúcares refinados y grasas saturadas",
                "Incluye actividad física ligera diaria para complementar la pérdida de peso, como caminar 30 minutos"
              ],
              mealsPerDay: 5
            }
          });
          nextStep();
        } finally {
          setIsLoading(false);
        }
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setResults(null);
    setIsLoading(false);
    resetOnboarding();
  };

  // Loading state
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}
        
        {currentStep >= 1 && currentStep <= 5 && (
          <div key="onboarding" className="min-h-screen">
            <div className="max-w-2xl mx-auto pt-8 px-4">
              <ProgressBar currentStep={currentStep} totalSteps={5} />
            </div>
            
            {currentStep === 1 && (
              <AgeGenderStep
                userData={userData}
                updateUserData={updateUserData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            
            {currentStep === 2 && (
              <GoalStep
                userData={userData}
                updateUserData={updateUserData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            
            {currentStep === 3 && (
              <ActivityStep
                userData={userData}
                updateUserData={updateUserData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            
            {currentStep === 4 && (
              <DietaryStep
                userData={userData}
                updateUserData={updateUserData}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            
            {currentStep === 5 && (
              <MeasurementsStep
                userData={userData}
                updateUserData={updateUserData}
                onNext={handleSubmitData}
                onBack={prevStep}
              />
            )}
          </div>
        )}
        
        {currentStep === 6 && (
          <ResultsScreen key="results" onRestart={handleRestart} results={results} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
