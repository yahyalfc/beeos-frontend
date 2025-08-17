type WeiValue = string | number | bigint;

const WEI_PER_ETH = BigInt(10 ** 18);
const DEFAULT_DECIMAL_PLACES = 18;

interface ConversionOptions {
  decimalPlaces?: number;
  removeTrailingZeros?: boolean;
}

const isValidWeiValue = (value: WeiValue): boolean => {
  if (typeof value === "bigint") return true;
  if (typeof value === "number") return Number.isFinite(value) && value >= 0;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed !== "" && /^\d+$/.test(trimmed);
  }
  return false;
};

const toBigInt = (value: WeiValue): bigint => {
  if (typeof value === "bigint") return value;
  if (typeof value === "number") return BigInt(Math.floor(value));
  return BigInt(value);
};

const formatDecimalString = (
  integerPart: string,
  decimalPart: string,
  options: ConversionOptions
): string => {
  const { decimalPlaces = DEFAULT_DECIMAL_PLACES, removeTrailingZeros = true } =
    options;

  let truncatedDecimal = decimalPart.slice(0, decimalPlaces);

  if (removeTrailingZeros) {
    // eslint-disable-next-line sonarjs/slow-regex
    truncatedDecimal = truncatedDecimal.replace(/0+$/, "");
  }

  if (!truncatedDecimal) return integerPart;

  return `${integerPart}.${truncatedDecimal}`;
};

export const weiToEth = (
  wei: WeiValue,
  options: ConversionOptions = {}
): string => {
  if (!isValidWeiValue(wei)) {
    throw new TypeError("Invalid Wei value provided");
  }

  const weiBigInt = toBigInt(wei);
  const ethInteger = weiBigInt / WEI_PER_ETH;
  const remainder = weiBigInt % WEI_PER_ETH;

  const integerPart = ethInteger.toString();
  const decimalPart = remainder.toString().padStart(18, "0");

  return formatDecimalString(integerPart, decimalPart, options);
};

export const createWeiToEthConverter = (
  defaultOptions: ConversionOptions = {}
) => {
  return (wei: WeiValue, overrideOptions?: ConversionOptions): string => {
    return weiToEth(wei, { ...defaultOptions, ...overrideOptions });
  };
};

export const weiToEthFixed = (
  wei: WeiValue,
  decimalPlaces = 4
): string => {
  return weiToEth(wei, { decimalPlaces, removeTrailingZeros: false });
};
