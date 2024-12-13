"use client";

import CopyAddress from "@/components/CopyAddress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import useLoadEnsProfile from "@/hooks/user/useLoadEnsProfile";
import { useEffect, useState } from "react";
import DefaultUserAvatar from "../DefaultUserAvatar";
import { OpenLink } from "@/components/OpenLink";

export default function UserBaseInfo({ address }: { address: string }) {
  const { profiles, loadProfiles, pending } = useLoadEnsProfile({
    address,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      loadProfiles();
    }
  }, [mounted]);

  const farcasterProfile = profiles.find((p) => p.platform === "farcaster");
  const lensProfile = profiles.find((p) => p.platform === "lens");
  return (
    <Card className="w-full">
      <CardContent className="w-full flex-col justify-start items-start gap-6 flex max-sm:gap-3">
        <div className="w-full aspect-square">
          <DefaultUserAvatar
            address={address}
            className="w-full h-full aspect-square rounded-[20px]"
          />
          {/* <Avatar className="w-full h-full aspect-square rounded-[20px]">
            <AvatarImage src={ensProfile?.avatar} className="object-cover " />
            <AvatarFallback className="rounded-[20px]">
              <DefaultUserAvatar address={address} />
            </AvatarFallback>
          </Avatar> */}
        </div>
        {/* <div className="text-primary font-bold">
          {!pending && (ensProfile?.displayName || "")}
        </div> */}

        <CopyAddress address={address} label="Wallet Aderess" />
        {farcasterProfile && (
          <OpenLink
            label="Farcaster"
            href={farcasterProfile?.links?.farcaster?.links}
            text={farcasterProfile.displayName}
          />
        )}
        {lensProfile && (
          <OpenLink
            label="Lens"
            href={lensProfile?.links?.lens?.links}
            text={lensProfile.displayName}
          />
        )}
      </CardContent>
    </Card>
  );
}
