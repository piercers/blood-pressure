/**
 * Calculate the milliseconds difference between two ISO date-time strings
 */
export const diffISODates = (a: string, b: string): number =>
  Date.parse(a) - Date.parse(b);
