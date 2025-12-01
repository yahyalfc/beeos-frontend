import {
  type AlchemyNFT,
  type ProcessedNFT,
  type AlchemyNFTsResponse,
  type AlchemyError,
  NFTRarity,
  RARITY_MULTIPLIERS,
  isAlchemyError,
} from "@/types/staking";
import { ALCHEMY_CONFIG, STAKING_CONFIG } from "@/utils/constants";

export class AlchemyService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = ALCHEMY_CONFIG.API_KEY;
    this.baseUrl = STAKING_CONFIG.IS_TESTNET
      ? ALCHEMY_CONFIG.TESTNET_BASE_URL
      : ALCHEMY_CONFIG.BASE_URL;

    if (!this.apiKey) {
      throw new Error("Alchemy API key is required");
    }
  }

  /**
   * Get all NFTs for a wallet address with pagination handling
   */
  async getAllNFTsForOwner(ownerAddress: string): Promise<ProcessedNFT[]> {
    const allNFTs: ProcessedNFT[] = [];
    let pageKey: string | undefined;

    do {
      const response = await this.getNFTsForOwner(ownerAddress, pageKey);

      const { ownedNfts } = response;
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (ownedNfts) {
        const processedNFTs = ownedNfts
          .filter(
            (nft) =>
              nft.contract.address.toLowerCase() ===
              STAKING_CONFIG.NFT_CONTRACT_ADDRESS.toLowerCase()
          )
          .map((nft) => this.processNFT(nft, ownerAddress));

        allNFTs.push(...processedNFTs);
      }

      // eslint-disable-next-line prefer-destructuring
      pageKey = response.pageKey;
    } while (pageKey);

    return allNFTs;
  }

  /**
   * Get NFTs for owner with pagination support
   */
  private async getNFTsForOwner(
    ownerAddress: string,
    pageKey?: string
  ): Promise<AlchemyNFTsResponse> {
    const url = `${this.baseUrl}/nft/v3/${this.apiKey}/getNFTsForOwner`;
    const params = new URLSearchParams({
      owner: ownerAddress,
      "contractAddresses[]": STAKING_CONFIG.NFT_CONTRACT_ADDRESS,
      withMetadata: "true",
      ...(pageKey && { pageKey }),
    });

    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      throw new Error(
        `Alchemy API error: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as AlchemyNFTsResponse | AlchemyError;

    if (isAlchemyError(data)) {
      throw new Error(`Alchemy API error: ${data.error.message}`);
    }

    return data;
  }

  /**
   * Get NFT metadata by contract address and token ID
   */
  async getNFTMetadata(
    contractAddress: string,
    tokenId: string
  ): Promise<AlchemyNFT | null> {
    const url = `${this.baseUrl}/nft/v3/${this.apiKey}/getNFTMetadata`;
    const params = new URLSearchParams({
      contractAddress,
      tokenId,
      tokenType: "ERC721",
    });

    try {
      const response = await fetch(`${url}?${params}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(
          `Alchemy API error: ${response.status} ${response.statusText}`
        );
      }

      const data = (await response.json()) as AlchemyNFT | AlchemyError;

      if (isAlchemyError(data)) {
        throw new Error(`Alchemy API error: ${data.error.message}`);
      }

      return data;
    } catch (error) {
      console.error(
        `Error fetching NFT metadata for ${contractAddress}:${tokenId}:`,
        error
      );
      return null;
    }
  }

  /**
   * Process raw Alchemy NFT data into our application format
   */
  processNFT(alchemyNFT: AlchemyNFT, ownerAddress: string): ProcessedNFT {
    const { tokenId } = alchemyNFT;
    const name =
      alchemyNFT.name ?? alchemyNFT.raw?.metadata?.name ?? `BeeOS #${tokenId}`;
    const description =
      alchemyNFT.description ?? alchemyNFT.raw?.metadata?.description;

    // Get image URL with fallback priority
    const image = this.getImageUrl(alchemyNFT);

    // Determine rarity from attributes
    const rarity = this.determineRarity(alchemyNFT);

    // Calculate XP per day based on rarity
    const xpPerDay =
      // eslint-disable-next-line security/detect-object-injection
      RARITY_MULTIPLIERS[rarity] * STAKING_CONFIG.BASE_XP_PER_DAY;

    return {
      id: `${alchemyNFT.contract.address}-${tokenId}`,
      tokenId,
      name,
      description,
      image,
      rarity,
      contractAddress: alchemyNFT.contract.address,
      owner: ownerAddress,
      isStaked: false, // This will be updated based on contract state
      xpPerDay,
      totalXpEarned: 0,
    };
  }

  /**
   * Get the best available image URL from Alchemy NFT data
   */
  private getImageUrl(alchemyNFT: AlchemyNFT): string {
    // Priority order for image URLs
    const imageOptions = [
      alchemyNFT.image?.cachedUrl,
      alchemyNFT.image?.pngUrl,
      alchemyNFT.image?.thumbnailUrl,
      alchemyNFT.raw?.metadata?.image,
    ].filter(Boolean);

    if (imageOptions.length > 0) {
      return imageOptions[0]!;
    }

    // Fallback to a placeholder or default image
    return `/api/placeholder/nft/${alchemyNFT.tokenId}`;
  }

  /**
   * Determine NFT rarity from attributes
   */
  private determineRarity(alchemyNFT: AlchemyNFT): NFTRarity {
    const attributes = alchemyNFT.raw?.metadata?.attributes;

    if (!attributes || !Array.isArray(attributes)) {
      return NFTRarity.COMMON;
    }

    // Look for rarity attribute
    const rarityAttribute = attributes.find(
      (attr) =>
        attr.trait_type.toLowerCase() === "rarity" ||
        attr.trait_type.toLowerCase() === "tier"
    );

    if (rarityAttribute) {
      const rarityValue = String(rarityAttribute.value).toLowerCase();

      if (
        rarityValue.includes("mythic") ||
        rarityValue.includes("legendary+")
      ) {
        return NFTRarity.MYTHIC;
      }
      if (rarityValue.includes("legendary") || rarityValue.includes("epic")) {
        return NFTRarity.LEGENDARY;
      }
      if (rarityValue.includes("rare") || rarityValue.includes("uncommon")) {
        return NFTRarity.RARE;
      }
    }

    // Fallback: determine rarity based on attribute count or other factors
    const attributeCount = attributes.length;

    if (attributeCount >= 8) {
      return NFTRarity.MYTHIC;
    }
    if (attributeCount >= 6) {
      return NFTRarity.LEGENDARY;
    }
    if (attributeCount >= 4) {
      return NFTRarity.RARE;
    }

    return NFTRarity.COMMON;
  }

  /**
   * Get contract metadata
   */
  async getContractMetadata(contractAddress: string) {
    const url = `${this.baseUrl}/nft/v3/${this.apiKey}/getContractMetadata`;
    const params = new URLSearchParams({
      contractAddress,
    });

    try {
      const response = await fetch(`${url}?${params}`);

      if (!response.ok) {
        throw new Error(
          `Alchemy API error: ${response.status} ${response.statusText}`
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await response.json();
    } catch (error) {
      console.error(
        `Error fetching contract metadata for ${contractAddress}:`,
        error
      );
      return null;
    }
  }

  /**
   * Get floor price for a collection
   */
  async getFloorPrice(contractAddress: string) {
    const url = `${this.baseUrl}/nft/v3/${this.apiKey}/getFloorPrice`;
    const params = new URLSearchParams({
      contractAddress,
    });

    try {
      const response = await fetch(`${url}?${params}`);

      if (!response.ok) {
        throw new Error(
          `Alchemy API error: ${response.status} ${response.statusText}`
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await response.json();
    } catch (error) {
      console.error(
        `Error fetching floor price for ${contractAddress}:`,
        error
      );
      return null;
    }
  }
}
