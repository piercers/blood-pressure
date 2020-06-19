/**
 * Calculate the milliseconds difference between two ISO date-time strings
 */
export const diffISODates = (a: string, b: string): number =>
  Date.parse(a) - Date.parse(b);

/**
 * Sets a given path's stylesheet to the document
 */
export const importStylesheet = (pathToCss: string) => {
  const result = document.querySelector(`link[href="${pathToCss}"]`);
  if (!result) {
    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.type = "text/css";
    styles.href = pathToCss;
    document.getElementsByTagName("head")[0].appendChild(styles);
  }
};
