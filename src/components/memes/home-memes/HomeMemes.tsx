"use client";

import { useEffect, useState } from "react";
import HomeMemesRender from "./HomeMemesRender";
import useLoadMemes from "@/hooks/meme/useLoadMemes";

export default function HomeMemes() {
  const { items, loading, loadItems } = useLoadMemes();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    loadItems();
  }, [mounted]);

  return <HomeMemesRender memes={items} />;
}
