import { isBefore, isEqual, parseISO } from 'date-fns';
import { format } from 'date-fns';

export const parseUTC = (date) =>
  new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ),
  );

export const isSameOrBefore = (date) => {
  const localDate = parseISO(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"));
  const currentDate = parseISO(format(date, "yyyy-MM-dd'T'HH:mm:ss"));

  return isBefore(currentDate, localDate) || isEqual(currentDate, localDate);
};
