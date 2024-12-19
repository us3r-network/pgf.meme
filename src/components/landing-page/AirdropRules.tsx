"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const menuItems = [
  {
    title: "DegenPad Tipping",
    content: "Receive $CAST at a 1:2 ratio for every Degen tipped on DegenPad.",
  },
  {
    title: "DegenCast V1 Beta",
    content: "Early participants get 1,000 $CAST as a thank-you reward.",
  },
  {
    title: "Token Creator",
    content: "Earn 5 $CAST for every token launched via Clanker or Larry.",
  },
  {
    title: "Degen Token Holder",
    content: "Claim $CAST at a 1:1 ratio based on your Degen holdings.",
  },
  {
    title: "Farcaster Wallet Building",
    content:
      "Link your Farcaster account to a Solana wallet to receive the same amount of $CAST you already claimed on Base, doubling your rewards!",
  },
] as const;

export default function AirdropRules() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="w-full h-fit flex flex-col md:flex-row gap-3">
      {/* Menu Buttons */}
      <div className="flex-1 flex flex-col gap-3 max-md:w-full">
        {menuItems.map((item, idx) => (
          <div className="flex-1 flex flex-col gap-3 max-md:w-full" key={idx}>
            <motion.button
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "py-6 px-12 text-left rounded-lg transition-colors border-primary border-4 box-border text-2xl font-bold",
                "max-md:p-6",
                " focus-visible:outline-none focus-visible:ring-2 ",
                activeIdx === idx ? "bg-primary text-white " : "bg-[#FFFACD]"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.title}
            </motion.button>

            {activeIdx === idx && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 248 }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-4 border-primary bg-white rounded-lg overflow-hidden w-full hidden max-md:flex"
              >
                <div className="w-full h-full p-6 box-border flex items-center justify-center text-[20px] font-normal lenading-[140%]">
                  {item.content}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Content Panel */}
      <motion.div
        className="flex-1 border-4 border-primary bg-white rounded-lg overflow-hidden max-md:hidden"
        layout
      >
        <AnimatePresence mode="wait">
          {menuItems.map(
            (item, idx) =>
              activeIdx === idx && (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full px-12 py-8 box-border flex items-center justify-center text-[36px] font-normal lenading-[140%]"
                >
                  {item.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
