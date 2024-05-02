export const generateUniqueRandomIndexes = (
    count: number,
    maxIndex: number
  ): number[] => {
    const indexes = new Set<number>();
    while (indexes.size < count) {
      indexes.add(Math.floor(Math.random() * maxIndex));
    }
    return Array.from(indexes);
  };