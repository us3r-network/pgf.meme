"use client";

import CopyAddress from "@/components/CopyAddress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import useLoadEnsProfile from "@/hooks/user/useLoadEnsProfile";
import { useEffect, useState } from "react";

export default function UserBaseInfo({ address }: { address: string }) {
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
    <Card className="w-full">
      <CardContent className="w-full flex-col justify-start items-start gap-6 flex max-sm:gap-3">
        <div className="w-full aspect-square">
          <Avatar className="w-full h-full aspect-square rounded-[20px]">
            <AvatarImage src={ensProfile?.avatar} className="object-cover " />
            <AvatarFallback className="rounded-[20px]">^_^</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-primary font-bold">
          {!pending && (ensProfile?.displayName || "")}
        </div>

        <CopyAddress address={address} label="Wallet Aderess" />
      </CardContent>
    </Card>
  );
}
