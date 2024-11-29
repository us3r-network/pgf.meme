"use client";

import { JUPITER_ENDPOINT } from "@/constants/jupiter";
import { useCallback, useEffect, useRef, useState } from "react";

const insertIntegratedTargetEl = (container: HTMLElement) => {
  if (!(window as any).integratedTerminalTarget) {
    const el = document.createElement("div");
    el.id = "integrated-terminal";
    el.style.width = "100%";
    el.style.height = "100%";
    (window as any).integratedTerminalTarget = el;
  }
  container.innerHTML = "";
  container.appendChild((window as any).integratedTerminalTarget);
};
// jupiter-terminal
const updateJupiterTerminalStyles = () => {
  const target = document.getElementById("jupiter-terminal");
  if (target) {
    const parent = target.parentElement;
    if (parent) {
      parent.style.zIndex = "0";
    }
    return true;
  }
  return false;
};
export default function MemeSwapWithJupiter({
  token,
}: {
  token: {
    address: string;
  };
}) {
  const tokenAddress = token.address;
  const [isLoaded, setIsLoaded] = useState(false);

  const launchTerminal = useCallback(async () => {
    if ((window as any).Jupiter._instance) {
      (window as any).Jupiter.resume();
    }
    (window as any).Jupiter.init({
      displayMode: "integrated",
      integratedTargetId: "integrated-terminal",
      endpoint: JUPITER_ENDPOINT,
      formProps: {
        initialInputMint: "So11111111111111111111111111111111111111112",
        initialOutputMint: tokenAddress,
      },
    });
  }, [tokenAddress]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (!isLoaded || !(window as any).Jupiter.init) {
      intervalId = setInterval(() => {
        setIsLoaded(Boolean((window as any).Jupiter.init));
      }, 500);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLoaded]);

  const containerRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (isLoaded && containerRef.current) {
        insertIntegratedTargetEl(containerRef.current);
        launchTerminal();
      }
    }, 200);
  }, [isLoaded, launchTerminal]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (isLoaded) {
      intervalId = setInterval(() => {
        const updated = updateJupiterTerminalStyles();
        if (updated) {
          clearInterval(intervalId);
        }
      }, 500);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLoaded]);

  useEffect(() => {
    return () => {
      if ((window as any).Jupiter._instance) {
        (window as any).Jupiter.close();
      }
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full overflow-auto relative">
      <div className="w-full overflow-hidden flex justify-center">
        {/* Loading state */}
        {!isLoaded ? (
          <div className="h-full w-full  flex items-center justify-center">
            <p className="">Loading...</p>
          </div>
        ) : null}

        <div
          ref={containerRef}
          className={`flex w-full overflow-auto justify-center bg-[#304256] ${
            !isLoaded ? "hidden" : ""
          }`}
        ></div>
      </div>
    </div>
  );
}
