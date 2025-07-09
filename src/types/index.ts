export interface UserData {
  age: number | null;
  sex: 'male' | 'female' | null;
  goal: 'lose_weight' | 'gain_muscle' | 'maintain_health' | 'improve_performance' | null;
  activity_level: 'sedentary' | 'light' | 'moderate' | 'high' | null;
  dietary_preferences: string[];
  weight: number | null;
  height: number | null;
}

export interface NutritionPlan {
  dailyCalories: number;
  macronutrients: {
    carbs: number;
    protein: number;
    fats: number;
  };
  recommendations: string[];
  mealsPerDay: number;
}

export interface WebhookResponse {
  headers: Record<string, string>;
  params: Record<string, any>;
  query: Record<string, any>;
  body: UserData;
  webhookUrl: string;
  executionMode: string;
  nutritionPlan?: NutritionPlan;
}

export interface ApiResponse {
  nutritionPlan: NutritionPlan;
}
