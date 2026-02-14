import mongoose, { Schema, Document } from "mongoose";

export interface IRecipe extends Document {
  name: string;
  description: string;
  ingredients: string[];
  cuisine: string;
  category: string;
  cookingTime: number;
  servings: number;
  spiceLevel: number;
}

const RecipeSchema = new Schema<IRecipe>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  cuisine: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Main Course", "Side Dish", "Appetizer", "Dessert", "Bread", "Breakfast", "Street Food"],
  },
  cookingTime: { type: Number, required: true },
  servings: { type: Number, required: true },
  spiceLevel: { type: Number, required: true, min: 1, max: 3 },
});

export default mongoose.model<IRecipe>("Recipe", RecipeSchema);
