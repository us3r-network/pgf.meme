"use client";

import UserBaseInfo from "@/components/user/details/UserBaseInfo";
import UserTabs from "@/components/user/details/UserTabs";
import { useParams } from "next/navigation";

export default function UserDetails() {
  const params = useParams<{ addr: string }>();
  const addr = params.addr;
  return (
    <div className="flex flex-row justify-center items-start gap-6 max-sm:flex-col">
      <UserBaseInfo address={addr} />
      <div className="flex-1">
        <UserTabs address={addr} />
      </div>
    </div>
  );
}
