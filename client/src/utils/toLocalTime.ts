import { monthNames } from './months';

export const toLocalTime = (t: number) => {
  const delta = Math.round((+new Date() - t) / 1000);

  const minute = 60,
    hour = minute * 60,
    day = hour * 24;

  if (delta < day * 2) {
    var fuzzy;
    if (delta < 30) fuzzy = 'just then';
    else if (delta < minute) fuzzy = delta + ' seconds ago';
    else if (delta < 2 * minute) fuzzy = 'a minute ago';
    else if (delta < hour) fuzzy = Math.floor(delta / minute) + ' minutes ago';
    else if (Math.floor(delta / hour) == 1) fuzzy = '1 hour ago';
    else if (delta < day) fuzzy = Math.floor(delta / hour) + ' hours ago';
    else if (delta < day * 2) fuzzy = 'yesterday';
    return fuzzy;
  }
  {
    const date = new Date(+t);
    const monthName = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return day + ' ' + monthName?.slice(0, 3) + ' ' + year;
  }
};
