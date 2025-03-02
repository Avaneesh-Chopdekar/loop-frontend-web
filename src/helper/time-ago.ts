export function timeAgo(date: Date | string): string {
  // Ensure that the 'date' is a valid Date object
  const past = new Date(date);

  // Check if the date is valid (an invalid Date object will return 'Invalid Date')
  if (Number.isNaN(past.getTime())) {
    return "Invalid date"; // Return an error message if the date is invalid
  }

  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (secondsAgo < 60) {
    return `${secondsAgo} second${secondsAgo === 1 ? "" : "s"} ago`;
  }

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  }

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  }

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 30) {
    return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
  }

  const monthsAgo = Math.floor(daysAgo / 30); // A rough estimate
  if (monthsAgo < 12) {
    return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
  }

  const yearsAgo = Math.floor(monthsAgo / 12);
  return `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago`;
}
