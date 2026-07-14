// Add to @/lib/types.ts (keep existing NurseFilterTab as-is)

export type ApplicationStatus =
  | "not_submitted"
  | "pending_review"
  | "approved"
  | "rejected";

export interface Nurse {
  id: number;
  name: string;
  email: string;
  nurse_type: string;
  application_status: ApplicationStatus;
  submitted_at: string | null;
}
