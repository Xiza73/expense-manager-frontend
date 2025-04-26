export const getDate = (date: Date) => {
  const dateFormat = Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);

  return dateFormat;
};

export const getOnlyDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
