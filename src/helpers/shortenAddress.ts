export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return "";

  if (address.length <= chars * 2) return address;

  const charCount = Math.max(1, chars);

  const start = address.slice(0, charCount);
  const end = address.slice(-charCount);

  return `${start}...${end}`;
};
