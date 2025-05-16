export const accountHeader = (
  month?: string,
  year?: number,
  description?: string,
) => {
  if (month && year && description) {
    return `${month} ${year} - ${description}`;
  }

  if (month && year) {
    return `${month} ${year}`;
  }

  if (description) {
    return description;
  }

  return '';
};
