export const parseCount = (count: string) => {
  const numberMatch = count.match(/\d+/g);
  const suffixMatch = count.match(/[^\d]+/g);

  const number: number = numberMatch ? parseInt(numberMatch.join(''), 10) : 0;
  const suffix: string = suffixMatch ? suffixMatch.join('') : '';

  return {number, suffix};
};
