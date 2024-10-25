"use client";

import UserBaseInfo from "@/components/user/details/UserBaseInfo";
import UserTabs from "@/components/user/details/UserTabs";
import { useParams } from "next/navigation";

export default function UserDetails() {
  const params = useParams<{ addr: string }>();
  const addr = params.addr;
  return (
    <div className="flex justify-center items-start gap-6">
      <UserBaseInfo address={addr} />
      <div className="flex-1 grow shrink basis-0 self-stretch flex-col justify-start items-start gap-6 flex">
        <UserTabs address={addr} />
      </div>
    </div>
  );
}
