export interface ActivityData {
  normalizedPower: number | null;
  elevationGain: number | null;
  distance: number | null;
  heartAnalysis: Record<string, number> | null;
  elapsedTime: {
    seconds: number;
  } | null;
  tempAnalysis: Record<string, number> | null;
  stoppedTime: number | null;
  powerAnalysis: Record<string, number> | null;
  cadenceAnalysis: Record<string, number> | null;
  // timeInRed: number | string | null;
}

export interface ActivityItem {
  title: string;
  value: string;
}

export type ActivityItems = Array<{ title: string; value: string }>;
