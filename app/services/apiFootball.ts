import { getDefaultProviders, type Match, type MatchStatus } from "../matches";

const API_FOOTBALL_BASE_URL =
  process.env.API_FOOTBALL_BASE_URL ?? "https://v3.football.api-sports.io";
const API_FOOTBALL_KEY = process.env.API_FOOTBALL_KEY;

export type ApiFootballResult<TData> =
  | {
      ok: true;
      data: TData;
    }
  | {
      ok: false;
      error: string;
    };

type ApiFootballEnvelope<TResponse> = {
  get: string;
  parameters: Record<string, string>;
  errors: string[] | Record<string, string>;
  results: number;
  paging?: {
    current: number;
    total: number;
  };
  response: TResponse;
};

type ApiFootballFixtureStatus = {
  long: string;
  short: string;
  elapsed: number | null;
};

export type ApiFootballFixture = {
  fixture: {
    id: number;
    date: string;
    status: ApiFootballFixtureStatus;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo?: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
    };
    away: {
      id: number;
      name: string;
    };
  };
};

export type ApiFootballLeague = {
  league: {
    id: number;
    name: string;
    type: string;
    logo?: string;
  };
  country: {
    name: string;
    code?: string;
    flag?: string;
  };
  seasons: Array<{
    year: number;
    current: boolean;
  }>;
};

function getApiKey() {
  if (!API_FOOTBALL_KEY) {
    throw new Error("Clé API-Football manquante. Ajoutez API_FOOTBALL_KEY à l'environnement.");
  }

  return API_FOOTBALL_KEY;
}

function formatApiErrors(errors: string[] | Record<string, string>) {
  if (Array.isArray(errors)) {
    return errors.join(", ");
  }

  return Object.values(errors).join(", ");
}

async function fetchApiFootball<TResponse>(
  path: string,
  params: Record<string, string | number>,
): Promise<ApiFootballEnvelope<TResponse>> {
  const url = new URL(`${API_FOOTBALL_BASE_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url, {
    headers: {
      "x-apisports-key": getApiKey(),
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(`Réponse API invalide (${response.status}).`);
  }

  const payload = (await response.json()) as ApiFootballEnvelope<TResponse>;
  const apiErrors = formatApiErrors(payload.errors);

  if (apiErrors) {
    throw new Error(apiErrors);
  }

  return payload;
}

function getMatchStatus(status: ApiFootballFixtureStatus): MatchStatus {
  return status.elapsed ? "EN DIRECT" : "À VENIR";
}

function getMatchMinute(fixture: ApiFootballFixture["fixture"]) {
  if (fixture.status.elapsed) {
    return `${fixture.status.elapsed}'`;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(fixture.date));
}

function getCurrentFootballSeason(date = new Date()) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();

  return month >= 6 ? year : year - 1;
}

function isFinishedFixture(fixture: ApiFootballFixture) {
  const finishedStatuses = new Set(["FT", "AET", "PEN"]);

  return finishedStatuses.has(fixture.fixture.status.short);
}

function normalizeFixture(fixture: ApiFootballFixture): Match {
  return {
    id: String(fixture.fixture.id),
    league: fixture.league.name,
    leagueId: fixture.league.id,
    homeTeam: fixture.teams.home.name,
    awayTeam: fixture.teams.away.name,
    status: getMatchStatus(fixture.fixture.status),
    minute: getMatchMinute(fixture.fixture),
    date: fixture.fixture.date,
    providers: getDefaultProviders(fixture.league.name),
  };
}

async function safelyFetchMatches(
  fetchMatches: () => Promise<Match[]>,
): Promise<ApiFootballResult<Match[]>> {
  try {
    const data = await fetchMatches();

    return {
      ok: true,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Impossible de récupérer les matchs.",
    };
  }
}

export function fetchLiveMatches() {
  return safelyFetchMatches(async () => {
    const payload = await fetchApiFootball<ApiFootballFixture[]>("/fixtures", {
      live: "all",
      team: 85,
    });

    return payload.response.map(normalizeFixture);
  });
}

export function fetchUpcomingMatches(limit = 9) {
  return safelyFetchMatches(async () => {
    const today = new Date();
    const ninetyDaysFromToday = new Date(today);

    ninetyDaysFromToday.setDate(today.getDate() + 90);

    const from = today.toISOString().slice(0, 10);
    const to = ninetyDaysFromToday.toISOString().slice(0, 10);
    const payload = await fetchApiFootball<ApiFootballFixture[]>("/fixtures", {
      team: 85,
      from,
      to,
      season: getCurrentFootballSeason(today),
    });

    return payload.response
      .filter((fixture) => !isFinishedFixture(fixture))
      .sort(
        (firstFixture, secondFixture) =>
          new Date(firstFixture.fixture.date).getTime() -
          new Date(secondFixture.fixture.date).getTime(),
      )
      .slice(0, limit)
      .map(normalizeFixture);
  });
}

export async function fetchLeagueInfo(leagueId: number): Promise<ApiFootballResult<ApiFootballLeague[]>> {
  try {
    const payload = await fetchApiFootball<ApiFootballLeague[]>("/leagues", {
      id: leagueId,
    });

    return {
      ok: true,
      data: payload.response,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Impossible de récupérer la ligue.",
    };
  }
}

export async function fetchMatchById(id: string): Promise<ApiFootballResult<Match | null>> {
  try {
    const payload = await fetchApiFootball<ApiFootballFixture[]>("/fixtures", {
      id,
    });
    const fixture = payload.response[0];

    return {
      ok: true,
      data: fixture ? normalizeFixture(fixture) : null,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Impossible de récupérer le match.",
    };
  }
}

export async function fetchHomepageMatches(): Promise<ApiFootballResult<Match[]>> {
  const [liveMatches, upcomingMatches] = await Promise.all([
    fetchLiveMatches(),
    fetchUpcomingMatches(),
  ]);

  if (!liveMatches.ok && !upcomingMatches.ok) {
    return {
      ok: false,
      error: liveMatches.error,
    };
  }

  const matches = [
    ...(liveMatches.ok ? liveMatches.data : []),
    ...(upcomingMatches.ok ? upcomingMatches.data : []),
  ];
  const uniqueMatches = Array.from(new Map(matches.map((match) => [match.id, match])).values());

  return {
    ok: true,
    data: uniqueMatches,
  };
}
