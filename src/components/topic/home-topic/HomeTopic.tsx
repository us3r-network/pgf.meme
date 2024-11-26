"use client";

import { useEffect } from "react";
import useHotTopics from "@/hooks/topic/useHotTopics";
import HomeTopicRender from "./HomeTopicRender";

export default function HomeTopic() {
  const { items, loadItems, loading } = useHotTopics();
  const topic = items[0];
  useEffect(() => {
    loadItems();
  }, []);

  return <HomeTopicRender topic={topic?.topic} />;
}
