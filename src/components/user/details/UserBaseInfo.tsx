"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import useLoadEnsProfile from "@/hooks/user/useLoadEnsProfile";
import { shortPubKey } from "@/lib/shortAddress";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserBaseInfo({ address }: { address: string }) {
  const { toast } = useToast();
  const { ensProfile, loadEnsProfile, pending } = useLoadEnsProfile({
    address,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      loadEnsProfile();
    }
  }, [mounted]);
  return (
    <Card className="w-[400px] ">
      <CardContent className="w-full flex-col justify-start items-start gap-6 flex">
        <Avatar className="w-full h-full rounded-[20px]">
          <AvatarImage src={ensProfile?.avatar} />
          <AvatarFallback className="rounded-[20px]">^_^</AvatarFallback>
        </Avatar>
        <div className="text-primary text-4xl font-bold leading-[50.40px] capitalize">
          {!pending && (ensProfile?.displayName || "")}
        </div>

        <div className="w-fulll flex self-stretch justify-between items-center gap-6">
          <div className="text-secondary text-base font-bold  capitalize leading-relaxed">
            Wallet Aderess
          </div>
          <div className="grow shrink basis-0 text-right text-[#16181d] text-base font-bold  leading-snug">
            {shortPubKey(address)}
          </div>
          <Copy
            className=" cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(address);
              toast({
                title: "Address copied",
                description: address,
              });
            }}
          />
        </div>

        {/* <div className="self-stretch justify-start items-center gap-10 inline-flex">
        <Button
          className="grow shrink basis-0 h-12 px-4 py-3 bg-[#16181d] rounded-[30px] justify-center items-center gap-2.5 flex"
          onClick={() => {
            const host = window.location.origin;
            const url = `${host}/u/${address}`;
            navigator.clipboard.writeText(url);
            toast({
              title: "URL copied",
              description: url,
            });
          }}
        >
          <div className="text-[#fefaf6] text-xl font-bold">
            Earn by Sharing
          </div>
        </Button>
      </div> */}
      </CardContent>
    </Card>
  );
}
