/**
 * Convert a time in minutes to hours and minutes.
 * Used for movie and TV show runtime.
 * @param time - The time in minutes
 * @returns - The time in hours and minutes
 */
export const timeConvert = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return `${hours}h ${minutes}m`;
};
