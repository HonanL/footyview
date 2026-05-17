export type Match = {
  id: string;
  competition: string;
  teams: string;
  homeTeam: string;
  awayTeam: string;
  status: string;
  minute: string;
  score: string;
  stadium: string;
  channel: string;
  mood: string;
  timeline: string[];
  stats: {
    possession: string;
    shots: string;
    corners: string;
  };
};

export const matches: Match[] = [
  {
    id: "arsenal-chelsea",
    competition: "Premier League",
    teams: "Arsenal vs Chelsea",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    status: "EN DIRECT",
    minute: "67'",
    score: "2 - 1",
    stadium: "Emirates Stadium",
    channel: "Canal+ Sport",
    mood: "Arsenal pousse haut, Chelsea cherche la transition rapide.",
    timeline: ["12' But Arsenal", "39' Égalisation Chelsea", "58' Arsenal reprend l'avantage"],
    stats: {
      possession: "58% - 42%",
      shots: "13 - 8",
      corners: "6 - 3",
    },
  },
  {
    id: "barcelone-real-madrid",
    competition: "LaLiga",
    teams: "Barcelone vs Real Madrid",
    homeTeam: "Barcelone",
    awayTeam: "Real Madrid",
    status: "EN DIRECT",
    minute: "51'",
    score: "1 - 1",
    stadium: "Estadi Olímpic Lluís Companys",
    channel: "beIN Sports 1",
    mood: "Classico tendu, rythme élevé et beaucoup d'espaces entre les lignes.",
    timeline: ["18' But Real Madrid", "33' Barcelone égalise", "49' Occasion franche Barcelone"],
    stats: {
      possession: "61% - 39%",
      shots: "9 - 7",
      corners: "4 - 5",
    },
  },
  {
    id: "inter-ac-milan",
    competition: "Serie A",
    teams: "Inter Milan vs AC Milan",
    homeTeam: "Inter Milan",
    awayTeam: "AC Milan",
    status: "EN DIRECT",
    minute: "73'",
    score: "0 - 0",
    stadium: "San Siro",
    channel: "DAZN",
    mood: "Derby fermé, les deux blocs attendent l'erreur décisive.",
    timeline: ["21' Carton jaune Inter", "46' Double changement Milan", "70' Parade decisive"],
    stats: {
      possession: "49% - 51%",
      shots: "7 - 10",
      corners: "2 - 6",
    },
  },
];

export function getMatch(id: string) {
  return matches.find((match) => match.id === id);
}
