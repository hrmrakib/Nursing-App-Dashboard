"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Calendar,
  Clock,
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
  AlertCircle,
  Loader2,
} from "lucide-react";
import type { Shift } from "@/lib/types";
import { useToast } from "@/components/toast";
import DeleteConfirmModal from "@/components/delete-confirm-modal";
import { useDeleteShiftAssignmentMutation } from "@/redux/features/shifts/shiftsAPI";

interface ShiftDetailModalProps {
  shift: Shift;
  onClose: () => void;
}

const shiftTypeLabels: Record<string, string> = {
  days: "Days",
  nights: "Nights",
  evenings: "Evenings",
  overnight: "Overnight",
};

const assignmentLabels: Record<string, string> = {
  staff_nurse: "Staff Nurse",
  charge_nurse: "Charge Nurse",
  float_pool: "Float Pool",
};

/** Format "09:00:00" -> "9:00 AM" */
function formatTime(time: string) {
  const [hStr, mStr] = time.split(":");
  const h = parseInt(hStr, 10);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mStr} ${period}`;
}

/** Difference between two "HH:MM:SS" times, formatted like "8h 30m" */
function formatDuration(start: string, end: string) {
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  let diff = toMinutes(end) - toMinutes(start);
  if (diff < 0) diff += 24 * 60; // overnight shift
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}

export default function ShiftDetailModal({
  shift,
  onClose,
}: ShiftDetailModalProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const facility = shift.facility;
  const imageUrl = facility?.image ?? shift.facility_image ?? null;

  const [deleteShift, { isLoading: isDeleting }] =
    useDeleteShiftAssignmentMutation();

  const dayOfWeek = useMemo(
    () =>
      new Date(`${shift.shift_date}T00:00:00`).toLocaleDateString(undefined, {
        weekday: "long",
      }),
    [shift.shift_date],
  );

  const formattedDate = useMemo(
    () =>
      new Date(`${shift.shift_date}T00:00:00`).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    [shift.shift_date],
  );

  const handleEdit = useCallback(() => {
    onClose();
    router.push(`/shift-management/add?edit=${shift.id}`);
  }, [onClose, router, shift.id]);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await deleteShift(shift.id).unwrap();
      addToast("Shift has been deleted.", "success");
      setShowDeleteModal(false);
      onClose();
    } catch (err) {
      console.error(err);
      addToast("Failed to delete shift. Please try again.", "error");
    }
  }, [deleteShift, shift.id, addToast, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className='min-h-screen fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 sm:pt-20 overflow-y-auto'>
        <div
          className='bg-surface rounded-2xl shadow-dropdown border border-border w-full max-w-md
                     animate-fade-in overflow-hidden relative'
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Close button ──────────────────────────────────── */}
          <button
            onClick={onClose}
            className='absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur
                       flex items-center justify-center text-text-secondary hover:text-text-primary
                       hover:bg-white transition-all shadow-sm'
            aria-label='Close'
          >
            <X size={16} />
          </button>

          {/* ── Facility Image ────────────────────────────────── */}
          <div className='relative h-52 bg-surface-alt overflow-hidden'>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt='Facility'
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full flex items-center justify-center text-text-muted text-sm'>
                No facility image
              </div>
            )}
            {shift.is_emergency && (
              <span
                className='absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1
                               rounded-full text-[11px] font-semibold bg-accent-red text-white shadow'
              >
                <AlertCircle size={12} />
                Urgent
              </span>
            )}
          </div>

          {/* ── Content ───────────────────────────────────────── */}
          <div className='p-5 sm:p-6 space-y-5'>
            {/* Facility name & location */}
            <div>
              <h2 className='text-lg font-bold text-text-primary'>
                {facility?.name ?? `Facility #${facility?.id ?? "—"}`}
              </h2>
              {facility?.address && (
                <div className='flex items-center gap-1.5 mt-1 text-text-secondary'>
                  <MapPin size={14} />
                  <span className='text-sm'>
                    {facility.address}
                    {facility.city ? `, ${facility.city}` : ""}
                    {facility.state ? `, ${facility.state}` : ""}
                  </span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className='flex items-center gap-2 flex-wrap'>
              {(shift.profession || shift.department) && (
                <span className='px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white'>
                  {[shift.profession, shift.department]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              )}
              {shift.shift_type && (
                <span className='px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800'>
                  {shiftTypeLabels[shift.shift_type] ?? shift.shift_type}
                </span>
              )}
              {shift.status && (
                <span className='px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700'>
                  {shift.status}
                </span>
              )}
            </div>

            {/* ── Info Grid (2×2) ─────────────────────────────── */}
            <div className='grid grid-cols-2 gap-3'>
              <InfoBox
                icon={<Calendar size={18} />}
                primary={formattedDate}
                secondary={dayOfWeek}
              />
              <InfoBox
                icon={<Clock size={18} />}
                primary={`${formatTime(shift.start_time)} - ${formatTime(shift.end_time)}`}
                secondary={formatDuration(shift.start_time, shift.end_time)}
              />
              <InfoBox
                icon={<DollarSign size={18} />}
                primary={`$${Number(shift.pay_rate).toFixed(2)} /hr`}
                secondary={
                  typeof shift.estimated_pay === "number"
                    ? `Est. $${shift.estimated_pay.toFixed(2)}`
                    : "—"
                }
              />
              <InfoBox
                icon={<Users size={18} />}
                primary={
                  typeof shift.required_nurses === "number"
                    ? `${shift.required_nurses} needed`
                    : "—"
                }
                secondary={
                  typeof shift.booked_count === "number"
                    ? `${shift.booked_count} booked`
                    : "—"
                }
              />
            </div>

            {/* ── Shift Information ───────────────────────────── */}
            <div>
              <h3 className='text-sm font-bold text-text-primary mb-3'>
                Shift Information
              </h3>
              <div className='space-y-0 divide-y divide-border-light'>
                {shift.department && (
                  <InfoRow
                    icon={<Building2 size={15} />}
                    label='Unit / Department'
                    value={shift.department}
                  />
                )}
                {typeof shift.required_nurses === "number" && (
                  <InfoRow
                    icon={<Users size={15} />}
                    label='Number of Openings'
                    value={String(shift.required_nurses)}
                  />
                )}
                {shift.shift_type && (
                  <InfoRow
                    icon={<Sun size={15} />}
                    label='Shift Type'
                    value={
                      shiftTypeLabels[shift.shift_type] ?? shift.shift_type
                    }
                  />
                )}
                {shift.assignment_type && (
                  <InfoRow
                    icon={<UserCheck size={15} />}
                    label='Assignment'
                    value={
                      assignmentLabels[shift.assignment_type] ??
                      shift.assignment_type
                    }
                  />
                )}
                <InfoRow
                  icon={<HeartPulse size={15} />}
                  label='Patient Ratio'
                  value={shift.patient_ratio || "—"}
                />
                <InfoRow
                  icon={<CheckSquare size={15} />}
                  label='Mandatory Float'
                  value={
                    shift.mandatory_float === undefined
                      ? "—"
                      : shift.mandatory_float
                        ? "Yes"
                        : "No"
                  }
                />
                <InfoRow
                  icon={<Award size={15} />}
                  label='Experience Required'
                  value={
                    !shift.experience_required_years
                      ? "No experience"
                      : `${shift.experience_required_years}+ year${
                          shift.experience_required_years > 1 ? "s" : ""
                        }`
                  }
                />
                <InfoRow
                  icon={<Shirt size={15} />}
                  label='Dress Code'
                  value={shift.dress_code || "—"}
                />
                {shift.pay_frequency && (
                  <InfoRow
                    icon={<Building2 size={15} />}
                    label='Pay Frequency'
                    value={
                      shift.pay_frequency.charAt(0).toUpperCase() +
                      shift.pay_frequency.slice(1)
                    }
                  />
                )}
              </div>
            </div>

            {/* ── Notes ───────────────────────────────────────── */}
            {shift.notes && (
              <div>
                <h3 className='text-sm font-bold text-text-primary mb-2'>
                  Notes from Facility
                </h3>
                <p className='text-xs text-text-secondary leading-relaxed'>
                  {shift.notes}
                </p>
              </div>
            )}

            {/* ── Action Buttons ───────────────────────────────── */}
            <div className='space-y-2.5 pt-2'>
              <button
                onClick={handleEdit}
                className='w-full py-3 rounded-xl bg-surface text-primary text-sm font-semibold
                           border border-primary/30 hover:bg-primary hover:text-white
                           transition-all duration-200 flex items-center justify-center gap-2'
              >
                <Pencil size={15} />
                Edit Shift
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={isDeleting}
                className='w-full py-3 rounded-xl bg-surface text-accent-red text-sm font-semibold
                           border border-red-200 hover:bg-red-50 transition-all duration-200
                           flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {isDeleting ? (
                  <Loader2 size={15} className='animate-spin' />
                ) : (
                  <Trash2 size={15} />
                )}
                Delete Shift
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteConfirmModal
          title='Delete Shift'
          message={`Are you sure you want to delete this shift on ${shift.shift_date}? This action cannot be undone.`}
          loading={isDeleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}

// ─── Sub-components ──────────────────────────────────────────

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
    <div className='bg-surface-alt rounded-xl p-3 text-center border border-border-light'>
      <div className='flex justify-center text-text-muted mb-1.5'>{icon}</div>
      <p className='text-sm font-semibold text-text-primary'>{primary}</p>
      <p className='text-[11px] text-text-muted mt-0.5'>{secondary}</p>
    </div>
  );
}

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
    <div className='flex items-center gap-3 py-2.5'>
      <span className='text-text-muted shrink-0'>{icon}</span>
      <span className='text-xs text-text-secondary flex-1'>{label}</span>
      <span className='text-xs font-medium text-text-primary'>{value}</span>
    </div>
  );
}
