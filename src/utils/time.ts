export const formatTime = (value: number) => {
  const valNum = Number(value);

  if (valNum < 3600) {
    return new Date(value * 1000)
      .toISOString()
      .substr(14, 5)
      .replace(/^0+/, '');
  }
  return new Date(valNum * 1000).toISOString().substr(11, 8).replace(/^0+/, '');
};
