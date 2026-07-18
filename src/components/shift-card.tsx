"use client";

import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Pencil,
  Trash2,
  Clock,
  Users,
  AlertCircle,
} from "lucide-react";
import type { Shift } from "@/lib/types";

const statusStyles: Record<string, string> = {
  OPEN: "bg-green-100 text-green-700",
  ASSIGNED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-gray-100 text-gray-600",
  CANCELLED: "bg-red-100 text-red-700",
};

interface ShiftCardProps {
  shift: Shift;
  onClick?: (shift: Shift) => void;
  onEdit?: (shift: Shift) => void;
  onDelete?: (shift: Shift) => void;
}

export default function ShiftCardComponent({
  shift,
  onClick,
  onEdit,
  onDelete,
}: ShiftCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fmt = (t: string) => t.slice(0, 5);

  const imageUrl = shift.facility?.image ?? shift.facility_image ?? null;
  const titleLine =
    [shift.profession, shift.department].filter(Boolean).join(" · ") ||
    shift.facility?.name ||
    "Shift";

  return (
    <div
      className='bg-surface rounded-xl border border-border shadow-card overflow-hidden
                 hover:shadow-md transition-shadow cursor-pointer relative'
      onClick={() => onClick?.(shift)}
    >
      <div className='h-32 bg-surface-alt overflow-hidden'>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt='Facility'
            className='w-full h-full object-cover'
            width={400}
            height={200}
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-text-muted text-xs'>
            No image
          </div>
        )}
      </div>

      <div className='p-4 space-y-2'>
        <div className='flex items-start justify-between gap-2'>
          <div>
            <p className='font-semibold text-sm text-text-primary'>
              {titleLine}
            </p>
            {shift.facility?.name && (
              <p className='text-xs text-text-secondary'>
                {shift.facility.name}
              </p>
            )}
            <p className='text-xs text-text-muted'>{shift.shift_date}</p>
          </div>
          {shift.status && (
            <span
              className={`text-[10px] font-medium px-2 py-1 rounded-full whitespace-nowrap ${
                statusStyles[shift.status] ?? "bg-gray-100 text-gray-600"
              }`}
            >
              {shift.status}
            </span>
          )}
        </div>

        <div className='flex items-center gap-1.5 text-xs text-text-muted'>
          <Clock size={12} />
          {fmt(shift.start_time)} – {fmt(shift.end_time)}
        </div>

        {typeof shift.required_nurses === "number" && (
          <div className='flex items-center gap-1.5 text-xs text-text-muted'>
            <Users size={12} />
            {shift.required_nurses} nurse{shift.required_nurses > 1 ? "s" : ""}{" "}
            needed
            {shift.is_emergency && (
              <span className='inline-flex items-center gap-1 text-accent-red font-medium ml-1'>
                <AlertCircle size={12} /> Urgent
              </span>
            )}
          </div>
        )}

        <div className='flex items-center justify-between pt-1'>
          <p className='text-sm font-semibold text-primary'>
            ${shift.pay_rate}/hr
          </p>
          {typeof shift.estimated_pay === "number" && (
            <p className='text-xs text-text-muted'>
              Est. ${shift.estimated_pay.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <div
        className='absolute top-3 right-3'
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className='w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center
                     shadow-sm border border-border/50'
          aria-label='Shift actions'
        >
          <MoreVertical size={14} />
        </button>

        {menuOpen && (
          <div className='absolute right-0 mt-1 w-32 bg-surface rounded-lg border border-border shadow-lg overflow-hidden z-10'>
            <button
              onClick={() => {
                setMenuOpen(false);
                onEdit?.(shift);
              }}
              className='w-full flex items-center gap-2 px-3 py-2 text-xs text-text-primary hover:bg-surface-hover transition-colors'
            >
              <Pencil size={13} /> Edit
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                onDelete?.(shift);
              }}
              className='w-full flex items-center gap-2 px-3 py-2 text-xs text-accent-red hover:bg-red-50 transition-colors'
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
