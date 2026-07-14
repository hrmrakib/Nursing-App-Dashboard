"use client";

import type { NurseFilterTab } from "@/lib/types";

interface FilterTabsProps {
  activeTab: NurseFilterTab;
  onTabChange: (tab: NurseFilterTab) => void;
}

const tabs: { key: NurseFilterTab; label: string }[] = [
  { key: "not_submitted", label: "Not Submitted" },
  { key: "pending_review", label: "Pending Review" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

export default function FilterTabs({
  activeTab,
  onTabChange,
}: FilterTabsProps) {
  return (
    <div className='flex items-center gap-2 flex-wrap'>
      {tabs.map((tab) => {
        const active = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`
              px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${
                active
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface text-primary border border-primary/30 hover:bg-primary/5"
              }
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
