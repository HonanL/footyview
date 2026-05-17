export type MatchStatus = "EN DIRECT" | "À VENIR";

export type Provider = {
  name: string;
  quality: string;
  bestOption: boolean;
  subscription: string;
};

export type Match = {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  status: MatchStatus;
  minute: string;
  providers: Provider[];
};

export const matches: Match[] = [
  {
    id: "arsenal-chelsea",
    league: "Premier League",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    status: "EN DIRECT",
    minute: "67'",
    providers: [
      {
        name: "Canal+",
        quality: "4K HDR",
        bestOption: true,
        subscription: "Abonnement Sport",
      },
      {
        name: "Amazon Prime Video",
        quality: "Full HD",
        bestOption: false,
        subscription: "Pass Ligue et Sports",
      },
      {
        name: "beIN Sports",
        quality: "Full HD",
        bestOption: false,
        subscription: "Bouquet beIN Sports",
      },
    ],
  },
  {
    id: "barcelone-real-madrid",
    league: "LaLiga",
    homeTeam: "Barcelone",
    awayTeam: "Real Madrid",
    status: "EN DIRECT",
    minute: "51'",
    providers: [
      {
        name: "beIN Sports",
        quality: "4K",
        bestOption: true,
        subscription: "Bouquet beIN Sports",
      },
      {
        name: "Canal+",
        quality: "Full HD",
        bestOption: false,
        subscription: "Pack chaînes sport",
      },
      {
        name: "Amazon Prime Video",
        quality: "Full HD",
        bestOption: false,
        subscription: "Location événement",
      },
    ],
  },
  {
    id: "inter-ac-milan",
    league: "Serie A",
    homeTeam: "Inter Milan",
    awayTeam: "AC Milan",
    status: "À VENIR",
    minute: "20:45",
    providers: [
      {
        name: "DAZN",
        quality: "Full HD 60 i/s",
        bestOption: true,
        subscription: "Abonnement DAZN",
      },
      {
        name: "Canal+",
        quality: "Full HD",
        bestOption: false,
        subscription: "Pack Sport",
      },
      {
        name: "beIN Sports",
        quality: "HD",
        bestOption: false,
        subscription: "Bouquet beIN Sports",
      },
    ],
  },
];

export function getMatch(id: string) {
  return matches.find((match) => match.id === id);
}

export function getMatchTitle(match: Match) {
  return `${match.homeTeam} vs ${match.awayTeam}`;
}
