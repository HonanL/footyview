import { HomePageClient } from "./components/HomePageClient";
import { fetchHomepageMatches } from "./services/apiFootball";

export default async function Home() {
  const result = await fetchHomepageMatches();

  if (!result.ok) {
    return <HomePageClient errorMessage={result.error} />;
  }

  const matches = result.data;

  return <HomePageClient match={matches[0]} />;
}
