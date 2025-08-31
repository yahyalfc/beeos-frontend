import { type NextRequest, NextResponse } from "next/server";

import crypto from "crypto";

interface OKXCollectionParams {
  slug: string;
  chain?: string;
}

class OKXBackendClient {
  private readonly apiKey: string;
  private readonly secretKey: string;
  private readonly passphrase: string;
  private readonly baseURL: string;

  constructor() {
    this.apiKey = process.env.OKX_ACCESS_KEY ?? "";
    this.secretKey = process.env.OKX_SECRET_KEY ?? "";
    this.passphrase = process.env.OKX_PASSPHRASE ?? "";
    this.baseURL = "https://web3.okx.com/api/v5/mktplace/nft";
  }

  private generateSignature(timestamp: string, method: string, requestPath: string, body: string): string {
    const prehash = timestamp + method + requestPath + body;
    return crypto
      .createHmac("sha256", this.secretKey)
      .update(prehash)
      .digest("base64");
  }

  async getCollectionStats(params: OKXCollectionParams) {
    const timestamp = (Date.now() / 1000).toFixed(3);
    const method = "GET";
    const requestPath = `/api/v5/mktplace/nft/collection/detail?slug=${params.slug}&chain=${params.chain ?? "eth"}`;
    const body = "";
    
    const signature = this.generateSignature(timestamp, method, requestPath, body);

    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "OK-ACCESS-KEY": this.apiKey,
      "OK-ACCESS-SIGN": signature,
      "OK-ACCESS-TIMESTAMP": timestamp,
      "OK-ACCESS-PASSPHRASE": this.passphrase,
    };

    console.log("Stats request details:", {
      url: `https://web3.okx.com${requestPath}`,
      method,
      headers: {
        ...headers,
        "OK-ACCESS-SIGN": "[REDACTED]",
        "OK-ACCESS-KEY": this.apiKey ? "[SET]" : "[MISSING]",
        "OK-ACCESS-PASSPHRASE": this.passphrase ? "[SET]" : "[MISSING]"
      },
      timestamp,
      prehash: timestamp + method + requestPath + body
    });

    const response = await fetch(`https://web3.okx.com${requestPath}`, {
      method,
      headers,
    });

    console.log("Stats response status:", response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Stats error response:", errorText);
      throw new Error(`OKX API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json() as {
      code: string;
      msg?: string;
      data?: unknown[];
    };
    
    if (data.code !== "0") {
      throw new Error(`OKX API error: ${data.msg ?? "Unknown error"}`);
    }

    return data.data?.[0] ?? null;
  }
}

const okxClient = new OKXBackendClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const chain = searchParams.get("chain");

    if (!slug) {
      return NextResponse.json(
        { error: "Missing required parameter: slug" },
        { status: 400 }
      );
    }

    const statsData = await okxClient.getCollectionStats({ slug, chain: chain ?? undefined });

    if (!statsData) {
      return NextResponse.json(
        { error: "Stats not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(statsData);
  } catch (error) {
    console.error("Error fetching OKX stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats data" },
      { status: 500 }
    );
  }
}
