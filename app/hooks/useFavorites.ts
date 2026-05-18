"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Match } from "../matches";

const FAVORITES_STORAGE_KEY = "footyview:favorites:v1";
const FAVORITES_CHANGED_EVENT = "footyview:favorites-changed";

function readFavorites() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    const parsedFavorites: unknown = storedFavorites ? JSON.parse(storedFavorites) : [];

    return Array.isArray(parsedFavorites)
      ? parsedFavorites.filter((team): team is string => typeof team === "string")
      : [];
  } catch {
    return [];
  }
}

function normalizeFavorites(favorites: string[]) {
  return Array.from(new Set(favorites)).sort((firstTeam, secondTeam) =>
    firstTeam.localeCompare(secondTeam, "fr"),
  );
}

export function useFavorites() {
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);

  useEffect(() => {
    function syncFavorites() {
      setFavoriteTeams(normalizeFavorites(readFavorites()));
    }

    syncFavorites();

    window.addEventListener("storage", syncFavorites);
    window.addEventListener(FAVORITES_CHANGED_EVENT, syncFavorites);

    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener(FAVORITES_CHANGED_EVENT, syncFavorites);
    };
  }, []);

  const favoriteTeamSet = useMemo(() => new Set(favoriteTeams), [favoriteTeams]);

  const isFavoriteTeam = useCallback(
    (team: string) => favoriteTeamSet.has(team),
    [favoriteTeamSet],
  );

  const updateFavorites = useCallback((nextFavorites: string[]) => {
    const normalizedFavorites = normalizeFavorites(nextFavorites);

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(normalizedFavorites));
    window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
    setFavoriteTeams(normalizedFavorites);
  }, []);

  const toggleFavoriteTeam = useCallback(
    (team: string) => {
      const nextFavorites = new Set(readFavorites());

      if (nextFavorites.has(team)) {
        nextFavorites.delete(team);
      } else {
        nextFavorites.add(team);
      }

      updateFavorites(Array.from(nextFavorites));
    },
    [updateFavorites],
  );

  const isFavoriteMatch = useCallback(
    (match: Pick<Match, "homeTeam" | "awayTeam">) =>
      favoriteTeamSet.has(match.homeTeam) || favoriteTeamSet.has(match.awayTeam),
    [favoriteTeamSet],
  );

  const sortMatchesByFavorites = useCallback(
    <TMatch extends Pick<Match, "homeTeam" | "awayTeam">>(matches: TMatch[]) =>
      [...matches].sort((firstMatch, secondMatch) => {
        const firstFavorite = isFavoriteMatch(firstMatch);
        const secondFavorite = isFavoriteMatch(secondMatch);

        if (firstFavorite === secondFavorite) {
          return 0;
        }

        return firstFavorite ? -1 : 1;
      }),
    [isFavoriteMatch],
  );

  return {
    favoriteTeams,
    isFavoriteTeam,
    isFavoriteMatch,
    toggleFavoriteTeam,
    sortMatchesByFavorites,
  };
}
