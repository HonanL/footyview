import Link from "next/link";
import { notFound } from "next/navigation";
import { TeamFavoriteButton } from "../../components/TeamFavoriteButton";
import { getMatch, getMatchTitle, matches } from "../../matches";
import { rankProviders, type UserPreferences } from "../../utils/rankProviders";

type MatchPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const defaultPreferences: UserPreferences = {
  preferredDevice: "TV connectée",
  preferFrenchProviders: true,
  preferPremiumProviders: true,
  maxSubscriptionCost: 16,
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
    title: match ? `${getMatchTitle(match)} | FootyView` : "Match | FootyView",
  };
}

export default async function MatchDetailPage({ params }: MatchPageProps) {
  const { id } = await params;
  const match = getMatch(id);

  if (!match) {
    notFound();
  }

  const rankedProviders = rankProviders(match.providers, defaultPreferences);
  const [bestProvider, ...otherProviders] = rankedProviders;
  const statusColor = match.status === "EN DIRECT" ? "text-green-400" : "text-sky-300";
  const statusBorder = match.status === "EN DIRECT" ? "border-green-400/40" : "border-sky-300/40";

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-8 py-8 sm:px-12 lg:px-16">
        <header className="flex items-center justify-between gap-8">
          <Link
            href="/"
            className="rounded-lg border border-white/20 px-7 py-4 text-xl font-black outline-none transition hover:border-white focus:border-green-400 focus:ring-4 focus:ring-green-400/25"
          >
            Retour
          </Link>

          <div className={`rounded-lg border ${statusBorder} bg-zinc-950 px-7 py-4 text-right`}>
            <p className={`text-2xl font-black ${statusColor}`}>{match.status}</p>
            <p className="mt-1 text-lg font-semibold text-zinc-400">
              {match.status === "EN DIRECT" ? "Minute" : "Début"} {match.minute}
            </p>
          </div>
        </header>

        <div className="grid flex-1 content-center gap-10 py-12">
          <section className="rounded-lg border border-white/10 bg-zinc-950 p-8 sm:p-12 lg:p-14">
            <p className="text-2xl font-black uppercase tracking-[0.24em] text-zinc-500">
              {match.league}
            </p>

            <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
              <h1 className="text-6xl font-black leading-none sm:text-7xl lg:text-8xl">
                {match.homeTeam}
              </h1>

              <p className="text-center text-4xl font-black text-zinc-500 lg:text-5xl">VS</p>

              <h2 className="text-6xl font-black leading-none sm:text-7xl lg:text-right lg:text-8xl">
                {match.awayTeam}
              </h2>
            </div>

            <div className="mt-12 rounded-lg border border-white/10 bg-black/30 p-6">
              <p className="text-xl font-black uppercase tracking-[0.2em] text-zinc-500">
                Équipes favorites
              </p>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                <TeamFavoriteButton team={match.homeTeam} variant="large" />
                <TeamFavoriteButton team={match.awayTeam} variant="large" />
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-zinc-950 p-8 sm:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xl font-black uppercase tracking-[0.22em] text-zinc-500">
                  Où regarder
                </p>
                <h3 className="mt-4 text-4xl font-black sm:text-5xl">Recommandation intelligente</h3>
              </div>
              <p className="text-xl font-semibold text-zinc-400">France · TV connectée</p>
            </div>

            {bestProvider ? (
              <div className="mt-8">
                <p className="mb-4 text-lg font-black uppercase tracking-[0.2em] text-green-400">
                  ⭐ Meilleure option
                </p>
                <article className="rounded-lg border border-green-400/60 bg-green-400/10 p-7 shadow-2xl shadow-green-950/40 sm:p-8">
                  <div className="grid gap-6 lg:grid-cols-[1fr_auto_auto] lg:items-center">
                    <h4 className="text-4xl font-black sm:text-5xl">{bestProvider.name}</h4>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">
                        Qualité
                      </p>
                      <p className="mt-2 text-2xl font-black">{bestProvider.quality}</p>
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">
                        Abonnement
                      </p>
                      <p className="mt-2 text-2xl font-black">{bestProvider.subscription}</p>
                    </div>
                  </div>
                </article>
              </div>
            ) : null}

            <div className="mt-8">
              <p className="mb-4 text-lg font-black uppercase tracking-[0.2em] text-zinc-500">
                Autres options
              </p>
              <div className="grid gap-5 lg:grid-cols-2">
                {otherProviders.map((provider) => (
                  <article
                    key={provider.name}
                    className="rounded-lg border border-white/10 bg-zinc-900 p-7"
                  >
                    <h4 className="text-3xl font-black">{provider.name}</h4>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">
                          Qualité
                        </p>
                        <p className="mt-2 text-xl font-black">{provider.quality}</p>
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-zinc-500">
                          Abonnement
                        </p>
                        <p className="mt-2 text-xl font-black">{provider.subscription}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
