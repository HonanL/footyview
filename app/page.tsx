import { HomePageClient } from "./components/HomePageClient";
import { matches } from "./matches";

export default function Home() {
  return <HomePageClient matches={matches} />;
}
