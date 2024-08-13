export const uniqBy: <T>(a: T[], key: (a: T) => string) => T[] = (a, key) => {
  const seen: { [key: string]: boolean } = {};
  return a.filter((item) => {
    const k = key(item);

    return Object.prototype.hasOwnProperty.call(seen, k)
      ? false
      : (seen[k] = true);
  });
};

export const softMatch = (s1: string, s2: string) => {
  return (
    s1.toLowerCase().includes(s2.toLowerCase()) ||
    s2.toLowerCase().includes(s1.toLowerCase())
  );
};
