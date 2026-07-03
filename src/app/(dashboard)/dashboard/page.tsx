"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import StatCard from "@/components/stat-card";
import DataTable, { type Column } from "@/components/data-table";
import { StatsGridSkeleton } from "@/components/loading-skeleton";
import { dashboardStats, recentApplications } from "@/lib/mock-data";
import type { Application } from "@/lib/types";

// ─── Table column definitions ────────────────────────────────
const columns: Column<Application>[] = [
  { key: "nurse", label: "Nurse" },
  { key: "position", label: "Position" },
  { key: "submitted", label: "Submitted" },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span
        className={`
          inline-block px-3 py-0.5 rounded-full text-xs font-medium
          ${
            row.status === "Pending"
              ? "bg-amber-50 text-amber-700"
              : row.status === "Approved"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
          }
        `}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "action",
    label: "Action",
    render: (row) => (
      <Link
        href={`/nurse-management/${row.id}`}
        className="inline-block px-5 py-1.5 rounded-full bg-primary text-white text-xs font-medium
                   hover:bg-primary-light transition-colors duration-200"
      >
        Review
      </Link>
    ),
  },
];

/**
 * Dashboard page — main overview with stats and recent applications table.
 */
export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* ── Stat Cards ────────────────────────────────────────── */}
      {loading ? (
        <StatsGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {dashboardStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      )}

      {/* ── Recent Applications Table ─────────────────────────── */}
      <DataTable<Application>
        title="Recent Applications"
        columns={columns}
        data={recentApplications}
        searchableFields={["nurse", "position", "status"]}
        loading={loading}
      />
    </div>
  );
}
