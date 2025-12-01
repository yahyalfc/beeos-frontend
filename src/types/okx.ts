import { z } from "zod";

export const OKXWeb3CollectionSchema = z.object({
  contractAddress: z.string(),
  collectionName: z.string(),
  collectionSlug: z.string().optional(),
  logoUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  description: z.string().optional(),
  floorPrice: z.string(),
  floorPriceSymbol: z.string().optional(),
  volume24h: z.string(),
  volumeChange24h: z.string().optional(),
  sales24h: z.string().optional(),
  salesChange24h: z.string().optional(),
  totalSupply: z.string().optional(),
  ownersCount: z.string().optional(),
  listedCount: z.string().optional(),
  avgPrice24h: z.string().optional(),
  marketCap: z.string().optional(),
  chain: z.string(),
  createdTime: z.string().optional(),
  verified: z.boolean().optional(),
  website: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  telegram: z.string().optional(),
  royalty: z.string().optional(),
  // Backward compatibility fields
  collectionId: z.string().optional(),
  logo: z.string().optional(),
  items: z.string().optional(),
  listedItems: z.string().optional(),
  uniqueOwners: z.string().optional(),
  holders: z.string().optional(),
  latestPrice: z.string().optional(),
  usdPrice: z.string().optional(),
  priceChange24h: z.string().optional(),
}).transform((data) => ({
  ...data,
  // Map new fields to old field names for backward compatibility
  collectionId: data.contractAddress,
  logo: data.logoUrl ?? "",
  items: data.totalSupply ?? "0",
  listedItems: data.listedCount ?? "0",
  uniqueOwners: data.ownersCount ?? "0",
  holders: data.ownersCount ?? "0",
  latestPrice: data.floorPrice,
  usdPrice: data.floorPrice,
  priceChange24h: data.volumeChange24h ?? "0",
}));

export const OKXWeb3StatsSchema = z.object({
  contractAddress: z.string(),
  floorPrice: z.string(),
  floorPriceSymbol: z.string().optional(),
  bestOfferPrice: z.string().optional(),
  lastSalePrice: z.string().optional(),
  volume24h: z.string(),
  volumeChange24h: z.string().optional(),
  sales24h: z.string().optional(),
  salesChange24h: z.string().optional(),
  marketCap: z.string().optional(),
  avgPrice24h: z.string().optional(),
  totalSupply: z.string().optional(),
  ownersCount: z.string().optional(),
  listedCount: z.string().optional(),
  listedRate: z.string().optional(),
});

export const OKXWeb3TokenSchema = z.object({
  tokenId: z.string(),
  contractAddress: z.string(),
  tokenName: z.string().optional(),
  tokenDescription: z.string().optional(),
  imageUrl: z.string().optional(),
  animationUrl: z.string().optional(),
  attributes: z.array(z.object({
    traitType: z.string(),
    value: z.string(),
  })).optional(),
  price: z.string().optional(),
  priceSymbol: z.string().optional(),
  owner: z.string().optional(),
  listed: z.boolean().optional(),
});

export const OKXWeb3ApiResponseSchema = z.object({
  code: z.string(),
  msg: z.string(),
  data: z.array(z.unknown()),
});

export type OKXCollection = z.infer<typeof OKXWeb3CollectionSchema>;
export type OKXStats = z.infer<typeof OKXWeb3StatsSchema>;
export type OKXToken = z.infer<typeof OKXWeb3TokenSchema>;
export type OKXApiResponse = z.infer<typeof OKXWeb3ApiResponseSchema>;

export const OKXCollectionSchema = OKXWeb3CollectionSchema;
export const OKXStatsSchema = OKXWeb3StatsSchema;
