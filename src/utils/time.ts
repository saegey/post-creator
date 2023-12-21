export const formatTime = (value: number) => {
  const valNum = Number(value);

  if (valNum < 3600) {
    return new Date(value * 1000)
      .toISOString()
      .substr(14, 5)
      .replace(/^0+/, "");
  }
  return new Date(valNum * 1000).toISOString().substr(11, 8).replace(/^0+/, "");
};

export const formatMillisecondsToHHMM = (milliseconds: number) => {
  if (milliseconds === 0) {
    return "";
  }
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Add leading zeros if needed
  const formattedHours = hours < 10 ? `${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
