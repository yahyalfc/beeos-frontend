export const USER_KEY = "user-jwt-token";
export const CONNECTED_STATUS = "@appkit/connection_status";
export const USER_ADDRESS = "user-address";
export const REFCODE_COLLECTION = "refcode-collection-";

export enum QUERIES {
  REFERRAL_START = "ref-start",
}

export enum ROUTES {
  HOME = "/",
  PROFILE = "/profile",
  MARKETPLACE = "/marketplace",
  DAPPS = "/dapps",
  STAKING = "/staking",
  BLOG = "/blog",
  ABOUT = "/about",
  COLLECTION = `/collections`,
  SIGN_IN = "/auth/sign-in",
  LAUNCHPAD = "/launchpad",
  TERMS_OF_SERVICE = "/terms",
  PRIVACY_POLICY = "/policy",
  AI_ASSISTANT = "/ai-assistant",
  // MOCKS
  MARIE_BOT = "/dapps/marie_arenavs_bot",
}

export enum SOCIAL_MEDIA {
  INTERNAL = "internal",
  DISCORD = "discord",
  TELEGRAM = "telegram",
  X = "x",
}

export enum SOCIAL_MEDIA_LINKS {
  DISCORD = "https://discord.com/invite/FxVyTPtF7f",
  TELEGRAM = "https://tg.me/beeos_arenavs",
  X = "https://x.com/beeos_arenavs",
}

export enum EXTERNAL_LINKS {
  OPENSEA = "https://opensea.io/collection/beeos",
}

export enum WALLET_STATUSES {
  WHITELIST = "WHITELIST",
  GUARANTEED = "SALE",
  PUBLIC = "PUBLIC",
}

// Alchemy API Configuration
export const ALCHEMY_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? '',
  BASE_URL: 'https://eth-mainnet.g.alchemy.com',
  NFT_API_VERSION: 'v3',
  TESTNET_BASE_URL: 'https://eth-sepolia.g.alchemy.com',
} as const;

// Staking Configuration
export const STAKING_CONFIG = {
  // Contract addresses
  NFT_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_IS_TESTNET === 'true' 
    ? '0x601914abf71cbaDcDCe9A7717594DFB50ED95027' // Testnet
    : '0x5088F6c95Ee2E668907f153f709144ffc92D3abB', // Mainnet
  
  LOCKER_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_IS_TESTNET === 'true'
    ? '0x5027aF793b9f81aAF9A3850979Db905C1E86d2b4' // Testnet
    : '0xf4EF525f4c6e7EbaDba5E6A42B69367faA97FD75', // Mainnet
  
  // Staking durations (in seconds)
  MIN_STAKE_DURATION: 60 * 60 * 24 * 7, // 7 days
  MAX_STAKE_DURATION: 60 * 60 * 24 * 365, // 365 days
  DEFAULT_STAKE_DURATION: 60 * 60 * 24 * 30, // 30 days
  
  // Chain configuration
  IS_TESTNET: process.env.NEXT_PUBLIC_IS_TESTNET === 'true',
  CHAIN_ID: process.env.NEXT_PUBLIC_IS_TESTNET === 'true' ? 11155111 : 1, // Sepolia : Mainnet
  
  // XP Configuration
  BASE_XP_PER_DAY: 10,
} as const;

// API Endpoints
export const ALCHEMY_ENDPOINTS = {
  GET_NFTS_FOR_OWNER: '/getNFTsForOwner',
  GET_NFT_METADATA: '/getNFTMetadata',
  GET_CONTRACT_METADATA: '/getContractMetadata',
  GET_OWNERS_FOR_CONTRACT: '/getOwnersForContract',
  GET_FLOOR_PRICE: '/getFloorPrice',
} as const;

// Query Keys for React Query
export const STAKING_QUERY_KEYS = {
  USER_NFTS: 'user-nfts',
  STAKED_NFTS: 'staked-nfts',
  STAKING_STATS: 'staking-stats',
  NFT_METADATA: 'nft-metadata',
  CONTRACT_METADATA: 'contract-metadata',
  BATCH_NFT_METADATA: 'batch-nft-metadata',
  COLLECTION_STATS: 'collection-stats',
  VALIDATE_OWNERSHIP: 'validate-ownership',
} as const;
