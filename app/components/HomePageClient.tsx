"use client";

import Link from "next/link";
import type { Match } from "../matches";
import { getMatchTitle } from "../matches";

type HomePageClientProps = {
  match?: Match;
  errorMessage?: string;
};

export function HomePageClient({ match, errorMessage }: HomePageClientProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col px-5 py-5">
        <header className="rounded-lg border border-white/10 bg-zinc-950 p-5">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-red-400">PSG</p>
          <h1 className="mt-3 break-words text-4xl font-black leading-none">
            Paris Saint-Germain
          </h1>
          <p className="mt-3 text-lg font-semibold text-zinc-400">FootyView</p>
        </header>

        {errorMessage ? (
          <section className="mt-5 rounded-lg border border-red-400/40 bg-red-950/30 p-5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-red-200">
              Données indisponibles
            </p>
            <p className="mt-4 break-words text-lg font-semibold leading-relaxed text-red-100">
              {errorMessage}
            </p>
          </section>
        ) : null}

        {!match ? (
          <section className="mt-5 rounded-lg border border-white/10 bg-zinc-950 p-5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
              Next Match
            </p>
            <h2 className="mt-5 break-words text-3xl font-black leading-tight">
              Aucun match disponible
            </h2>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-zinc-400">
              Le prochain match du PSG apparaîtra ici dès qu’il sera disponible.
            </p>
          </section>
        ) : (
          <>
            <section className="mt-5 rounded-lg border border-white/10 bg-zinc-950 p-5 shadow-2xl shadow-red-950/30">
              <div className="flex min-w-0 items-start justify-between gap-3">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
                  Next Match
                </p>
                <p
                  className={`min-h-12 shrink-0 rounded-lg px-3 py-3 text-sm font-black ${
                    match.status === "EN DIRECT"
                      ? "bg-green-400/10 text-green-300"
                      : "bg-sky-400/10 text-sky-300"
                  }`}
                >
                  {match.status}
                </p>
              </div>

              <h2 className="mt-8 max-w-full break-words text-4xl font-black leading-none">
                {getMatchTitle(match)}
              </h2>
              <p className="mt-5 break-words text-xl font-semibold text-zinc-400">
                {match.league}
              </p>
              <p className="mt-8 text-4xl font-black text-white">{match.minute}</p>

              <Link
                href={`/match/${match.id}`}
                className="mt-9 flex min-h-12 items-center justify-center rounded-lg bg-white px-6 py-4 text-center text-xl font-black text-black outline-none transition hover:bg-red-200 focus:ring-4 focus:ring-red-300/40"
              >
                View Match
              </Link>
            </section>

            <section className="mt-4 rounded-lg border border-white/10 bg-zinc-900 px-5 py-4">
              <div className="flex min-w-0 items-center justify-between gap-3">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">
                  Where to watch
                </p>
                <p className="shrink-0 text-lg font-black text-zinc-200">À confirmer</p>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
