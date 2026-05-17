export default function Home() {
const matches = [
  {
    teams: "Arsenal vs Chelsea",
    status: "EN DIRECT",
    minute: "67'"
  },
  {
    teams: "Barcelone vs Real Madrid",
    status: "EN DIRECT",
    minute: "51'"
  },
  {
    teams: "Inter Milan vs AC Milan",
    status: "EN DIRECT",
    minute: "73'"
  },
];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      
      <h1 className="text-4xl font-bold mb-10">
        FootyView
      </h1>
      <p className="text-zinc-400 mb-6">
        Votre monde du football sur un seul écran
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {matches.map((match, index) => (
          <div key={index} className="bg-zinc-900 p-6 rounded-2xl">
            
            <p className="text-green-400 mb-2">
              {match.status} {match.minute}
            </p>

            <h2 className="text-xl font-semibold">
              {match.teams}
            </h2>

          </div>
        ))}
      </div>

    </div>
  );
}