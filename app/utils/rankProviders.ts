export type DeviceCompatibility =
  | "TV connectée"
  | "Apple TV"
  | "Chromecast"
  | "Fire TV"
  | "Console"
  | "Mobile"
  | "Web";

export type Provider = {
  name: string;
  quality: string;
  bestOption?: boolean;
  subscription: string;
  subscriptionCost: number;
  deviceCompatibility: DeviceCompatibility[];
};

export type UserPreferences = {
  preferredDevice: DeviceCompatibility;
  preferFrenchProviders: boolean;
  preferPremiumProviders: boolean;
  maxSubscriptionCost?: number;
};

export type RankedProvider = Provider & {
  score: number;
};

const PREMIUM_PROVIDERS = new Set(["Canal+", "beIN Sports", "DAZN"]);
const FRENCH_FOCUSED_PROVIDERS = new Set(["Canal+", "beIN Sports"]);

function getQualityScore(quality: string) {
  const normalizedQuality = quality.toLowerCase();

  if (normalizedQuality.includes("4k")) {
    return 40;
  }

  if (normalizedQuality.includes("full hd")) {
    return 26;
  }

  if (normalizedQuality.includes("hd")) {
    return 16;
  }

  return 8;
}

function getCostScore(cost: number, maxSubscriptionCost?: number) {
  if (typeof maxSubscriptionCost === "number" && cost <= maxSubscriptionCost) {
    return 18;
  }

  if (cost <= 10) {
    return 16;
  }

  if (cost <= 16) {
    return 12;
  }

  if (cost <= 25) {
    return 7;
  }

  return 3;
}

export function scoreProvider(provider: Provider, preferences: UserPreferences) {
  let score = 0;

  score += getQualityScore(provider.quality);
  score += getCostScore(provider.subscriptionCost, preferences.maxSubscriptionCost);

  if (provider.deviceCompatibility.includes(preferences.preferredDevice)) {
    score += 24;
  }

  if (provider.deviceCompatibility.includes("TV connectée")) {
    score += 14;
  }

  if (preferences.preferPremiumProviders && PREMIUM_PROVIDERS.has(provider.name)) {
    score += 12;
  }

  if (preferences.preferFrenchProviders && FRENCH_FOCUSED_PROVIDERS.has(provider.name)) {
    score += 10;
  }

  return score;
}

export function rankProviders(providers: Provider[], preferences: UserPreferences): RankedProvider[] {
  return providers
    .map((provider) => ({
      ...provider,
      score: scoreProvider(provider, preferences),
    }))
    .sort((firstProvider, secondProvider) => {
      if (secondProvider.score !== firstProvider.score) {
        return secondProvider.score - firstProvider.score;
      }

      return firstProvider.subscriptionCost - secondProvider.subscriptionCost;
    });
}
