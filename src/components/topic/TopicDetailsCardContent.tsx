"use client";

import { useEffect } from "react";
import TopicDetailsCard from "@/components/topic/TopicDetailsCard";
import useLoadTopic from "@/hooks/topic/useLoadTopic";
import { Skeleton } from "@/components/ui/skeleton";
export default function TopicDetailsCardContent({
  topicId,
}: {
  topicId: number;
}) {
  const { topic, loadTopic, pending } = useLoadTopic({ id: topicId });

  useEffect(() => {
    loadTopic();
  }, []);
  if (pending || !topic) {
    return <Skeleton className="rounded-2xl w-full h-[508px]" />;
  }
  return <TopicDetailsCard topic={topic} />;
}
