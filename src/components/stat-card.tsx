import {
  Users,
  CalendarCheck,
  CheckCircle,
  FileText,
  UserCheck,
  XCircle,
  UserPlus,
} from "lucide-react";
import type { StatCardData } from "@/lib/types";

// ─── Icon mapping ─────────────────────────────────────────────
const iconMap = {
  nurses: Users,
  shifts: CalendarCheck,
  completed: CheckCircle,
  pending: FileText,
  active: UserCheck,
  rejected: XCircle,
  assigned: UserPlus,
} as const;

// ─── Background color mapping for the icon circle ─────────────
const bgColorMap = {
  blue: "bg-stat-blue-bg",
  green: "bg-stat-green-bg",
  amber: "bg-stat-amber-bg",
  red: "bg-stat-red-bg",
} as const;

// ─── Foreground color mapping for the icon ────────────────────
const fgColorMap = {
  blue: "text-stat-blue-fg",
  green: "text-stat-green-fg",
  amber: "text-stat-amber-fg",
  red: "text-stat-red-fg",
} as const;

/**
 * StatCard — displays a metric with an icon, label, and value.
 * Used on Dashboard and Nurse Management pages.
 */
export default function StatCard({ label, value, icon, color }: StatCardData) {
  const Icon = iconMap[icon];

  return (
    <div
      className="bg-surface rounded-xl border border-border shadow-card p-5
                 hover:shadow-card-hover transition-shadow duration-300
                 flex items-center gap-4 animate-fade-in"
    >
      {/* Icon circle */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${bgColorMap[color]}`}
      >
        <Icon size={22} className={fgColorMap[color]} />
      </div>

      {/* Label + value */}
      <div>
        <p className="text-xs font-medium text-text-secondary uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-bold text-text-primary mt-0.5">{value}</p>
      </div>
    </div>
  );
}
