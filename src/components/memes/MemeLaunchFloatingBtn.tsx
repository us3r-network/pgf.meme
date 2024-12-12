"use client";

import { useState } from "react";
import { motion, AnimatePresence, useAnimate } from "motion/react";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  CreateMemeWithTwitter,
  CreateMemeWithWarpcast,
} from "./create/CreateMemeWithBot";
import { CreateMemeButton } from "./create/CreateMemeButton";

export default function MemeLaunchFloatingBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [scope, animate] = useAnimate();

  const menuItems = [
    <CreateMemeButton />,
    <CreateMemeWithTwitter />,
    <CreateMemeWithWarpcast />,
  ];

  return (
    <div className="relative w-[100px] h-[100px]">
      {/* Secondary Buttons */}
      <AnimatePresence>
        {isOpen && (
          <>
            {menuItems.map((item, index) => {
              const angles = [-20, 45, 110]; // in degrees
              const distances = [90, 90, 90]; // in pixels

              const angle = (angles[index] * Math.PI) / 180; // convert to radians
              const distance = distances[index];

              const x = Math.cos(angle) * -distance; // Negative to move towards left
              const y = Math.sin(angle) * -distance; // Negative to move upwards

              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, x, y }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.05,
                  }}
                  className={cn("absolute top-[25px] left-[25px]")}
                >
                  <div
                    className={cn(
                      "z-10 flex items-center justify-center w-[50px] h-[50px] rounded-full hover:scale-105 transition-transform overflow-hidden",
                      "bg-white text-black border-2 border-primary",
                      "hover:bg-pink-100 transition-colors",
                      "text-sm font-bold"
                    )}
                  >
                    {item}
                  </div>
                </motion.div>
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.div
        ref={scope}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        style={{
          boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
        className={cn(
          "z-20 w-full h-full flex flex-col items-center justify-center  rounded-full cursor-pointer",
          "bg-primary text-white",
          "hover:bg-primary/90 transition-colors"
          // box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25)
          // "shadow-xl"
        )}
      >
        <Rocket className="w-8 h-8 mb-1" />
        <span className="text-xs font-bold">Token</span>
        <span className="text-xs font-bold">Launch</span>
      </motion.div>
    </div>
  );
}
