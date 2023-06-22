export const isObjectWithFields = (obj: any) => {
  return typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0;
};
