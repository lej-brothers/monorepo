export const between = (start: Date, end: Date) => {
  const now = Date.now();
  return now.valueOf() >= start.valueOf() && now.valueOf() <= end.valueOf();
};
