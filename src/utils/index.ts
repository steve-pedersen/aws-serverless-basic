/**
 * Reconstructs the full URL string with query params
 * @param {string} path
 * @param {object} query
 * @return {string}
 */
const buildFullUrl = (path: string, query: any): string => {
  if (query) {
    const queryPart = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&');

    return `${path}?${queryPart}`;
  }

  return path;
};

export { buildFullUrl };
