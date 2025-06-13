export const calcHeight = (duration: number) => {
  return duration * 54.4 + (duration - 1) * 9 - (duration > 1 ? 1 : 0) * 2.4;
};

export const ceilHeight = (height: number) => {
  for (let i = 0; i < 12; i++) {
    const ceil = calcHeight(i);

    if (ceil + 16 > height) return { duration: i, height: ceil };
  }

  return { duration: 12, height };
};

export const calcWidth = (duration: number) => {
  return 128 + (duration - 1) * 64;
};
