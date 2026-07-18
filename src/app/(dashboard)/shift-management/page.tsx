"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import StatCard from "@/components/stat-card";
import ShiftCardComponent from "@/components/shift-card";
import ShiftDetailModal from "@/components/shift-detail-modal";
import DeleteConfirmModal from "@/components/delete-confirm-modal";
import { StatsGridSkeleton } from "@/components/loading-skeleton";
import { shiftManagementStats } from "@/lib/mock-data";
import type { Shift, ShiftFilterTab } from "@/lib/types";
import { useToast } from "@/components/toast";
import {
  useGetAllShiftsAssignmentsQuery,
  useDeleteShiftAssignmentMutation,
} from "@/redux/features/shifts/shiftsAPI";

const tabs: { key: ShiftFilterTab; label: string }[] = [
  { key: "in-progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

export default function ShiftManagementPage() {
  const router = useRouter();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<ShiftFilterTab>("in-progress");
  const [page, setPage] = useState(1);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [shiftToDelete, setShiftToDelete] = useState<Shift | null>(null);

  const { data, isLoading, isFetching } = useGetAllShiftsAssignmentsQuery({
    page,
  });
  const [deleteShift, { isLoading: isDeleting }] =
    useDeleteShiftAssignmentMutation();

  const shifts: Shift[] = data?.data ?? [];
  const meta = data?.meta;

  const handleDeleteConfirm = async () => {
    if (!shiftToDelete) return;
    try {
      await deleteShift(shiftToDelete.id).unwrap();
      addToast("Shift deleted successfully", "success");
      if (selectedShift?.id === shiftToDelete.id) setSelectedShift(null);
      setShiftToDelete(null);
    } catch (err) {
      console.error(err);
      addToast("Failed to delete shift. Please try again.", "error");
    }
  };

  return (
    <div className='space-y-6'>
      {isLoading ? (
        <StatsGridSkeleton />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
          {shiftManagementStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      )}

      {!isLoading && (
        <div className='flex items-center justify-between flex-wrap gap-3'>
          <div className='flex items-center gap-2'>
            {tabs.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setPage(1);
                  }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-primary text-white shadow-md"
                      : "bg-surface text-primary border border-primary/30 hover:bg-primary/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

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

      {isLoading ? (
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
      ) : shifts?.length === 0 ? (
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
        <>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ${
              isFetching ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {shifts?.map((shift) => (
              <ShiftCardComponent
                key={shift.id}
                shift={shift}
                onClick={setSelectedShift}
                onEdit={(s) =>
                  router.push(`/shift-management/add?edit=${s.id}`)
                }
                onDelete={setShiftToDelete}
              />
            ))}
          </div>

          {meta && meta.total_pages > 1 && (
            <div className='flex items-center justify-center gap-2 pt-2'>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={!meta.previous}
                className='px-4 py-2 rounded-full text-sm font-medium border border-border
                           disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-hover'
              >
                Previous
              </button>
              <span className='text-sm text-text-muted'>
                Page {meta.page} of {meta.total_pages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!meta.next}
                className='px-4 py-2 rounded-full text-sm font-medium border border-border
                           disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-hover'
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {selectedShift && (
        <ShiftDetailModal
          shift={selectedShift}
          onClose={() => setSelectedShift(null)}
        />
      )}

      {shiftToDelete && (
        <DeleteConfirmModal
          title='Delete Shift'
          message={`Are you sure you want to delete this ${shiftToDelete.profession} shift on ${shiftToDelete.shift_date}? This action cannot be undone.`}
          loading={isDeleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShiftToDelete(null)}
        />
      )}
    </div>
  );
}
