import Script from "next/script";
import React from "react";

export default function MemeTweet({ id }: { id: string }) {
  return (
    <>
      {" "}
      <blockquote
        className="twitter-tweet"
        data-theme="light" // 可改为 'dark'
      >
        <div className="w-full min-h-[200px] flex flex-row justify-center items-center">
          <a
            href={`https://twitter.com/user/status/${id}`}
            className="text-center"
          >
            Loading tweet...
          </a>
        </div>
      </blockquote>
      <Script src="https://platform.twitter.com/widgets.js" async />
    </>
  );
}
