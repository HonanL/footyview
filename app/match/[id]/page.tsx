import Link from "next/link";
import { notFound } from "next/navigation";
import { getMatch, matches } from "../../matches";

type MatchPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return matches.map((match) => ({
    id: match.id,
  }));
}

export async function generateMetadata({ params }: MatchPageProps) {
  const { id } = await params;
  const match = getMatch(id);

  return {
    title: match ? `${match.teams} | FootyView` : "Match | FootyView",
  };
}

export default async function MatchDetailPage({ params }: MatchPageProps) {
  const { id } = await params;
  const match = getMatch(id);

  if (!match) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="min-h-screen px-8 py-7 sm:px-12 lg:px-16">
        <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-7xl flex-col">
          <header className="flex items-center justify-between gap-6">
            <Link
              href="/"
              className="rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-zinc-200 outline-none transition hover:border-green-400 focus:border-green-400 focus:ring-4 focus:ring-green-400/25"
            >
              Retour
            </Link>
            <div className="text-right">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-green-400">
                {match.status}
              </p>
              <p className="mt-1 text-2xl font-black">{match.minute}</p>
            </div>
          </header>

          <div className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1.3fr_0.7fr]">
            <section className="rounded-lg border border-white/10 bg-zinc-950 p-8 shadow-2xl shadow-green-950/20 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
                {match.competition}
              </p>

              <div className="mt-8 grid items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
                <h1 className="text-5xl font-black leading-none sm:text-6xl lg:text-7xl">
                  {match.homeTeam}
                </h1>
                <div className="rounded-lg bg-white px-6 py-4 text-center text-5xl font-black text-black sm:text-6xl">
                  {match.score}
                </div>
                <h2 className="text-5xl font-black leading-none sm:text-right sm:text-6xl lg:text-7xl">
                  {match.awayTeam}
                </h2>
              </div>

              <div className="mt-10 grid gap-4 text-lg text-zinc-300 sm:grid-cols-3">
                <div className="rounded-lg bg-zinc-900 p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                    Stade
                  </p>
                  <p className="mt-2 font-semibold">{match.stadium}</p>
                </div>
                <div className="rounded-lg bg-zinc-900 p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                    Diffusion
                  </p>
                  <p className="mt-2 font-semibold">{match.channel}</p>
                </div>
                <div className="rounded-lg bg-zinc-900 p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
                    Ambiance
                  </p>
                  <p className="mt-2 font-semibold">{match.mood}</p>
                </div>
              </div>
            </section>

            <aside className="grid gap-6">
              <section className="rounded-lg border border-white/10 bg-zinc-950 p-6">
                <h3 className="text-2xl font-black">Temps forts</h3>
                <div className="mt-5 space-y-3">
                  {match.timeline.map((event) => (
                    <p
                      key={event}
                      className="rounded-lg bg-zinc-900 px-4 py-3 text-lg font-semibold text-zinc-100"
                    >
                      {event}
                    </p>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border border-white/10 bg-zinc-950 p-6">
                <h3 className="text-2xl font-black">Statistiques</h3>
                <dl className="mt-5 grid gap-3">
                  <div className="flex items-center justify-between rounded-lg bg-zinc-900 px-4 py-3">
                    <dt className="text-zinc-400">Possession</dt>
                    <dd className="text-xl font-black">{match.stats.possession}</dd>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-zinc-900 px-4 py-3">
                    <dt className="text-zinc-400">Tirs</dt>
                    <dd className="text-xl font-black">{match.stats.shots}</dd>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-zinc-900 px-4 py-3">
                    <dt className="text-zinc-400">Corners</dt>
                    <dd className="text-xl font-black">{match.stats.corners}</dd>
                  </div>
                </dl>
              </section>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
