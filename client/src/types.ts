export interface RecipeResult {
  name: string;
  description: string;
  cuisine: string;
  category: string;
  cookingTime: number;
  servings: number;
  spiceLevel: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  totalIngredients: number;
  matchScore: number;
}
