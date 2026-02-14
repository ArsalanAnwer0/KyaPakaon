import { Clock, Users, Flame, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { RecipeResult } from "@/types";

function formatCookTime(minutes: number): string {
  if (minutes >= 60) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hrs} hr${hrs > 1 ? "s" : ""} ${mins} min` : `${hrs} hr${hrs > 1 ? "s" : ""}`;
  }
  return `${minutes} min`;
}

interface RecipeCardProps {
  recipe: RecipeResult;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const matchPercent = Math.round(recipe.matchScore * 100);
  const isPerfect = recipe.matchScore === 1;
  const isHigh = recipe.matchScore >= 0.7;

  return (
    <div
      className={cn(
        "rounded-xl border-2 bg-card overflow-hidden transition-shadow hover:shadow-md",
        isPerfect
          ? "border-accent/50 shadow-sm"
          : "border-border hover:border-primary/30"
      )}
    >
      {/* Match indicator bar */}
      <div
        className={cn(
          "px-4 py-2.5 flex items-center justify-between",
          isPerfect
            ? "bg-accent/10"
            : isHigh
              ? "bg-primary/5"
              : "bg-muted/50"
        )}
      >
        <div className="flex items-center gap-1.5">
          {isPerfect ? (
            <>
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-accent">
                <Check className="h-3 w-3 text-accent-foreground" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-accent">
                Perfect Match
              </span>
            </>
          ) : (
            <span
              className={cn(
                "text-xs font-bold uppercase tracking-wide",
                isHigh ? "text-primary" : "text-muted-foreground"
              )}
            >
              {matchPercent}% Match
            </span>
          )}
        </div>
        <Badge variant="outline" className="text-[10px] px-2 py-0">
          {recipe.cuisine}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Name */}
        <h3 className="font-heading text-xl font-bold text-foreground leading-tight">
          {recipe.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {recipe.description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatCookTime(recipe.cookingTime)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {recipe.servings} servings
          </span>
          <span className="flex items-center gap-0.5">
            {[1, 2, 3].map((level) => (
              <Flame
                key={level}
                className={cn(
                  "h-4 w-4",
                  level <= recipe.spiceLevel
                    ? "text-primary fill-primary"
                    : "text-border"
                )}
              />
            ))}
          </span>
          <Badge variant="secondary" className="text-xs">
            {recipe.category}
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <Progress
            value={matchPercent}
            className={cn(
              "h-2 flex-1",
              isPerfect
                ? "[&>[data-slot=progress-indicator]]:bg-accent"
                : isHigh
                  ? "[&>[data-slot=progress-indicator]]:bg-primary"
                  : "[&>[data-slot=progress-indicator]]:bg-primary/60"
            )}
          />
          <span className="text-xs text-muted-foreground font-medium shrink-0">
            {recipe.matchedIngredients.length}/{recipe.totalIngredients}
          </span>
        </div>

        {/* Ingredient tags */}
        <div className="flex flex-wrap gap-1.5">
          {recipe.matchedIngredients.map((ing) => (
            <span
              key={ing}
              className="inline-flex items-center gap-1 rounded-full bg-accent/10 text-accent px-2 py-0.5 text-xs"
            >
              <Check className="h-3 w-3" />
              {ing}
            </span>
          ))}
          {recipe.missingIngredients.map((ing) => (
            <span
              key={ing}
              className="inline-flex items-center gap-1 rounded-full bg-destructive/10 text-destructive px-2 py-0.5 text-xs"
            >
              <X className="h-3 w-3" />
              {ing}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
