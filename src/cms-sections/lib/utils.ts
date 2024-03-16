export const getValidValueOrDefault = (
  value: string | undefined,
  validValues: string[],
  defaultValue: string,
): string => (typeof value === 'string' && validValues.includes(value) ? value : defaultValue);
