export const diffISODates = (a: string, b: string): number =>
  Date.parse(a) - Date.parse(b);
