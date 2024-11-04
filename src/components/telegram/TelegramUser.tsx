"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type User } from "@telegram-apps/sdk-react";

export default function TelegramUser({ user }: { user: any }) {
  if (!user) return null;
  return (
    <div className="flex-row items-center gap-2">
      <Avatar className="w-6 h-6 rounded-full">
        <AvatarImage src={user.photoUrl} />
        <AvatarFallback className="rounded-full">^_^</AvatarFallback>
      </Avatar>
      <div className="font-bold capitalize">{user.username}</div>
    </div>
  );
}
