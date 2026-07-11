import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  children: React.ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  backHref,
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-[480px] mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-200/60 relative">
      <div className="flex items-center justify-center mb-8 relative">
        {backHref && (
          <Link
            href={backHref}
            className="absolute left-0 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-slate-50"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        )}
        <h1 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          {title}
        </h1>
      </div>
      
      {subtitle && (
        <p className="text-sm text-slate-500 text-center mb-8">{subtitle}</p>
      )}

      <div>{children}</div>
    </div>
  );
}
