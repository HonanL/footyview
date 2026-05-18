import { HomePageClient } from "./components/HomePageClient";
import { fetchHomepageMatches } from "./services/apiFootball";

export default async function Home() {
  const result = await fetchHomepageMatches();

  if (!result.ok) {
    return <HomePageClient matches={[]} errorMessage={result.error} />;
  }

  return <HomePageClient matches={result.data} />;
}
