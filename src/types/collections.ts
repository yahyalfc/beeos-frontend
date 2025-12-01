import { z } from "zod";

export interface CheckUserStatusRes {
  projectId: string;
  walletAddress?: string;
}

export enum BLOCKCHAINS {
  ETHEREUM = "ethereum",
  POLYGON = "polygon",
  BSC = "bsc",
  ARBITRUM = "arbitrum",
  OPTIMISM = "optimism",
  AVALANCHE = "avalanche",
  FANTOM = "fantom",
  SOLANA = "solana",
  CARDANO = "cardano",
  TEZOS = "tezos",
  FLOW = "flow",
  NEAR = "near",
  APTOS = "aptos",
  SUI = "sui",
  BASE = "base",
  ZKSYNC = "zksync",
  LINEA = "linea",
  SCROLL = "scroll",
}

export const SocialsSchema = z.object({
  twitter: z.string(),
  telegram: z.string(),
  discord: z.string(),
  website: z.string(),
});

export enum PROJECT_STATUSES {
  UPCOMING = "upcoming",
  QUESTING = "questing",
  MINT = "mint",
  FINISHED = "finished",
}

export const CollectionSchema = z.object({
  id: z.uuid(),
  display: z.boolean(),
  name: z.string().min(1),
  description: z.string(),
  contractAddress: z.string(),
  nftPrice: z.string().regex(/^\d+$/, "Must be a valid wei amount"),
  blockchain: z.enum([...Object.values(BLOCKCHAINS)]),
  endTime: z.string().pipe(z.iso.datetime()),
  imageUrl: z.string(),
  bannerUrl: z.string(),
  status: z.object({
    statusName: z.enum([...Object.values(PROJECT_STATUSES)]),
    startsAt: z.string().pipe(z.iso.datetime()),
    endsAt: z.string().pipe(z.iso.datetime()),
  }),
  amountNFT: z.number().int().positive(),
  socials: SocialsSchema,
  phases: z.array(z.string()),
  updatedAt: z.string().pipe(z.iso.datetime()),
  createdAt: z.string().pipe(z.iso.datetime()),
});

export const CollectionsSchema = z.array(CollectionSchema);

// Infer TypeScript type from Zod schema
export type Collection = z.infer<typeof CollectionSchema>;
export type CollectionsArray = z.infer<typeof CollectionsSchema>;
export type Socials = z.infer<typeof SocialsSchema>;
