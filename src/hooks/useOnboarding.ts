import { useState } from 'react';
import { UserData } from '../types';

export const useOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    age: null,
    sex: null,
    goal: null,
    activity_level: null,
    dietary_preferences: [],
    weight: null,
    height: null,
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const resetOnboarding = () => {
    setCurrentStep(0);
    setUserData({
      age: null,
      sex: null,
      goal: null,
      activity_level: null,
      dietary_preferences: [],
      weight: null,
      height: null,
    });
  };

  return {
    currentStep,
    userData,
    updateUserData,
    nextStep,
    prevStep,
    resetOnboarding,
  };
};
