"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ToggleOption = {
  value: any;
  label: string;
  icon?: React.ReactNode;
};
interface ToggleProps {
  value: any;
  options: Array<ToggleOption>;
  onChange?: (value: any) => void;
  disabledValues?: any[];
  onClickDisableOption?: (opt: ToggleOption) => void;
}

export default function ButtonToggle({
  value,
  options,
  onChange,
  disabledValues,
  onClickDisableOption,
}: ToggleProps) {
  const selected = value || options[0].value;

  const handleClick = (value: any) => {
    onChange && onChange(value);
  };

  return (
    <div className="flex rounded-lg bg-primary p-1 w-full h-[68px] max-sm:h-[42px]">
      {options.map((option) => (
        <button
          key={option.value}
          // disabled={disabledValues?.includes(option.value)}
          onClick={() => {
            if (disabledValues?.includes(option.value)) {
              onClickDisableOption && onClickDisableOption(option);
            } else {
              handleClick(option.value);
            }
          }}
          className={cn(
            "flex-1 text-[36px] font-bold rounded-md transition-colors flex justify-center items-center gap-2",
            "max-sm:text-base",
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
