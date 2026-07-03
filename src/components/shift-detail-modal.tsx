"use client";

import { useCallback } from "react";
import {
  X,
  Calendar,
  Clock,
  CalendarDays,
  DollarSign,
  Building2,
  Users,
  Sun,
  UserCheck,
  HeartPulse,
  CheckSquare,
  Award,
  Shirt,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";
import type { ShiftCard } from "@/lib/types";
import { useToast } from "@/components/toast";

interface ShiftDetailModalProps {
  shift: ShiftCard;
  onClose: () => void;
}

/**
 * ShiftDetailModal — overlay modal showing full shift details.
 * Matches the design with facility image, info grid, shift information list,
 * notes section, and edit/delete action buttons.
 */
export default function ShiftDetailModal({ shift, onClose }: ShiftDetailModalProps) {
  const { addToast } = useToast();

  const handleEdit = useCallback(() => {
    addToast("Opening shift editor...", "info");
    onClose();
  }, [addToast, onClose]);

  const handleDelete = useCallback(() => {
    addToast("Shift has been deleted.", "error");
    onClose();
  }, [addToast, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 sm:pt-20 overflow-y-auto">
        <div
          className="bg-surface rounded-2xl shadow-dropdown border border-border w-full max-w-md
                     animate-fade-in overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Close button ──────────────────────────────────── */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur
                       flex items-center justify-center text-text-secondary hover:text-text-primary
                       hover:bg-white transition-all shadow-sm"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* ── Facility Image ────────────────────────────────── */}
          <div className="relative h-44 bg-gradient-to-br from-sky-200 via-sky-100 to-sky-50 overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 px-6">
              <div className="w-1/4 h-20 bg-gradient-to-b from-sky-300 to-sky-400 rounded-t-sm relative">
                <div className="absolute inset-1.5 grid grid-cols-3 gap-0.5">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="bg-sky-200/60 rounded-[1px]" />
                  ))}
                </div>
              </div>
              <div className="w-2/5 h-28 bg-gradient-to-b from-blue-200 to-blue-300 rounded-t-sm relative">
                <div className="absolute inset-1.5 grid grid-cols-4 gap-0.5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="bg-blue-100/60 rounded-[1px]" />
                  ))}
                </div>
                <div className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow">
                  <span className="text-red-500 text-sm font-bold">✚</span>
                </div>
              </div>
              <div className="w-1/4 h-24 bg-gradient-to-b from-slate-200 to-slate-300 rounded-t-sm relative">
                <div className="absolute inset-1.5 grid grid-cols-3 gap-0.5">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-slate-100/60 rounded-[1px]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Content ───────────────────────────────────────── */}
          <div className="p-5 sm:p-6 space-y-5">
            {/* Facility name & location */}
            <div>
              <h2 className="text-lg font-bold text-text-primary">{shift.facilityName}</h2>
              <div className="flex items-center gap-1.5 mt-1 text-text-secondary">
                <MapPin size={14} />
                <span className="text-sm">{shift.location}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                {shift.nurseType} - {shift.unitDepartment}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                {shift.shiftType}
              </span>
            </div>

            {/* ── Info Grid (2×2) ─────────────────────────────── */}
            <div className="grid grid-cols-2 gap-3">
              <InfoBox
                icon={<Calendar size={18} />}
                primary={shift.date}
                secondary={shift.dayOfWeek}
              />
              <InfoBox
                icon={<Clock size={18} />}
                primary={`${shift.timeFrom} - ${shift.timeTo}`}
                secondary={shift.duration}
              />
              <InfoBox
                icon={<CalendarDays size={18} />}
                primary={shift.repeat}
                secondary={shift.repeatDetail || "—"}
              />
              <InfoBox
                icon={<DollarSign size={18} />}
                primary={`$${shift.payRate.toFixed(2)} /hr`}
                secondary={`Est. $${shift.estimatedTotal.toFixed(2)}`}
              />
            </div>

            {/* ── Shift Information ───────────────────────────── */}
            <div>
              <h3 className="text-sm font-bold text-text-primary mb-3">
                Shift Information
              </h3>
              <div className="space-y-0 divide-y divide-border-light">
                <InfoRow icon={<Building2 size={15} />} label="Unit / Department" value={shift.unitDepartment} />
                <InfoRow icon={<Users size={15} />} label="Number of Openings" value={String(shift.numberOfOpenings)} />
                <InfoRow icon={<Sun size={15} />} label="Shift Type" value={shift.shiftType} />
                <InfoRow icon={<UserCheck size={15} />} label="Assignment" value={shift.assignment} />
                <InfoRow icon={<HeartPulse size={15} />} label="Patient Ratio" value={shift.patientRatio} />
                <InfoRow icon={<CheckSquare size={15} />} label="Mandatory Float" value={shift.mandatoryFloat ? "Yes" : "No"} />
                <InfoRow icon={<Award size={15} />} label="Experience Required" value={shift.experienceRequired} />
                <InfoRow icon={<Shirt size={15} />} label="Dress Code" value={shift.dressCode} />
              </div>
            </div>

            {/* ── Notes ───────────────────────────────────────── */}
            <div>
              <h3 className="text-sm font-bold text-text-primary mb-2">
                Notes from Facility
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                {shift.notes}{" "}
                <button className="text-primary font-semibold hover:underline">
                  Read more
                </button>
              </p>
            </div>

            {/* ── Action Buttons ───────────────────────────────── */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleEdit}
                className="w-full py-3 rounded-xl bg-surface text-primary text-sm font-semibold
                           border border-primary/30 hover:bg-primary hover:text-white
                           transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Pencil size={15} />
                Edit Shift
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-3 rounded-xl bg-surface text-accent-red text-sm font-semibold
                           border border-red-200 hover:bg-red-50
                           transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Trash2 size={15} />
                Delete Shift
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Sub-components ──────────────────────────────────────────

/** 2×2 info box with icon, primary and secondary text */
function InfoBox({
  icon,
  primary,
  secondary,
}: {
  icon: React.ReactNode;
  primary: string;
  secondary: string;
}) {
  return (
    <div className="bg-surface-alt rounded-xl p-3 text-center border border-border-light">
      <div className="flex justify-center text-text-muted mb-1.5">{icon}</div>
      <p className="text-sm font-semibold text-text-primary">{primary}</p>
      <p className="text-[11px] text-text-muted mt-0.5">{secondary}</p>
    </div>
  );
}

/** Single row in the shift information list */
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className="text-text-muted shrink-0">{icon}</span>
      <span className="text-xs text-text-secondary flex-1">{label}</span>
      <span className="text-xs font-medium text-text-primary">{value}</span>
    </div>
  );
}
