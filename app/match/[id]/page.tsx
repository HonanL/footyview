import Link from "next/link";
import { notFound } from "next/navigation";
import { getMatch, getMatchTitle, matches, type Match } from "../../matches";
import { fetchMatchById } from "../../services/apiFootball";

type MatchPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function resolveMatch(id: string): Promise<Match | undefined> {
  const staticMatch = getMatch(id);

  if (staticMatch) {
    return staticMatch;
  }

  if (!/^\d+$/.test(id)) {
    return undefined;
  }

  const apiMatch = await fetchMatchById(id);

  return apiMatch.ok && apiMatch.data ? apiMatch.data : undefined;
}

function getPsgMatchTitle(match: Match) {
  const psgNames = ["psg", "paris saint-germain", "paris sg"];
  const homeIsPsg = psgNames.some((name) => match.homeTeam.toLowerCase().includes(name));
  const awayIsPsg = psgNames.some((name) => match.awayTeam.toLowerCase().includes(name));

  if (homeIsPsg) {
    return `${match.homeTeam} vs ${match.awayTeam}`;
  }

  if (awayIsPsg) {
    return `${match.awayTeam} vs ${match.homeTeam}`;
  }

  return getMatchTitle(match);
}

function getBeninDateTime(date: string) {
  const matchDate = new Date(date);

  return {
    date: new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "full",
      timeZone: "Africa/Porto-Novo",
    }).format(matchDate),
    time: new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Porto-Novo",
    }).format(matchDate),
  };
}

export function generateStaticParams() {
  return matches.map((match) => ({
    id: match.id,
  }));
}

export async function generateMetadata({ params }: MatchPageProps) {
  const { id } = await params;
  const match = await resolveMatch(id);

  return {
    title: match ? `${getPsgMatchTitle(match)} | FootyView` : "Match | FootyView",
  };
}

export default async function MatchDetailPage({ params }: MatchPageProps) {
  const { id } = await params;
  const match = await resolveMatch(id);

  if (!match) {
    notFound();
  }

  const beninDateTime = getBeninDateTime(match.date);
  const hasProviders = match.providers.length > 0;

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col px-5 py-5">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="flex min-h-12 items-center rounded-lg border border-white/15 px-4 py-3 text-sm font-black outline-none transition hover:border-white focus:ring-4 focus:ring-white/20"
          >
            Retour
          </Link>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
            FootyView
          </p>
        </header>

        <section className="mt-5 rounded-lg border border-white/10 bg-zinc-950 p-5">
          <p className="break-words text-sm font-black uppercase tracking-[0.22em] text-red-400">
            {match.league}
          </p>
          <h1 className="mt-5 break-words text-4xl font-black leading-none">
            {getPsgMatchTitle(match)}
          </h1>

          <div className="mt-7 grid gap-3">
            <div className="min-w-0 rounded-lg bg-zinc-900 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                Date
              </p>
              <p className="mt-2 break-words text-lg font-black">{beninDateTime.date}</p>
            </div>
            <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
              <div className="min-w-0 rounded-lg bg-zinc-900 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Heure au Bénin
                </p>
                <p className="mt-2 text-2xl font-black">{beninDateTime.time}</p>
              </div>
              <div className="min-w-0 rounded-lg bg-zinc-900 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Statut
                </p>
                <p
                  className={`mt-2 break-words text-lg font-black ${
                    match.status === "EN DIRECT" ? "text-green-400" : "text-sky-300"
                  }`}
                >
                  {match.status}
                </p>
              </div>
            </div>
          </div>
        </section>

        {match.status === "EN DIRECT" ? (
          <section className="mt-4 rounded-lg border border-green-400/30 bg-green-400/10 p-5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-green-300">
              Live
            </p>
            <p className="mt-3 text-3xl font-black">{match.minute}</p>
          </section>
        ) : null}

        <section className="mt-4 rounded-lg border border-white/10 bg-zinc-950 p-5">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-zinc-500">
            Where to Watch
          </p>
          <h2 className="mt-4 break-words text-3xl font-black">Options de diffusion</h2>

          {hasProviders ? (
            <div className="mt-5 grid gap-3">
              {match.providers.map((provider) => (
                <article key={provider.name} className="min-w-0 rounded-lg bg-zinc-900 p-4">
                  <h3 className="break-words text-2xl font-black">{provider.name}</h3>
                  <div className="mt-3 grid gap-2 text-sm font-semibold text-zinc-400 min-[360px]:grid-cols-[auto_1fr]">
                    <span className="break-words">{provider.quality}</span>
                    <span className="break-words min-[360px]:text-right">
                      {provider.subscription}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-5 break-words text-lg font-semibold leading-relaxed text-zinc-400">
              Les options de diffusion seront affichées ici dès qu’elles seront disponibles.
            </p>
          )}
        </section>
      </section>
    </main>
  );
}
