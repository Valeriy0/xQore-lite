import Qs from 'qs';

export const linkWithQuery = (link, query) => {
  return `${link}${Qs.stringify({ user: query.user, ...query }, { addQueryPrefix: true })}`;
};
