export const isArrayWithElements = (arr: any[]) => {
  return !!arr && Array.isArray(arr) && arr.length > 0;
};
