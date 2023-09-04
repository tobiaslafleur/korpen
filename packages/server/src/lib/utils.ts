export const omit = <T extends object, K extends keyof T>(
  object: T,
  keys: Array<K>
): Omit<T, K> => {
  if (!object || !Array.isArray(keys) || !keys.length) {
    return object;
  }

  return keys.reduce((acc, prop) => {
    // eslint-disable-next-line
    const { [prop as keyof object]: _, ...rest } = acc;
    return rest;
  }, object);
};
