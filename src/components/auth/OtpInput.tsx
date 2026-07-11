"use client";

import React, { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

export default function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^[0-9]+$/.test(value)) return;

    const newOtp = [...otp];
    // Keep only the last character if multiple are pasted/typed
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const otpString = newOtp.join("");
    if (otpString.length === length && onComplete) {
      onComplete(otpString);
    }

    // Move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current is empty, move to previous and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/[^0-9]/g, "").slice(0, length);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (i < length) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);

    // Focus next empty or last
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    if (newOtp.join("").length === length && onComplete) {
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div className="flex justify-between items-center gap-2 mb-8">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-12 rounded-full border border-slate-300 text-center text-lg font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all bg-white"
          maxLength={2}
        />
      ))}
    </div>
  );
}
