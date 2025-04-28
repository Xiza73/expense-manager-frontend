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

export const getDayMonth = (date: Date) => {
  const monthNumber = date.getMonth() + 1;
  const dayNumber = date.getDate();
  let month = '';
  let day = '';

  if (monthNumber < 10) {
    month = `0${monthNumber}`;
  } else {
    month = monthNumber.toString();
  }

  if (dayNumber < 10) {
    day = `0${dayNumber}`;
  } else {
    day = dayNumber.toString();
  }

  return `${month}/${day}`;
};
