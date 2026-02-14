import { useState, useRef, useCallback } from "react";
import { Search, X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ALL_SUGGESTIONS = [
  "almonds",
  "basmati rice",
  "bay leaves",
  "beef shank",
  "black lentils",
  "bone marrow",
  "broth",
  "butter",
  "cardamom",
  "cashews",
  "cauliflower",
  "chana dal",
  "chhena",
  "chicken",
  "chickpeas",
  "chili powder",
  "cinnamon",
  "cloves",
  "coriander",
  "coriander seeds",
  "cream",
  "cumin",
  "egg",
  "eggplant",
  "fennel powder",
  "fenugreek seeds",
  "flour",
  "fried onions",
  "garam masala",
  "garlic",
  "ghee",
  "ginger",
  "ginger-garlic paste",
  "goat trotters",
  "gram flour",
  "green chilies",
  "ground beef",
  "ground meat",
  "kashmiri chili",
  "kasuri methi",
  "khoya",
  "kidney beans",
  "lamb",
  "lemon",
  "masoor dal",
  "meat",
  "milk",
  "milk powder",
  "mint",
  "mustard greens",
  "mutton",
  "okra",
  "onions",
  "paneer",
  "peas",
  "pistachios",
  "pomegranate seeds",
  "potatoes",
  "rice",
  "rose water",
  "saffron",
  "semolina",
  "spinach",
  "sugar",
  "tamarind",
  "tomato puree",
  "tomatoes",
  "turmeric",
  "urad dal",
  "wheat",
  "whole wheat flour",
  "yeast",
  "yogurt",
];

const POPULAR_INGREDIENTS = [
  "chicken",
  "tomatoes",
  "onions",
  "garlic",
  "ginger",
  "rice",
  "yogurt",
  "potatoes",
];

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

export function IngredientInput({
  ingredients,
  onIngredientsChange,
}: IngredientInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const filteredSuggestions = inputValue.trim()
    ? ALL_SUGGESTIONS.filter(
        (s) =>
          s.includes(inputValue.toLowerCase()) &&
          !ingredients.includes(s)
      ).slice(0, 6)
    : [];

  const addIngredient = useCallback(
    (value: string) => {
      const trimmed = value.trim().toLowerCase();
      if (trimmed && !ingredients.includes(trimmed)) {
        onIngredientsChange([...ingredients, trimmed]);
      }
      setInputValue("");
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    },
    [ingredients, onIngredientsChange]
  );

  const removeIngredient = useCallback(
    (ingredient: string) => {
      onIngredientsChange(ingredients.filter((i) => i !== ingredient));
    },
    [ingredients, onIngredientsChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        highlightedIndex >= 0 &&
        highlightedIndex < filteredSuggestions.length
      ) {
        addIngredient(filteredSuggestions[highlightedIndex]);
      } else if (inputValue.trim()) {
        addIngredient(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && ingredients.length > 0) {
      removeIngredient(ingredients[ingredients.length - 1]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }, 200);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm space-y-3">
      {/* Input area */}
      <div className="relative">
        <div
          onClick={focusInput}
          className={cn(
            "flex flex-wrap items-center gap-2 rounded-xl border-2 bg-card px-3 min-h-[56px] cursor-text transition-colors",
            "focus-within:border-primary"
          )}
        >
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          {ingredients.map((ing) => (
            <Badge
              key={ing}
              className="bg-primary/10 text-primary border-primary/20 border gap-1 py-1 px-2.5"
            >
              {ing}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeIngredient(ing);
                }}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${ing}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setHighlightedIndex(-1);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={
              ingredients.length > 0
                ? "Add more..."
                : "Type an ingredient... e.g. chicken, tomatoes, onions"
            }
            className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground py-2"
            aria-label="Ingredient input"
          />
          {inputValue.trim() && (
            <button
              type="button"
              onClick={() => addIngredient(inputValue)}
              className="text-xs font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
            >
              Add
            </button>
          )}
        </div>

        {/* Autocomplete dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-card border rounded-xl shadow-lg overflow-hidden">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => addIngredient(suggestion)}
                className={cn(
                  "flex items-center gap-2 w-full px-3 py-2.5 text-sm text-left transition-colors",
                  index === highlightedIndex
                    ? "bg-secondary"
                    : "hover:bg-secondary/50"
                )}
              >
                <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick-add chips or counter bar */}
      {ingredients.length === 0 ? (
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
            Popular ingredients
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR_INGREDIENTS.map((ing) => (
              <button
                key={ing}
                type="button"
                onClick={() => addIngredient(ing)}
                className="rounded-full border px-3 py-1 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {ing}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">
              {ingredients.length}
            </span>{" "}
            ingredient{ingredients.length !== 1 ? "s" : ""} added
          </span>
          <button
            type="button"
            onClick={() => onIngredientsChange([])}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
