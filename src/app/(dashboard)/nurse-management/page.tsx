"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import StatCard from "@/components/stat-card";
import DataTable, { type Column } from "@/components/data-table";
import FilterTabs from "@/components/filter-tabs";
import { StatsGridSkeleton } from "@/components/loading-skeleton";
import {
  nurseManagementStats,
  pendingNurses,
  approvedNurses,
  rejectedNurses,
} from "@/lib/mock-data";
import type { Nurse, NurseFilterTab } from "@/lib/types";

// ─── Column definitions per tab ──────────────────────────────

/** Columns for "Pending Review" tab */
const pendingColumns: Column<Nurse>[] = [
  { key: "name", label: "Nurse" },
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

/** Columns for "Approved" and "Rejected" tabs */
const approvedRejectedColumns: Column<Nurse>[] = [
  { key: "name", label: "Nurse" },
  { key: "role", label: "Role" },
  { key: "assignedFacility", label: "Assigned Facility" },
  {
    key: "documents",
    label: "Documents",
    render: (row) => (
      <span
        className={`
          inline-block px-3 py-0.5 rounded-full text-xs font-medium
          ${
            row.documents === "Verified"
              ? "bg-green-50 text-green-700"
              : row.documents === "Pending"
                ? "bg-amber-50 text-amber-700"
                : "bg-red-50 text-red-700"
          }
        `}
      >
        {row.documents}
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
        View
      </Link>
    ),
  },
];

/**
 * Nurse Management page.
 * Shows stat cards, filter tabs, and a data table that changes
 * columns and data based on the selected filter.
 */
export default function NurseManagementPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<NurseFilterTab>("pending");

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // ─── Data + columns based on active tab ────────────────────
  const { data, columns } = useMemo(() => {
    switch (activeTab) {
      case "pending":
        return { data: pendingNurses, columns: pendingColumns };
      case "approved":
        return { data: approvedNurses, columns: approvedRejectedColumns };
      case "rejected":
        return { data: rejectedNurses, columns: approvedRejectedColumns };
    }
  }, [activeTab]);

  return (
    <div className="space-y-6">
      {/* ── Stat Cards ────────────────────────────────────────── */}
      {loading ? (
        <StatsGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {nurseManagementStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      )}

      {/* ── Filter Tabs ───────────────────────────────────────── */}
      {!loading && (
        <FilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
      )}

      {/* ── Data Table ────────────────────────────────────────── */}
      <DataTable<Nurse>
        title="Recent Applications"
        columns={columns}
        data={data}
        searchableFields={["name", "role", "assignedFacility"]}
        loading={loading}
      />
    </div>
  );
}
