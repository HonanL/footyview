import type { Provider } from "./utils/rankProviders";

export type MatchStatus = "EN DIRECT" | "À VENIR";

export type Match = {
  id: string;
  league: string;
  leagueId?: number;
  homeTeam: string;
  awayTeam: string;
  status: MatchStatus;
  minute: string;
  date: string;
  providers: Provider[];
};

export function getDefaultProviders(league?: string): Provider[] {
  if (league?.toLowerCase().includes("liga")) {
    return [
      {
        name: "beIN Sports",
        quality: "4K",
        bestOption: true,
        subscription: "Bouquet beIN Sports",
        subscriptionCost: 15,
        deviceCompatibility: ["TV connectée", "Apple TV", "Chromecast"],
      },
      {
        name: "Canal+",
        quality: "Full HD",
        bestOption: false,
        subscription: "Pack chaînes sport",
        subscriptionCost: 29.99,
        deviceCompatibility: ["TV connectée", "Apple TV", "Chromecast", "Console"],
      },
      {
        name: "Amazon Prime Video",
        quality: "Full HD",
        bestOption: false,
        subscription: "Location événement",
        subscriptionCost: 7.99,
        deviceCompatibility: ["TV connectée", "Fire TV", "Chromecast", "Console"],
      },
    ];
  }

  if (league?.toLowerCase().includes("serie")) {
    return [
      {
        name: "DAZN",
        quality: "Full HD 60 i/s",
        bestOption: true,
        subscription: "Abonnement DAZN",
        subscriptionCost: 14.99,
        deviceCompatibility: ["TV connectée", "Apple TV", "Chromecast", "Console"],
      },
      {
        name: "Canal+",
        quality: "Full HD",
        bestOption: false,
        subscription: "Pack Sport",
        subscriptionCost: 29.99,
        deviceCompatibility: ["TV connectée", "Apple TV", "Chromecast", "Console"],
      },
      {
        name: "beIN Sports",
        quality: "HD",
        bestOption: false,
        subscription: "Bouquet beIN Sports",
        subscriptionCost: 15,
        deviceCompatibility: ["TV connectée", "Apple TV", "Chromecast"],
      },
    ];
  }

  return [
    {
      name: "Canal+",
      quality: "4K HDR",
      bestOption: true,
      subscription: "Abonnement Sport",
      subscriptionCost: 29.99,
      deviceCompatibility: ["TV connectée", "Apple TV", "Chromecast", "Console"],
    },
    {
      name: "Amazon Prime Video",
      quality: "Full HD",
      bestOption: false,
      subscription: "Pass Ligue et Sports",
      subscriptionCost: 14.99,
      deviceCompatibility: ["TV connectée", "Fire TV", "Chromecast", "Console"],
    },
    {
      name: "beIN Sports",
      quality: "Full HD",
      bestOption: false,
      subscription: "Bouquet beIN Sports",
      subscriptionCost: 15,
      deviceCompatibility: ["TV connectée", "Apple TV", "Chromecast"],
    },
  ];
}

export const matches: Match[] = [
  {
    id: "arsenal-chelsea",
    league: "Premier League",
    leagueId: 39,
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    status: "EN DIRECT",
    minute: "67'",
    date: "2026-05-18T20:00:00+00:00",
    providers: getDefaultProviders("Premier League"),
  },
  {
    id: "barcelone-real-madrid",
    league: "LaLiga",
    leagueId: 140,
    homeTeam: "Barcelone",
    awayTeam: "Real Madrid",
    status: "EN DIRECT",
    minute: "51'",
    date: "2026-05-18T19:30:00+00:00",
    providers: getDefaultProviders("LaLiga"),
  },
  {
    id: "inter-ac-milan",
    league: "Serie A",
    leagueId: 135,
    homeTeam: "Inter Milan",
    awayTeam: "AC Milan",
    status: "À VENIR",
    minute: "20:45",
    date: "2026-05-18T19:45:00+00:00",
    providers: getDefaultProviders("Serie A"),
  },
];

export function getMatch(id: string) {
  return matches.find((match) => match.id === id);
}

export function getMatchTitle(match: Pick<Match, "homeTeam" | "awayTeam">) {
  return `${match.homeTeam} vs ${match.awayTeam}`;
}
