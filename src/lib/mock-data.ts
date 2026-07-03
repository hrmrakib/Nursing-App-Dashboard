// ============================================================
// Mock data for the IAC Staffing Dashboard
// All data is static — no API calls needed for the prototype
// ============================================================

import type {
  Application,
  Nurse,
  NurseProfile,
  StatCardData,
  ShiftCard,
} from "./types";

// ─── Shift Management Stats ─────────────────────────────────
export const shiftManagementStats: StatCardData[] = [
  { label: "Total Shifts", value: "1,245", icon: "shifts", color: "blue" },
  { label: "Open Shifts", value: "340", icon: "shifts", color: "blue" },
  { label: "Assigned Shifts", value: "145", icon: "assigned", color: "amber" },
  { label: "Completed Shifts", value: "500", icon: "completed", color: "green" },
];

// ─── Shift Cards ─────────────────────────────────────────────
const shiftFacilities = [
  "Sunrise Care Center",
  "Golden Oaks Medical",
  "Lakeside Health",
  "Pinecrest Nursing",
];

const shiftLocations = [
  "Atlanta, GA",
  "Miami, FL",
  "Dallas, TX",
  "Chicago, IL",
];

export const mockShiftCards: ShiftCard[] = Array.from({ length: 12 }, (_, i) => ({
  id: `shift-${i + 1}`,
  facilityName: shiftFacilities[i % shiftFacilities.length],
  facilityImage: `/shifts/facility-${(i % 4) + 1}.jpg`,
  location: shiftLocations[i % shiftLocations.length],
  date: "May 20, 2026",
  dayOfWeek: "Tuesday",
  timeFrom: "7:00 AM",
  timeTo: "3:00 PM",
  duration: "8 hrs",
  payRate: 58 + (i % 4) * 5,
  status: i < 8 ? "in-progress" as const : "completed" as const,
  nurseType: (["RN", "CNA", "LPN"] as const)[i % 3],
  unitDepartment: "Med Surg",
  numberOfOpenings: (i % 3) + 1,
  shiftType: "Days",
  assignment: "Staff Nurse",
  patientRatio: (["1:5", "1:4", "1:3"] as const)[i % 3],
  mandatoryFloat: i % 2 === 0,
  experienceRequired: (["2 Years", "1 Year", "3+ Years"] as const)[i % 3],
  dressCode: (["Navy Scrubs", "Black Scrubs", "White Scrubs"] as const)[i % 3],
  repeat: (["Weekly", "Does Not Repeat", "Daily"] as const)[i % 3],
  repeatDetail: i % 3 === 0 ? "Every Friday" : i % 3 === 1 ? "" : "Weekdays",
  estimatedTotal: (58 + (i % 4) * 5) * 8,
  notes: "Lorem ipsum dolor sit amet consectetur. Quam in at tortor consectetur. Facilisi adipiscing tincidunt justo porta dui tincidunt malesuada.",
}));

// ─── Dashboard Stats ─────────────────────────────────────────
export const dashboardStats: StatCardData[] = [
  { label: "Total Nurses", value: "1,250", icon: "nurses", color: "blue" },
  { label: "Open Shifts", value: "340", icon: "shifts", color: "blue" },
  { label: "Completed Shifts", value: "500", icon: "completed", color: "green" },
  { label: "Pending Applications", value: "145", icon: "pending", color: "amber" },
];

// ─── Nurse Management Stats ──────────────────────────────────
export const nurseManagementStats: StatCardData[] = [
  { label: "Total Nurses", value: "1,250", icon: "nurses", color: "blue" },
  { label: "Active Nurses", value: "1,108", icon: "active", color: "green" },
  { label: "Pending Approval", value: "145", icon: "pending", color: "amber" },
  { label: "Rejected", value: "16", icon: "rejected", color: "red" },
];

// ─── Recent Applications (Dashboard) ────────────────────────
export const recentApplications: Application[] = Array.from(
  { length: 12 },
  (_, i) => ({
    id: `app-${i + 1}`,
    nurse: "Sarah Johnson",
    position: "RN",
    submitted: "10 mins ago",
    status: "Pending" as const,
  })
);

// ─── Nurses (Nurse Management) ──────────────────────────────

const nurseNames = [
  "Sarah Johnson",
  "Emily Rodriguez",
  "Michael Chen",
  "Lisa Thompson",
  "David Kim",
  "Amanda Foster",
  "Robert Wilson",
  "Jennifer Lee",
  "James Martinez",
  "Patricia Brown",
];

const facilities = [
  "Sunrise Care Center",
  "Golden Oaks Medical",
  "Lakeside Health",
  "Pinecrest Nursing",
  "Harbor View Medical",
];

export const pendingNurses: Nurse[] = Array.from({ length: 8 }, (_, i) => ({
  id: `nurse-pending-${i + 1}`,
  name: nurseNames[i % nurseNames.length],
  role: i % 3 === 0 ? "LPN" : "RN",
  assignedFacility: facilities[i % facilities.length],
  documents: "Pending" as const,
  status: "Pending" as const,
  position: i % 3 === 0 ? "LPN" : "RN",
  submitted: "10 mins ago",
}));

export const approvedNurses: Nurse[] = Array.from({ length: 10 }, (_, i) => ({
  id: `nurse-approved-${i + 1}`,
  name: nurseNames[i % nurseNames.length],
  role: i % 2 === 0 ? "RN" : "CNA",
  assignedFacility: facilities[i % facilities.length],
  documents: "Verified" as const,
  status: "Approved" as const,
  position: i % 2 === 0 ? "RN" : "CNA",
  submitted: `${i + 1} days ago`,
}));

export const rejectedNurses: Nurse[] = Array.from({ length: 5 }, (_, i) => ({
  id: `nurse-rejected-${i + 1}`,
  name: nurseNames[(i + 3) % nurseNames.length],
  role: "RN",
  assignedFacility: facilities[i % facilities.length],
  documents: "Missing" as const,
  status: "Rejected" as const,
  position: "RN",
  submitted: `${i + 2} days ago`,
}));

// ─── Nurse Profile Detail ───────────────────────────────────
export const nurseProfiles: Record<string, NurseProfile> = {
  "nurse-pending-1": {
    id: "nurse-pending-1",
    name: "Susan Flores",
    avatar: "/avatars/nurse-1.jpg",
    phone: "0123654789",
    email: "name@example.com",
    address: "Atlanta, GA",
    ssn: "541645465",
    nurseType: "CNA",
    housingInterest: true,
    status: "Pending",
    documents: [
      { id: "doc-1", label: "Social Security Card", imageUrl: "/documents/cert-1.jpg" },
      { id: "doc-2", label: "Social Security Card", imageUrl: "/documents/cert-2.jpg" },
      { id: "doc-3", label: "Social Security Card", imageUrl: "/documents/cert-3.jpg" },
    ],
  },
  // Generate a default profile for any nurse ID
};

/** Get a nurse profile by ID, returning a default if not found */
export function getNurseProfile(id: string): NurseProfile {
  if (nurseProfiles[id]) return nurseProfiles[id];

  // Generate a default profile
  return {
    id,
    name: "Susan Flores",
    avatar: "/avatars/nurse-1.jpg",
    phone: "0123654789",
    email: "name@example.com",
    address: "Atlanta, GA",
    ssn: "541645465",
    nurseType: "CNA",
    housingInterest: true,
    status: "Pending",
    documents: [
      { id: "doc-1", label: "Social Security Card", imageUrl: "/documents/cert-1.jpg" },
      { id: "doc-2", label: "Social Security Card", imageUrl: "/documents/cert-2.jpg" },
      { id: "doc-3", label: "Social Security Card", imageUrl: "/documents/cert-3.jpg" },
    ],
  };
}
