import type { Metadata } from "next";
import MemeDetails from "@/components/memes/details/MemeDetails";
import { getMeme } from "@/services/meme/api";
import { ApiRespCode } from "@/services/types";
import { CAST_TOKEN_ADDRESS } from "@/constants";

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  const addr = CAST_TOKEN_ADDRESS;
  if (!addr) {
    return {
      title: "Cast ($CAST)",
    };
  }

  // fetch data
  try {
    const resp = await getMeme({
      address: addr,
    });
    const { code, data, msg } = resp.data || {};

    if (code !== ApiRespCode.SUCCESS) {
      throw new Error(msg);
    }

    const title = `${data.name}  ($${data.symbol})`;
    const description = data.description || "";
    const image = data.image || "";
    return {
      title: title,
      description,
      openGraph: {
        images: [image],
      },
    };
  } catch (error) {
    return {
      title: "Cast ($CAST)",
    };
  }
}

export default async function MemePage() {
  const addr = CAST_TOKEN_ADDRESS;
  if (!addr) {
    return null;
  }
  return <MemeDetails addr={addr} />;
}
