"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import StatCard from "@/components/stat-card";
import ShiftCardComponent from "@/components/shift-card";
import ShiftDetailModal from "@/components/shift-detail-modal";
import { StatsGridSkeleton } from "@/components/loading-skeleton";
import { shiftManagementStats, mockShiftCards } from "@/lib/mock-data";
import type { ShiftCard, ShiftFilterTab } from "@/lib/types";
import {
  useGetAllShiftsAssignmentsQuery,
  useGetSingleShiftAssignmentQuery,
} from "@/redux/features/shifts/shiftsAPI";

/** Filter tab definitions */
const tabs: { key: ShiftFilterTab; label: string }[] = [
  { key: "in-progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

/**
 * Shift Management page.
 * Shows stat cards, filter tabs (In Progress / Completed), "+ Add Shift" button,
 * and a responsive card grid of shift cards. Clicking a card opens a detail modal.
 */
export default function ShiftManagementPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ShiftFilterTab>("in-progress");
  const [selectedShift, setSelectedShift] = useState<ShiftCard | null>(null);

  const { data } = useGetAllShiftsAssignmentsQuery(undefined);
  const { data: singleShiftData } = useGetSingleShiftAssignmentQuery(2);

  console.log({ data });
  console.log({ singleShiftData });

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter shifts based on active tab
  const filteredShifts = useMemo(
    () => mockShiftCards.filter((s) => s.status === activeTab),
    [activeTab],
  );

  return (
    <div className='space-y-6'>
      {/* ── Stat Cards ────────────────────────────────────────── */}
      {loading ? (
        <StatsGridSkeleton />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
          {shiftManagementStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      )}

      {/* ── Filter Tabs + Add Shift Button ────────────────────── */}
      {!loading && (
        <div className='flex items-center justify-between flex-wrap gap-3'>
          {/* Tabs */}
          <div className='flex items-center gap-2'>
            {tabs.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
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

          {/* Add Shift Button */}
          <Link
            href='/shift-management/add'
            className='inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white
                       text-sm font-medium hover:bg-primary-light transition-colors duration-200 shadow-md'
          >
            <Plus size={16} />
            Add Shift
          </Link>
        </div>
      )}

      {/* ── Shift Cards Grid ──────────────────────────────────── */}
      {loading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className='bg-surface rounded-xl border border-border shadow-card overflow-hidden'
            >
              <div className='skeleton h-40 rounded-none' />
              <div className='p-4 space-y-3'>
                <div className='skeleton h-4 w-32' />
                <div className='skeleton h-3 w-20' />
                <div className='skeleton h-3 w-40' />
                <div className='skeleton h-5 w-16' />
              </div>
            </div>
          ))}
        </div>
      ) : filteredShifts.length === 0 ? (
        /* Empty state */
        <div className='bg-surface rounded-xl border border-border shadow-card p-16 text-center'>
          <div className='flex flex-col items-center gap-3 text-text-muted'>
            <svg
              width='48'
              height='48'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect x='3' y='4' width='18' height='18' rx='2' />
              <path d='M16 2v4M8 2v4M3 10h18' />
            </svg>
            <p className='text-sm font-medium'>No shifts found</p>
            <p className='text-xs'>
              There are no{" "}
              {activeTab === "in-progress" ? "in-progress" : "completed"} shifts
              to display.
            </p>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {filteredShifts.map((shift) => (
            <ShiftCardComponent
              key={shift.id}
              shift={shift}
              onClick={setSelectedShift}
            />
          ))}
        </div>
      )}

      {/* ── Shift Detail Modal ────────────────────────────────── */}
      {selectedShift && (
        <ShiftDetailModal
          shift={selectedShift}
          onClose={() => setSelectedShift(null)}
        />
      )}
    </div>
  );
}
