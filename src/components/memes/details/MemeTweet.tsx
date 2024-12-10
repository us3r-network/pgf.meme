import Script from "next/script";
import React from "react";

export default function MemeTweet({ id }: { id: string }) {
  const href = `https://twitter.com/user/status/${id}`;
  return (
    <>
      {" "}
      <blockquote
        className="twitter-tweet"
        data-theme="light" // 可改为 'dark'
      >
        <div className="w-full min-h-[200px] flex flex-col gap-5 justify-center items-center">
          <span>Created from x</span>
          <a
            href={href}
            className="text-center hover:underline "
            target="_blank"
          >
            Loading {href}
          </a>
        </div>
      </blockquote>
      <Script src="https://platform.twitter.com/widgets.js" async />
    </>
  );
}
