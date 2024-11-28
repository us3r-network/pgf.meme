"use client";

import { useCallback, useEffect, useRef, useState } from "react";

var win = window as any;
const insertIntegratedTargetEl = (container: HTMLElement) => {
  if (!win.integratedTerminalTarget) {
    const el = document.createElement("div");
    el.id = "integrated-terminal";
    el.style.width = "100%";
    el.style.height = "100%";
    win.integratedTerminalTarget = el;
  }
  container.innerHTML = "";
  container.appendChild(win.integratedTerminalTarget);
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
    if (win.Jupiter._instance) {
      win.Jupiter.resume();
    }
    win.Jupiter.init({
      displayMode: "integrated",
      integratedTargetId: "integrated-terminal",
      endpoint:
        "https://virulent-summer-paper.solana-mainnet.quiknode.pro/f8673ea444e4b1d54d1c556663d2d00f1f0c437f",
      formProps: {
        initialInputMint: "So11111111111111111111111111111111111111112",
        initialOutputMint: tokenAddress,
      },
    });
    updateJupiterTerminalStyles();
  }, [tokenAddress]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (!isLoaded || !win.Jupiter.init) {
      intervalId = setInterval(() => {
        setIsLoaded(Boolean(win.Jupiter.init));
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

  return (
    <div className="flex flex-col lg:flex-row w-full h-full overflow-auto relative">
      <div className="w-full h-full overflow-hidden flex justify-center">
        {/* Loading state */}
        {!isLoaded ? (
          <div className="h-full w-full  flex items-center justify-center">
            <p className="">Loading...</p>
          </div>
        ) : null}

        <div
          ref={containerRef}
          className={`flex h-full w-full overflow-auto justify-center bg-[#304256] ${
            !isLoaded ? "hidden" : ""
          }`}
        ></div>
      </div>
    </div>
  );
}
