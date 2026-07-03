"use client";

import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  /** Called when the debounced search value changes */
  onSearch: (query: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Debounce delay in ms */
  debounceMs?: number;
}

/**
 * SearchBar — input field with a circular navy search icon button.
 * Debounces input to avoid excessive filtering.
 */
export default function SearchBar({
  onSearch,
  placeholder = "Search...",
  debounceMs = 300,
}: SearchBarProps) {
  const [value, setValue] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    // Clear previous timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Set new debounce timer
    timerRef.current = setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, debounceMs, onSearch]);

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-36 sm:w-48 px-3 py-2 text-sm rounded-lg border border-border
                   bg-surface text-text-primary placeholder:text-text-muted
                   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                   transition-all duration-200"
      />
      <button
        className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center
                   hover:bg-primary-light transition-colors duration-200 shrink-0"
        aria-label="Search"
      >
        <Search size={16} />
      </button>
    </div>
  );
}
