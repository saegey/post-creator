const formatValue = (value: number, unit: "metric" | "imperial") => {
  if (unit === "metric") {
    return `${value?.toFixed(0)} meters`;
  }
  return `${(value * 3.280839895).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })} ft`;
};

const formatTime = (seconds: number) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

const formatAnalysis = (
  analysis: Record<string, number>,
  keys: Array<string>
) => (analysis && keys ? analysis[keys[keys.length - 1]] : "N/A");

export { formatValue, formatTime, formatAnalysis };
