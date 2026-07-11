import React from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] bg-white lg:bg-slate-100">
      {/* Left Panel - Hidden on mobile, takes 50% on desktop */}
      <div className="hidden lg:flex w-1/2 bg-white relative justify-center items-center">
        {/* Logo Card */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col items-center justify-center border border-slate-100">
          {/* Fallback to text if logo is missing, or attempt to load /logo.png */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* The actual logo from screenshot is LAC Staffing */}
            <Image
              src="/logo.png"
              alt="LAC Staffing Logo"
              width={250}
              height={250}
              className="object-contain"
              priority
            />
            {/* Fallback text just in case Image fails */}
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-slate-800 -z-10 text-center">
              LAC STAFFING
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Takes full width on mobile, 50% on desktop */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-slate-100">
        {children}
      </div>
    </div>
  );
}
