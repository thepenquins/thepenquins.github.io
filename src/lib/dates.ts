const monthNames = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

const monthNamesGenitive = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

/** "2025-03" → "март 2025" */
export const formatMonthYear = (value: string) => {
  const [year = "", month = ""] = value.split("-");
  const name = monthNames[Number(month) - 1];

  return /^\d{4}$/.test(year) && name ? `${name} ${year}` : value;
};

/** Дата заметки → "17 ноября 2026" */
export const formatLongDate = (date: Date) => {
  const day = date.getUTCDate();
  const month = monthNamesGenitive[date.getUTCMonth()] ?? "";
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
};
