"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  MapPin,
  Clock,
  ChevronDown,
  Loader2,
  ImagePlus,
} from "lucide-react";
import { useToast } from "@/components/toast";
import type {
  NurseType,
  RepeatOption,
  PatientRatio,
  ExperienceRequired,
  DressCode,
} from "@/lib/types";

// ─── Select option data (matching the dropdown screenshots) ──
const nurseTypeOptions: NurseType[] = ["CNA", "LPN", "RN"];
const repeatOptions: RepeatOption[] = ["Does Not Repeat", "Daily", "Weekly", "Monthly"];
const patientRatioOptions: PatientRatio[] = ["1:1", "1:2", "1:3", "1:4", "1:5", "1:6"];
const experienceOptions: ExperienceRequired[] = [
  "No Experience",
  "6 Months",
  "1 Year",
  "2 Years",
  "3+ Years",
  "5+ Years",
];
const dressCodeOptions: DressCode[] = [
  "Navy Scrubs",
  "Black Scrubs",
  "White Scrubs",
  "Facility Uniform",
  "Business Casual",
];

// ─── Form validation errors ──────────────────────────────────
interface FormErrors {
  facilityName?: string;
  location?: string;
  unitDepartment?: string;
  nurseType?: string;
  date?: string;
  timeFrom?: string;
  timeTo?: string;
  payRate?: string;
  dressCode?: string;
}

/**
 * Add Shift page — full form for publishing a new shift.
 * Matches the Figma design with all fields, selects, radio buttons, and validation.
 */
export default function AddShiftPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Form state ────────────────────────────────────────────
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [facilityName, setFacilityName] = useState("");
  const [location, setLocation] = useState("");
  const [unitDepartment, setUnitDepartment] = useState("");
  const [nurseType, setNurseType] = useState<NurseType | "">("");
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [repeat, setRepeat] = useState<RepeatOption>("Does Not Repeat");
  const [payRate, setPayRate] = useState("");
  const [numberOfOpenings, setNumberOfOpenings] = useState(1);
  const [patientRatio, setPatientRatio] = useState<PatientRatio>("1:1");
  const [experienceRequired, setExperienceRequired] = useState<ExperienceRequired>("No Experience");
  const [mandatoryFloat, setMandatoryFloat] = useState(true);
  const [dressCode, setDressCode] = useState<DressCode | "">("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // ─── Image upload handler ──────────────────────────────────
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  // ─── Validation ────────────────────────────────────────────
  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!facilityName.trim()) newErrors.facilityName = "Facility name is required";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!unitDepartment.trim()) newErrors.unitDepartment = "Unit / Department is required";
    if (!nurseType) newErrors.nurseType = "Please select a nurse type";
    if (!date) newErrors.date = "Date is required";
    if (!timeFrom) newErrors.timeFrom = "Start time is required";
    if (!timeTo) newErrors.timeTo = "End time is required";
    if (!payRate || isNaN(Number(payRate)) || Number(payRate) <= 0)
      newErrors.payRate = "Enter a valid pay rate";
    if (!dressCode) newErrors.dressCode = "Please select a dress code";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [facilityName, location, unitDepartment, nurseType, date, timeFrom, timeTo, payRate, dressCode]);

  // ─── Submit handler ────────────────────────────────────────
  const handlePublish = useCallback(async () => {
    if (!validate()) return;

    setSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    addToast("Shift published successfully!", "success");
    router.push("/shift-management");
  }, [validate, addToast, router]);

  const handleCancel = useCallback(() => {
    router.push("/shift-management");
  }, [router]);

  return (
    <div className="animate-fade-in">
      <div className="bg-surface rounded-xl border border-border shadow-card p-6 sm:p-8">
        {/* ── Back Navigation ─────────────────────────────────── */}
        <Link
          href="/shift-management"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary
                     hover:text-text-primary transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Add shift
        </Link>

        {/* ── Form ────────────────────────────────────────────── */}
        <div className="max-w-md space-y-5">

          {/* Facility Image Upload */}
          <div>
            <label className="text-sm font-semibold text-text-primary block mb-2">
              Facility Image
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-28 rounded-xl border-2 border-dashed border-border
                         bg-surface-alt hover:bg-surface-hover transition-colors
                         flex flex-col items-center justify-center gap-1.5 text-text-muted
                         hover:text-text-secondary overflow-hidden"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Facility preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <ImagePlus size={20} />
                  <span className="text-xs font-medium text-accent-blue">Upload Image</span>
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Facility Name */}
          <FormInput
            label="Facility Name"
            placeholder="Enter facility name"
            value={facilityName}
            onChange={setFacilityName}
            error={errors.facilityName}
          />

          {/* Location */}
          <FormInput
            label="Location"
            placeholder="Enter location"
            value={location}
            onChange={setLocation}
            error={errors.location}
            icon={<MapPin size={16} className="text-primary" />}
          />

          {/* Unit / Department */}
          <FormInput
            label="Unit / Department"
            placeholder="Enter unit / department"
            value={unitDepartment}
            onChange={setUnitDepartment}
            error={errors.unitDepartment}
          />

          {/* Nurse Type */}
          <FormSelect
            label="Nurse Type"
            placeholder="Select nurse type"
            value={nurseType}
            onChange={(v) => setNurseType(v as NurseType)}
            options={nurseTypeOptions}
            error={errors.nurseType}
          />

          {/* Date */}
          <div>
            <label className="text-sm font-semibold text-text-primary block mb-1.5">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary
                         focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                         transition-all ${errors.date ? "border-accent-red" : "border-border"}`}
            />
            {errors.date && <p className="text-xs text-accent-red mt-1">{errors.date}</p>}
          </div>

          {/* Time Period */}
          <div>
            <label className="text-sm font-semibold text-text-primary block mb-1.5">Time Period</label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="time"
                  value={timeFrom}
                  onChange={(e) => setTimeFrom(e.target.value)}
                  placeholder="From"
                  className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary
                             focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                             transition-all ${errors.timeFrom ? "border-accent-red" : "border-border"}`}
                />
              </div>
              <div className="relative flex-1">
                <input
                  type="time"
                  value={timeTo}
                  onChange={(e) => setTimeTo(e.target.value)}
                  placeholder="To"
                  className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary
                             focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                             transition-all ${errors.timeTo ? "border-accent-red" : "border-border"}`}
                />
              </div>
            </div>
            {(errors.timeFrom || errors.timeTo) && (
              <p className="text-xs text-accent-red mt-1">{errors.timeFrom || errors.timeTo}</p>
            )}
          </div>

          {/* Repeat */}
          <FormSelect
            label="Repeat"
            value={repeat}
            onChange={(v) => setRepeat(v as RepeatOption)}
            options={repeatOptions}
          />

          {/* Pay Rate */}
          <div>
            <label className="text-sm font-semibold text-text-primary block mb-1.5">Pay Rate</label>
            <div className="relative">
              <input
                type="number"
                value={payRate}
                onChange={(e) => setPayRate(e.target.value)}
                placeholder="0"
                min="0"
                step="0.01"
                className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary
                           text-center focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                           transition-all ${errors.payRate ? "border-accent-red" : "border-border"}`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-muted">
                / hr
              </span>
            </div>
            {errors.payRate && <p className="text-xs text-accent-red mt-1">{errors.payRate}</p>}
          </div>

          {/* Number of Openings */}
          <div>
            <label className="text-sm font-semibold text-text-primary block mb-1.5">Number of Openings</label>
            <input
              type="number"
              value={numberOfOpenings}
              onChange={(e) => setNumberOfOpenings(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-surface text-text-primary
                         focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Patient Ratio */}
          <FormSelect
            label="Patient Ratio"
            value={patientRatio}
            onChange={(v) => setPatientRatio(v as PatientRatio)}
            options={patientRatioOptions}
          />

          {/* Experience Required */}
          <FormSelect
            label="Experience Required"
            value={experienceRequired}
            onChange={(v) => setExperienceRequired(v as ExperienceRequired)}
            options={experienceOptions}
          />

          {/* Mandatory Float */}
          <div>
            <label className="text-sm font-semibold text-text-primary block mb-2">
              Mandatory Float
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="mandatoryFloat"
                  checked={mandatoryFloat === true}
                  onChange={() => setMandatoryFloat(true)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary/20
                             accent-primary"
                />
                <span className="text-sm text-text-primary group-hover:text-primary transition-colors">
                  Yes
                </span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="mandatoryFloat"
                  checked={mandatoryFloat === false}
                  onChange={() => setMandatoryFloat(false)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary/20
                             accent-primary"
                />
                <span className="text-sm text-text-primary group-hover:text-primary transition-colors">
                  No
                </span>
              </label>
            </div>
          </div>

          {/* Dress Code */}
          <FormSelect
            label="Dress Code"
            placeholder="Select one"
            value={dressCode}
            onChange={(v) => setDressCode(v as DressCode)}
            options={dressCodeOptions}
            error={errors.dressCode}
          />

          {/* ── Action Buttons ─────────────────────────────────── */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handlePublish}
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-primary text-white text-sm font-semibold
                         hover:bg-primary-light transition-all duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              Publish Shift
            </button>
            <button
              onClick={handleCancel}
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-surface text-primary text-sm font-semibold
                         border border-primary/30 hover:bg-primary/5 transition-all duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Reusable Form Sub-components ────────────────────────────

/** Text input field */
function FormInput({
  label,
  placeholder,
  value,
  onChange,
  error,
  icon,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-text-primary block mb-1.5">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary
                     placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20
                     focus:border-primary transition-all
                     ${icon ? "pr-10" : ""}
                     ${error ? "border-accent-red" : "border-border"}`}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">{icon}</span>
        )}
      </div>
      {error && <p className="text-xs text-accent-red mt-1">{error}</p>}
    </div>
  );
}

/** Select dropdown */
function FormSelect({
  label,
  placeholder,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-text-primary block mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary
                     appearance-none cursor-pointer focus:outline-none focus:ring-2
                     focus:ring-primary/20 focus:border-primary transition-all
                     ${!value ? "text-text-muted" : ""}
                     ${error ? "border-accent-red" : "border-border"}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
        />
      </div>
      {error && <p className="text-xs text-accent-red mt-1">{error}</p>}
    </div>
  );
}
