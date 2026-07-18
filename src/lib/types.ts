// ============================================================
// Shared TypeScript types for the IAC Staffing Dashboard
// ============================================================

/** Navigation item for sidebar */
export interface NavItem {
  label: string;
  href: string;
  icon: string; // lucide-react icon name key
}

/** Stat card data */
export interface StatCardData {
  label: string;
  value: string | number;
  icon:
    | "nurses"
    | "shifts"
    | "completed"
    | "pending"
    | "active"
    | "rejected"
    | "assigned";
  color: "blue" | "green" | "amber" | "red";
}

/** Shift filter tab */
export type ShiftFilterTab = "in-progress" | "completed";

/** Nurse type options */
export type NurseType = "CNA" | "LPN" | "RN";

/** Repeat options */
export type RepeatOption = "Does Not Repeat" | "Daily" | "Weekly" | "Monthly";

/** Patient ratio options */
export type PatientRatio = "1:1" | "1:2" | "1:3" | "1:4" | "1:5" | "1:6";

/** Experience required options */
export type ExperienceRequired =
  | "No Experience"
  | "6 Months"
  | "1 Year"
  | "2 Years"
  | "3+ Years"
  | "5+ Years";

/** Dress code options */
export type DressCode =
  | "Navy Scrubs"
  | "Black Scrubs"
  | "White Scrubs"
  | "Facility Uniform"
  | "Business Casual";

/** Shift card data for the grid display */
export interface ShiftCard {
  id: string;
  facilityName: string;
  facilityImage: string;
  location: string;
  date: string;
  dayOfWeek: string;
  timeFrom: string;
  timeTo: string;
  duration: string;
  payRate: number;
  status: "in-progress" | "completed";
  nurseType: NurseType;
  unitDepartment: string;
  numberOfOpenings: number;
  shiftType: string;
  assignment: string;
  patientRatio: PatientRatio;
  mandatoryFloat: boolean;
  experienceRequired: ExperienceRequired;
  dressCode: DressCode;
  repeat: RepeatOption;
  repeatDetail: string;
  estimatedTotal: number;
  notes: string;
}

/** Form data for adding a new shift */
export interface AddShiftFormData {
  facilityImage: File | null;
  facilityName: string;
  location: string;
  unitDepartment: string;
  nurseType: NurseType | "";
  date: string;
  timeFrom: string;
  timeTo: string;
  repeat: RepeatOption;
  payRate: string;
  numberOfOpenings: number;
  patientRatio: PatientRatio;
  experienceRequired: ExperienceRequired;
  mandatoryFloat: boolean;
  dressCode: DressCode | "";
}

/** Application status */

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

// Tabs now map 1:1 to backend statuses since filtering happens server-side
export type NurseFilterTab = ApplicationStatus;

/** Recent application entry (Dashboard page) */
export interface Application {
  id: string;
  nurse: string;
  position: string;
  submitted: string;
  status: ApplicationStatus;
}

/** Nurse record (Nurse Management page) */
export interface Nurse {
  id: number;
  name: string;
  role: string;
  assignedFacility: string;
  documents: "Verified" | "Pending" | "Missing";
  status: ApplicationStatus;
  position: string;
  submitted: string;
}

/** Nurse profile detail */
export interface NurseProfile {
  id: string | number;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  address: string;
  ssn: string;
  nurseType: string;
  housingInterest: boolean;
  documents: DocumentItem[];
  status: ApplicationStatus;
}

/** Document attached to a nurse profile */
export interface DocumentItem {
  id: string;
  label: string;
  imageUrl: string;
}

/** Table column definition for the generic DataTable */
export interface TableColumn<T> {
  key: keyof T | "action";
  label: string;
  render?: (row: T) => React.ReactNode;
}

/** Toast notification */
export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

export interface ShiftFacility {
  id: number;
  name: string;
  image: string | null;
  address: string;
  city: string;
  state: string;
  latitude: string | null;
  longitude: string | null;
}

export interface Shift {
  id: number;
  facility: {
    id: number;
    name: string;
    image: string | null;
    address: string;
    city: string;
    state: string;
    latitude: string | null;
    longitude: string | null;
  }; // object in list response, may be id in other contexts
  facility_image?: string | null; // fallback if some endpoints still send this flat field
  profession?: "CNA" | "LPN" | "RN";
  department?: string;
  shift_date: string;
  start_time: string;
  end_time: string;
  shift_type?: "days" | "nights" | "evenings" | "overnight";
  required_nurses?: number;
  pay_rate: string;
  pay_frequency?: "daily" | "weekly" | "biweekly";
  assignment_type?: "staff_nurse" | "charge_nurse" | "float_pool";
  patient_ratio?: string;
  mandatory_float?: boolean;
  is_emergency?: boolean;
  experience_required_years?: number;
  dress_code?: string;
  notes?: string;
  status?: "OPEN" | "ASSIGNED" | "COMPLETED" | "CANCELLED";
  estimated_pay?: number;
  booked_count?: number;
  created_at?: string;
}

// Helper: resolves a Shift's facility whether it's an id or a nested object
export function getFacilityInfo(shift: Shift): ShiftFacility | null {
  return typeof shift.facility === "object" && shift.facility !== null
    ? shift.facility
    : null;
}

export function getFacilityId(shift: Shift): number {
  return typeof shift.facility === "object" && shift.facility !== null
    ? shift.facility.id
    : shift.facility;
}

// ... keep ShiftFormData, ShiftsListResponse, ShiftDetailResponse as before

export interface ShiftFormData {
  facility: number;
  profession: "CNA" | "LPN" | "RN";
  department: string;
  shift_date: string;
  start_time: string;
  end_time: string;
  shift_type: "days" | "nights" | "evenings" | "overnight";
  required_nurses: number;
  pay_rate: string;
  pay_frequency: "daily" | "weekly" | "biweekly";
  assignment_type: "staff_nurse" | "charge_nurse" | "float_pool";
  patient_ratio?: string;
  mandatory_float?: boolean;
  experience_required_years?: number;
  dress_code?: string;
  notes?: string;
}

export interface ShiftsListResponse {
  status: string;
  code: number;
  message: string;
  data: Shift[];
  meta: {
    count: number;
    page: number;
    page_size: number;
    next: string | null;
    previous: string | null;
    total_pages: number;
  };
}

export interface ShiftDetailResponse {
  status: string;
  code: number;
  message: string;
  data: Shift;
}
