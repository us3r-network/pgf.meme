import { NextRequest } from "next/server";

const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY || "";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const hash = searchParams.get("hash");

  const url = `https://api.neynar.com/v2/farcaster/cast?identifier=${hash}&type=hash`;
  const options = {
    method: "GET",
    headers: { accept: "application/json", "x-api-key": NEYNAR_API_KEY },
  };
  const response = await fetch(url, options);

  const data = await response.json();
  return Response.json(data);
}
