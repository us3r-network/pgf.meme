"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  value: any;
  options: Array<{
    value: any;
    label: string;
    icon?: React.ReactNode;
  }>;
  onChange?: (value: any) => void;
}

export default function ButtonToggle({
  value,
  options,
  onChange,
}: ToggleProps) {
  const selected = value || options[0].value;

  const handleClick = (value: any) => {
    onChange && onChange(value);
  };

  return (
    <div className="flex rounded-lg bg-primary p-1 w-full h-[68px]">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={cn(
            "flex-1 text-[36px] font-bold rounded-md transition-colors flex justify-center items-center gap-2",
            selected === option.value
              ? "bg-white text-foreground"
              : "bg-primary text-primary-foreground"
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
