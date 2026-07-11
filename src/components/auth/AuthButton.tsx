"use client";

import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function AuthButton({ children, className, isLoading, disabled, ...props }: AuthButtonProps) {
  return (
    <button
      className={cn(
        "w-full bg-[#112349] hover:bg-[#112349]/90 text-white rounded-full py-3 px-4 font-medium transition-colors flex items-center justify-center gap-2 mt-2",
        (isLoading || disabled) && "opacity-70 cursor-not-allowed",
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
