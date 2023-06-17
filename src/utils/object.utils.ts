export const isObjectWithFields = (obj: Record<string, unknown>) => {
  return typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0;
};
