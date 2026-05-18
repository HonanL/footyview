"use client";

import { useFavorites } from "../hooks/useFavorites";

type TeamFavoriteButtonProps = {
  team: string;
  variant?: "compact" | "large";
};

export function TeamFavoriteButton({ team, variant = "compact" }: TeamFavoriteButtonProps) {
  const { isFavoriteTeam, toggleFavoriteTeam } = useFavorites();
  const isFavorite = isFavoriteTeam(team);
  const sizeClasses = variant === "large" ? "px-6 py-4 text-xl" : "px-4 py-3 text-base";

  return (
    <button
      type="button"
      onClick={() => toggleFavoriteTeam(team)}
      aria-pressed={isFavorite}
      className={`${sizeClasses} rounded-lg border font-black outline-none transition hover:border-yellow-300 hover:bg-yellow-300/10 focus:border-yellow-300 focus:ring-4 focus:ring-yellow-300/25 ${
        isFavorite
          ? "border-yellow-300 bg-yellow-300/15 text-yellow-200"
          : "border-white/15 bg-black/30 text-zinc-300"
      }`}
    >
      <span aria-hidden="true" className="mr-3">
        {isFavorite ? "★" : "☆"}
      </span>
      {isFavorite ? "Retirer" : "Favori"} {team}
    </button>
  );
}
