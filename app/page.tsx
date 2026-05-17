import Link from "next/link";
import { getMatchTitle, matches } from "./matches";

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-8 text-white sm:p-12">
      <h1 className="mb-5 text-5xl font-black tracking-wide sm:text-7xl">FootyView</h1>
      <p className="mb-10 text-2xl font-semibold text-zinc-400">
        Votre monde du football sur un seul écran
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {matches.map((match) => (
          <Link
            key={match.id}
            href={`/match/${match.id}`}
            className="rounded-lg border border-white/10 bg-zinc-900 p-7 outline-none transition hover:border-green-400 focus:border-green-400 focus:ring-4 focus:ring-green-400/25"
          >
            <p className="mb-5 text-xl font-black text-green-400">
              {match.status} {match.minute}
            </p>

            <h2 className="text-3xl font-black">{getMatchTitle(match)}</h2>
            <p className="mt-4 text-lg font-semibold text-zinc-400">{match.league}</p>
            <p className="mt-8 text-sm font-bold uppercase tracking-wide text-zinc-500">
              Voir la fiche match
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
