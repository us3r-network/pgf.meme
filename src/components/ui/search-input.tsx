import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-full border-4 border-primary text-primary-foreground bg-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          "text-2xl font-bold px-6 py-3 max-sm:text-xs max-sm:px-2 max-sm:py-2  placeholder:text-foreground/30 text-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
