// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildQueryParams = (params: Record<string, any>) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    queryParams.append(key, value);
  });

  return queryParams.toString();
};
