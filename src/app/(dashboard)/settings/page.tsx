"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useGetSettingContentQuery } from "@/redux/features/settings/settingsAPI";

// ─── Settings menu items ─────────────────────────────────────
const settingsItems = [
  { label: "Personal Information", href: "/settings/personal-information" },
  { label: "Change Password", href: "/settings/change-password" },
  { label: "Terms & Conditions", href: "/settings/terms-conditions" },
  { label: "Privacy Policy", href: "/settings/privacy-policy" },
  { label: "About Us", href: "/settings/about-us" },
];

export default function SettingsPage() {
  const { data } = useGetSettingContentQuery(undefined);

  console.log("Settings content data:", data);

  return (
    <div className='animate-fade-in'>
      <div className='bg-surface rounded-xl border border-border shadow-card overflow-hidden'>
        {/* Header */}
        <div className='px-6 sm:px-8 pt-6 pb-4 border-b border-border'>
          <h2 className='text-lg font-bold text-text-primary'>Settings</h2>
        </div>

        {/* Menu Items */}
        <div className='p-6 sm:p-8 space-y-4'>
          {settingsItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='flex items-center justify-between px-5 py-4 rounded-lg
                         bg-blue-50/60 border border-blue-100 text-text-primary
                         hover:bg-blue-50 hover:border-blue-200 hover:shadow-sm
                         transition-all duration-200 group'
            >
              <span className='text-sm font-medium'>{item.label}</span>
              <ChevronRight
                size={18}
                className='text-text-muted group-hover:text-primary group-hover:translate-x-0.5
                           transition-all duration-200'
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
