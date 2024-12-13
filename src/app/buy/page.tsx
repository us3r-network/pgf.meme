import type { Metadata, ResolvingMetadata } from "next";
import MemeDetails from "@/components/memes/details/MemeDetails";
import { getMeme } from "@/services/meme/api";
import { ApiRespCode } from "@/services/types";
import { CAST_TOKEN_ADDRESS } from "@/constants";

type Props = {
  params: Promise<{ addr: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const addr = CAST_TOKEN_ADDRESS;
  if (!addr) {
    return {
      title: "$CAST Not Found",
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
      title: "Meme Not Found",
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
