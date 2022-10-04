export const round = (value: string): string => {
  return (+value).toPrecision(2).toString();
};
