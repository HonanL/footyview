import Link from "next/link";
import { matches } from "./matches";

export default function Home() {
  return (
    <main className="min-h-screen bg-black p-8 text-white">
      <h1 className="mb-10 text-4xl font-bold">FootyView</h1>
      <p className="mb-6 text-zinc-400">Votre monde du football sur un seul écran</p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {matches.map((match) => (
          <Link
            key={match.id}
            href={`/match/${match.id}`}
            className="rounded-lg border border-white/10 bg-zinc-900 p-6 outline-none transition hover:border-green-400 focus:border-green-400 focus:ring-4 focus:ring-green-400/25"
          >
            <p className="mb-2 text-green-400">
              {match.status} {match.minute}
            </p>

            <h2 className="text-xl font-semibold">{match.teams}</h2>
            <p className="mt-4 text-sm uppercase tracking-wide text-zinc-500">
              Voir la fiche match
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
