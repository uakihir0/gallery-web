export function chunk<T extends any[]>(arr: T, size: number) {
  return arr.reduce(
    (newarr, _, i) => (i % size ? newarr : [...newarr, arr.slice(i, i + size)]),
    [] as T[][]
  );
}

export function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (v, k) => k + start);
}
