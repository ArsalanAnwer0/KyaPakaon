import { useState, useEffect } from "react";
import { UtensilsCrossed } from "lucide-react";
import { IngredientInput } from "@/components/IngredientInput";
import { RecipeResults } from "@/components/RecipeResults";
import type { RecipeResult } from "@/types";

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [results, setResults] = useState<RecipeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Live search with debounce
  useEffect(() => {
    if (ingredients.length === 0) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const query = ingredients.join(",");
        const res = await fetch(
          `/api/recipes/search?ingredients=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setResults(data);
        setHasSearched(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [ingredients]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary">
            <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-xl sm:text-2xl font-bold text-foreground leading-tight">
              KyaPakaon
            </h1>
            <p className="text-xs text-muted-foreground">
              Pakistani & Indian Recipe Finder
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Hero */}
        <section className="text-center space-y-2">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Cook with what you have
          </h2>
          <p className="text-muted-foreground text-pretty max-w-lg mx-auto">
            Enter the ingredients sitting in your kitchen and discover authentic
            desi recipes you can make right now.
          </p>
        </section>

        {/* Ingredient Input */}
        <IngredientInput
          ingredients={ingredients}
          onIngredientsChange={setIngredients}
        />

        {/* Results */}
        <RecipeResults
          results={results}
          hasSearched={hasSearched}
          isLoading={loading}
        />
      </main>

      {/* Footer */}
      <footer className="border-t mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-muted-foreground">
          Built with Next.js &middot; A learning project for Docker, AWS & CI/CD
        </div>
      </footer>
    </div>
  );
}

export default App;
