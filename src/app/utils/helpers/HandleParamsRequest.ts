export const _convertObjectToQuery = (obj: any) => {
  let query = '';
  for (let key in obj) {
    if (obj[key] !== undefined) {
      if (query) {
        query += `&${key}=${obj[key]}`;
      } else {
        query += `${key}=${obj[key]}`;
      }
    }
  }
  return query;
}