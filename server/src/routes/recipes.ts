import { Router, Request, Response } from "express";
import Recipe from "../models/Recipe";

const router = Router();

router.get("/search", async (req: Request, res: Response) => {
  const { ingredients } = req.query;

  if (!ingredients || typeof ingredients !== "string") {
    res.json([]);
    return;
  }

  const userIngredients = ingredients
    .split(",")
    .map((i) => i.trim().toLowerCase())
    .filter(Boolean);

  if (userIngredients.length === 0) {
    res.json([]);
    return;
  }

  const recipes = await Recipe.find();

  const results = recipes
    .map((recipe) => {
      const recipeIngredients = recipe.ingredients.map((i) => i.toLowerCase());
      const matched = recipeIngredients.filter((i) =>
        userIngredients.some((ui) => i.includes(ui) || ui.includes(i))
      );
      const missing = recipeIngredients.filter(
        (i) => !userIngredients.some((ui) => i.includes(ui) || ui.includes(i))
      );

      return {
        name: recipe.name,
        description: recipe.description,
        cuisine: recipe.cuisine,
        category: recipe.category,
        cookingTime: recipe.cookingTime,
        servings: recipe.servings,
        spiceLevel: recipe.spiceLevel,
        matchedIngredients: matched,
        missingIngredients: missing,
        totalIngredients: recipeIngredients.length,
        matchScore: matched.length / recipeIngredients.length,
      };
    })
    .filter((r) => r.matchedIngredients.length > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  res.json(results);
});

export default router;
