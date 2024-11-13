"use client";

import UserBaseInfo from "@/components/user/details/UserBaseInfo";
import UserTabs from "@/components/user/details/UserTabs";
import { useParams } from "next/navigation";

export default function UserDetails() {
  const params = useParams<{ addr: string }>();
  const addr = params.addr;
  return (
    <div className="flex flex-row justify-center items-start gap-6 max-sm:flex-col max-sm:gap-3">
      <div className="w-[30%] max-sm:w-full">
        <UserBaseInfo address={addr} />
      </div>
      <div className="flex-1 max-sm:w-full">
        <UserTabs address={addr} />
      </div>
    </div>
  );
}
