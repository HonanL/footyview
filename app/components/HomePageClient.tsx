"use client";

import Link from "next/link";
import type { Match } from "../matches";
import { getMatchTitle } from "../matches";
import { useFavorites } from "../hooks/useFavorites";
import { TeamFavoriteButton } from "./TeamFavoriteButton";

type HomePageClientProps = {
  matches: Match[];
  errorMessage?: string;
};

export function HomePageClient({ matches, errorMessage }: HomePageClientProps) {
  const { favoriteTeams, isFavoriteMatch, sortMatchesByFavorites } = useFavorites();
  const sortedMatches = sortMatchesByFavorites(matches);

  return (
    <main className="min-h-screen bg-black p-8 text-white sm:p-12">
      <h1 className="mb-5 text-5xl font-black tracking-wide sm:text-7xl">FootyView</h1>
      <p className="mb-10 text-2xl font-semibold text-zinc-400">
        Votre monde du football sur un seul écran
      </p>

      <section className="mb-10 rounded-lg border border-white/10 bg-zinc-950 p-7">
        <h2 className="text-3xl font-black">Vos équipes favorites</h2>
        {favoriteTeams.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-4">
            {favoriteTeams.map((team) => (
              <TeamFavoriteButton key={team} team={team} variant="large" />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-xl font-semibold text-zinc-400">
            Aucune équipe favorite pour le moment.
          </p>
        )}
      </section>

      {errorMessage ? (
        <section className="mb-8 rounded-lg border border-red-400/40 bg-red-950/30 p-7">
          <h2 className="text-3xl font-black text-red-200">Données indisponibles</h2>
          <p className="mt-3 text-xl font-semibold text-red-100">{errorMessage}</p>
        </section>
      ) : null}

      {sortedMatches.length === 0 ? (
        <section className="rounded-lg border border-white/10 bg-zinc-950 p-10 text-center">
          <h2 className="text-4xl font-black">Aucun match disponible</h2>
          <p className="mt-4 text-xl font-semibold text-zinc-400">
            Revenez bientôt pour les matchs en direct et à venir.
          </p>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {sortedMatches.map((match) => {
            const favoriteMatch = isFavoriteMatch(match);

            return (
              <article
                key={match.id}
                className={`rounded-lg border p-7 transition ${
                  favoriteMatch
                    ? "border-yellow-300/60 bg-yellow-300/10 shadow-2xl shadow-yellow-950/30"
                    : "border-white/10 bg-zinc-900"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p
                    className={`mb-5 text-xl font-black ${
                      match.status === "EN DIRECT" ? "text-green-400" : "text-sky-300"
                    }`}
                  >
                    {match.status} {match.minute}
                  </p>
                  {favoriteMatch ? (
                    <p className="rounded-lg bg-yellow-300 px-3 py-2 text-sm font-black uppercase tracking-wide text-black">
                      Favori
                    </p>
                  ) : null}
                </div>

                <Link
                  href={`/match/${match.id}`}
                  className="block rounded-lg outline-none transition hover:text-green-300 focus:ring-4 focus:ring-green-400/25"
                >
                  <h3 className="text-3xl font-black">{getMatchTitle(match)}</h3>
                  <p className="mt-4 text-lg font-semibold text-zinc-400">{match.league}</p>
                  <p className="mt-8 text-sm font-bold uppercase tracking-wide text-zinc-500">
                    Voir la fiche match
                  </p>
                </Link>

                <div className="mt-7 grid gap-3">
                  <TeamFavoriteButton team={match.homeTeam} variant="large" />
                  <TeamFavoriteButton team={match.awayTeam} variant="large" />
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
