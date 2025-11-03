export const formatPointCount = (points: number): string => {
  if (points < 1000) {
    return points.toString();
  } else if (points < 1000000) {
    // Convert to k format with 2 decimal places
    const kValue = points / 1000;
    return `${kValue.toFixed(2)}k`;
  } else if (points < 1000000000) {
    // Convert to M format with 3 decimal places
    const mValue = points / 1000000;
    return `${mValue.toFixed(3)}M`;
  } else {
    // Convert to B format with 3 decimal places
    const bValue = points / 1000000000;
    return `${bValue.toFixed(3)}B`;
  }
};
