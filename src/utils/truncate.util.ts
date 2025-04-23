export const truncate = (str: string, maxLength: number = 10) => {
  const isTruncated = str.length > maxLength;

  if (!str)
    return {
      isTruncated,
      value: str,
    };

  return {
    isTruncated,
    value: isTruncated ? `${str.slice(0, maxLength - 3)}...` : str,
  };
};
