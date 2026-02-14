import { ChefHat, Search, Loader2 } from "lucide-react";
import { RecipeCard } from "@/components/RecipeCard";
import type { RecipeResult } from "@/types";

interface RecipeResultsProps {
  results: RecipeResult[];
  hasSearched: boolean;
  isLoading: boolean;
}

export function RecipeResults({
  results,
  hasSearched,
  isLoading,
}: RecipeResultsProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-3 text-sm">Finding recipes...</p>
      </div>
    );
  }

  // Empty state - no search yet
  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-secondary mb-4">
          <ChefHat className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          What's in your kitchen?
        </h2>
        <p className="mt-2 text-muted-foreground max-w-sm text-pretty">
          Add the ingredients you have on hand and we'll find the Pakistani and
          Indian recipes you can cook right now.
        </p>
      </div>
    );
  }

  // No results state
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-secondary mb-4">
          <Search className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          No matches found
        </h2>
        <p className="mt-2 text-muted-foreground max-w-sm text-pretty">
          Try adding common ingredients like chicken, onions, tomatoes, or garlic
          to find more recipes.
        </p>
      </div>
    );
  }

  // Results state
  const readyToCook = results.filter((r) => r.matchScore === 1);
  const almostThere = results.filter((r) => r.matchScore < 1);

  const perfectCount = readyToCook.length;
  const totalCount = results.length;

  return (
    <div className="space-y-8">
      {/* Divider with count */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="flex-1 h-px bg-border" />
        <span>
          {totalCount} recipe{totalCount !== 1 ? "s" : ""} found
          {perfectCount > 0 &&
            ` · ${perfectCount} perfect match${perfectCount !== 1 ? "es" : ""}`}
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Ready to Cook section */}
      {readyToCook.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-accent text-accent-foreground text-xs font-bold">
              {readyToCook.length}
            </span>
            <h2 className="font-heading text-lg font-bold text-accent uppercase tracking-wide">
              Ready to Cook
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {readyToCook.map((recipe) => (
              <RecipeCard key={recipe.name} recipe={recipe} />
            ))}
          </div>
        </section>
      )}

      {/* Almost There section */}
      {almostThere.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {almostThere.length}
            </span>
            <h2 className="font-heading text-lg font-bold text-primary uppercase tracking-wide">
              Almost There
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {almostThere.map((recipe) => (
              <RecipeCard key={recipe.name} recipe={recipe} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
