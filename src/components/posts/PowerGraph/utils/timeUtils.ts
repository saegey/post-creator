// utils/timeUtils.ts

export const formatSeconds = (value: number): string => {
  if (value < 60) return `${value.toFixed(0)}s`;
  if (value >= 3600) return `${(value / 3600).toFixed(0)}h`;
  return `${(value / 60).toFixed(0)}m`;
};

export const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedTime = [
    hrs > 0 ? `${hrs}h` : null,
    mins > 0 ? `${mins}m` : null,
    secs > 0 ? `${secs}s` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return formattedTime || "0s";
};
