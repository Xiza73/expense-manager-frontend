export const getEndTime = <T extends Record<string, string>, K extends keyof T>(
  handler: T,
  start: K,
  duration: number,
): string => {
  const arr = Object.values(handler);
  const startIndex = arr.indexOf(start as string);

  if (startIndex === -1) return '';

  const endIndex = startIndex + duration;

  return arr[endIndex];
};
