import { MAIN_TITLES_ANIMATION_CONFIG } from "../constants";

export const MAIN_ASSISTANTS_ACTIONS_ANIMATION_CONFIG = {
  ...MAIN_TITLES_ANIMATION_CONFIG,
  descriptiontDuration: 0.6,
  buttonDuration: 0.65,
  scrollMultiplier: 1.85,
  animationDuration: 0.65,
} as const;

interface AssistantBenefit {
  id: number;
  text: string;
}

export const assistantsBenefits: AssistantBenefit[] = [
  {
    id: 1,
    text: "Real-time scans of floors, volume, liquidity, holders, and whale flows across major NFT markets.",
  },
  {
    id: 2,
    text: "Dynamic BeeScore for each collection and wallet — risk, momentum, and upside in one number.",
  },
  {
    id: 3,
    text: "Trade inside the agent: buy, list, and sell NFTs with cross-market execution.",
  },
  {
    id: 4,
    text: "PnL/ROI tracking by wallet, collection, and deal; shareable performance reports.",
  },
];
