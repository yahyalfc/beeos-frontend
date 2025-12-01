import { type THREES_NAMES_CHECK } from "@/utils/mint.constants";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_MINT_URL;

export const checkMerkleList = async ({
  wallet,
  treeName,
}: {
  wallet: string;
  treeName: THREES_NAMES_CHECK;
}): Promise<{ whitelisted: boolean }> => {
  const response = await fetch(
    `${API_BASE_URL}/whitelists/check-merkle-whitelist?treeName=${treeName}&wallet=${wallet}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to check merkle list");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json();
};

export const getMerkleProof = async ({
  wallet,
  treeName,
}: {
  wallet: string;
  treeName: THREES_NAMES_CHECK;
}): Promise<{ proof: [] }> => {
  const response = await fetch(
    `${API_BASE_URL}/whitelists/get-merkle-proof?treeName=${treeName}&wallet=${wallet}`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get merkle proof");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json();
};
