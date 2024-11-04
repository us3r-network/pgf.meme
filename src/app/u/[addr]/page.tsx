"use client";

import UserBaseInfo from "@/components/user/details/UserBaseInfo";
import UserTabs from "@/components/user/details/UserTabs";
import { useParams } from "next/navigation";
import { isMobile } from "react-device-detect";

export default function UserDetails() {
  const params = useParams<{ addr: string }>();
  const addr = params.addr;
  if (isMobile)
    return (
      <div className="flex-col justify-start items-start gap-6 flex">
        <UserBaseInfo address={addr} />
        <UserTabs address={addr} />
      </div>
    );
  else
    return (
      <div className="flex flex-row justify-center items-start gap-6">
        <div className="w-[400px]">
          <UserBaseInfo address={addr} />
        </div>
        <div className="flex-1">
          <UserTabs address={addr} />
        </div>
      </div>
    );
}
