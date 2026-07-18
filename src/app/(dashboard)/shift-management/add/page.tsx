"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ChevronDown, Loader2 } from "lucide-react";
import { useToast } from "@/components/toast";
import type { ShiftFormData } from "@/lib/types";
import {
  useGetSingleShiftAssignmentQuery,
  useCreateShiftAssignmentMutation,
  useUpdateShiftAssignmentMutation,
} from "@/redux/features/shifts/shiftsAPI";
import { useGetAllFacilitiesQuery } from "@/redux/features/facilities/facilitiesAPI";

interface Option {
  value: string;
  label: string;
}

const professionOptions: Option[] = [
  { value: "CNA", label: "Certified Nursing Assistant (CNA)" },
  { value: "LPN", label: "Licensed Practical Nurse (LPN)" },
  { value: "RN", label: "Registered Nurse (RN)" },
];

const shiftTypeOptions: Option[] = [
  { value: "days", label: "Days" },
  { value: "nights", label: "Nights" },
  { value: "evenings", label: "Evenings" },
  { value: "overnight", label: "Overnight" },
];

const payFrequencyOptions: Option[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Biweekly" },
];

const assignmentTypeOptions: Option[] = [
  { value: "staff_nurse", label: "Staff Nurse" },
  { value: "charge_nurse", label: "Charge Nurse" },
  { value: "float_pool", label: "Float Pool" },
];

interface FormErrors {
  facility?: string;
  department?: string;
  profession?: string;
  shift_date?: string;
  start_time?: string;
  end_time?: string;
  pay_rate?: string;
  shift_type?: string;
}

const initialForm: ShiftFormData = {
  facility: 0,
  profession: "RN",
  department: "",
  shift_date: "",
  start_time: "",
  end_time: "",
  shift_type: "days",
  required_nurses: 1,
  pay_rate: "",
  pay_frequency: "weekly",
  assignment_type: "staff_nurse",
  patient_ratio: "",
  mandatory_float: false,
  experience_required_years: 0,
  dress_code: "",
  notes: "",
};

export default function AddShiftPage() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = !!editId;

  const router = useRouter();
  const { addToast } = useToast();

  const [form, setForm] = useState<ShiftFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const { data: allFacilitiesData } = useGetAllFacilitiesQuery(undefined);
  const facilities: { id: number; name: string }[] =
    allFacilitiesData?.data ?? [];

  const { data: existingShiftData, isLoading: isLoadingShift } =
    useGetSingleShiftAssignmentQuery(editId as string, { skip: !editId });

  const [createShift, { isLoading: isCreating }] =
    useCreateShiftAssignmentMutation();
  const [updateShift, { isLoading: isUpdating }] =
    useUpdateShiftAssignmentMutation();
  const submitting = isCreating || isUpdating;

  useEffect(() => {
    if (existingShiftData?.data) {
      const s = existingShiftData.data;
      setForm({
        facility: s.facility,
        profession: s.profession,
        department: s.department,
        shift_date: s.shift_date,
        start_time: s.start_time?.slice(0, 5) ?? "",
        end_time: s.end_time?.slice(0, 5) ?? "",
        shift_type: s.shift_type,
        required_nurses: s.required_nurses,
        pay_rate: s.pay_rate,
        pay_frequency: s.pay_frequency,
        assignment_type: s.assignment_type,
        patient_ratio: s.patient_ratio ?? "",
        mandatory_float: s.mandatory_float,
        experience_required_years: s.experience_required_years,
        dress_code: s.dress_code ?? "",
        notes: s.notes ?? "",
      });
    }
  }, [existingShiftData]);

  const updateField = <K extends keyof ShiftFormData>(
    key: K,
    value: ShiftFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!form.facility) newErrors.facility = "Please select a facility";
    if (!form.department.trim())
      newErrors.department = "Unit / Department is required";
    if (!form.profession) newErrors.profession = "Please select a profession";
    if (!form.shift_date) newErrors.shift_date = "Date is required";
    if (!form.start_time) newErrors.start_time = "Start time is required";
    if (!form.end_time) newErrors.end_time = "End time is required";
    if (!form.shift_type) newErrors.shift_type = "Please select a shift type";
    if (
      !form.pay_rate ||
      isNaN(Number(form.pay_rate)) ||
      Number(form.pay_rate) <= 0
    )
      newErrors.pay_rate = "Enter a valid pay rate";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;

    const payload: ShiftFormData = {
      ...form,
      start_time:
        form.start_time.length === 5
          ? `${form.start_time}:00`
          : form.start_time,
      end_time:
        form.end_time.length === 5 ? `${form.end_time}:00` : form.end_time,
    };

    try {
      if (isEditMode && editId) {
        await updateShift({ id: editId, data: payload }).unwrap();
        addToast("Shift updated successfully!", "success");
      } else {
        await createShift(payload).unwrap();
        addToast("Shift published successfully!", "success");
      }
      router.push("/shift-management");
    } catch (err) {
      console.error(err);
      addToast(
        isEditMode
          ? "Failed to update shift. Please try again."
          : "Failed to publish shift. Please try again.",
        "error",
      );
    }
  }, [
    form,
    validate,
    isEditMode,
    editId,
    updateShift,
    createShift,
    addToast,
    router,
  ]);

  const handleCancel = useCallback(
    () => router.push("/shift-management"),
    [router],
  );

  if (isEditMode && isLoadingShift) {
    return (
      <div className='flex items-center justify-center py-24'>
        <Loader2 size={24} className='animate-spin text-primary' />
      </div>
    );
  }

  return (
    <div className='animate-fade-in'>
      <div className='bg-surface rounded-xl border border-border shadow-card p-6 sm:p-8'>
        <Link
          href='/shift-management'
          className='inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-6'
        >
          <ArrowLeft size={18} />
          {isEditMode ? "Edit shift" : "Add shift"}
        </Link>

        <div className='max-w-md space-y-5'>
          <div>
            <label className='text-sm font-semibold text-text-primary block mb-1.5'>
              Facility
            </label>
            <div className='relative'>
              <select
                value={form.facility || ""}
                onChange={(e) =>
                  updateField("facility", Number(e.target.value))
                }
                className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary appearance-none cursor-pointer
                           focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all
                           ${!form.facility ? "text-text-muted" : ""} ${errors.facility ? "border-accent-red" : "border-border"}`}
              >
                <option value='' disabled>
                  Select facility
                </option>
                {facilities.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none'
              />
            </div>
            {errors.facility && (
              <p className='text-xs text-accent-red mt-1'>{errors.facility}</p>
            )}
          </div>

          <FormInput
            label='Unit / Department'
            placeholder='e.g. ICU, ER'
            value={form.department}
            onChange={(v) => updateField("department", v)}
            error={errors.department}
          />

          <FormSelect
            label='Profession'
            placeholder='Select profession'
            value={form.profession}
            onChange={(v) =>
              updateField("profession", v as ShiftFormData["profession"])
            }
            options={professionOptions}
            error={errors.profession}
          />

          <div>
            <label className='text-sm font-semibold text-text-primary block mb-1.5'>
              Date
            </label>
            <input
              type='date'
              value={form.shift_date}
              onChange={(e) => updateField("shift_date", e.target.value)}
              className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.shift_date ? "border-accent-red" : "border-border"}`}
            />
            {errors.shift_date && (
              <p className='text-xs text-accent-red mt-1'>
                {errors.shift_date}
              </p>
            )}
          </div>

          <div>
            <label className='text-sm font-semibold text-text-primary block mb-1.5'>
              Time Period
            </label>
            <div className='flex items-center gap-3'>
              <input
                type='time'
                value={form.start_time}
                onChange={(e) => updateField("start_time", e.target.value)}
                className={`flex-1 px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.start_time ? "border-accent-red" : "border-border"}`}
              />
              <input
                type='time'
                value={form.end_time}
                onChange={(e) => updateField("end_time", e.target.value)}
                className={`flex-1 px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.end_time ? "border-accent-red" : "border-border"}`}
              />
            </div>
            {(errors.start_time || errors.end_time) && (
              <p className='text-xs text-accent-red mt-1'>
                {errors.start_time || errors.end_time}
              </p>
            )}
          </div>

          <FormSelect
            label='Shift Type'
            placeholder='Select shift type'
            value={form.shift_type}
            onChange={(v) =>
              updateField("shift_type", v as ShiftFormData["shift_type"])
            }
            options={shiftTypeOptions}
            error={errors.shift_type}
          />

          <div>
            <label className='text-sm font-semibold text-text-primary block mb-1.5'>
              Pay Rate
            </label>
            <div className='relative'>
              <input
                type='number'
                value={form.pay_rate}
                onChange={(e) => updateField("pay_rate", e.target.value)}
                placeholder='0'
                min='0'
                step='0.01'
                className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary text-center focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${errors.pay_rate ? "border-accent-red" : "border-border"}`}
              />
              <span className='absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-muted'>
                / hr
              </span>
            </div>
            {errors.pay_rate && (
              <p className='text-xs text-accent-red mt-1'>{errors.pay_rate}</p>
            )}
          </div>

          <FormSelect
            label='Pay Frequency'
            value={form.pay_frequency}
            onChange={(v) =>
              updateField("pay_frequency", v as ShiftFormData["pay_frequency"])
            }
            options={payFrequencyOptions}
          />
          <FormSelect
            label='Assignment Type'
            value={form.assignment_type}
            onChange={(v) =>
              updateField(
                "assignment_type",
                v as ShiftFormData["assignment_type"],
              )
            }
            options={assignmentTypeOptions}
          />

          <div>
            <label className='text-sm font-semibold text-text-primary block mb-1.5'>
              Number of Openings
            </label>
            <input
              type='number'
              value={form.required_nurses}
              onChange={(e) =>
                updateField(
                  "required_nurses",
                  Math.max(1, parseInt(e.target.value) || 1),
                )
              }
              min='1'
              className='w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
            />
          </div>

          <FormInput
            label='Patient Ratio'
            placeholder='e.g. 1:5'
            value={form.patient_ratio ?? ""}
            onChange={(v) => updateField("patient_ratio", v)}
          />

          <div>
            <label className='text-sm font-semibold text-text-primary block mb-1.5'>
              Experience Required (years)
            </label>
            <input
              type='number'
              min='0'
              value={form.experience_required_years ?? 0}
              onChange={(e) =>
                updateField(
                  "experience_required_years",
                  Math.max(0, parseInt(e.target.value) || 0),
                )
              }
              className='w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
            />
          </div>

          <div>
            <label className='text-sm font-semibold text-text-primary block mb-2'>
              Mandatory Float
            </label>
            <div className='flex flex-col gap-2'>
              <label className='flex items-center gap-2.5 cursor-pointer group'>
                <input
                  type='radio'
                  name='mandatoryFloat'
                  checked={form.mandatory_float === true}
                  onChange={() => updateField("mandatory_float", true)}
                  className='w-4 h-4 text-primary border-border focus:ring-primary/20 accent-primary'
                />
                <span className='text-sm text-text-primary group-hover:text-primary transition-colors'>
                  Yes
                </span>
              </label>
              <label className='flex items-center gap-2.5 cursor-pointer group'>
                <input
                  type='radio'
                  name='mandatoryFloat'
                  checked={form.mandatory_float === false}
                  onChange={() => updateField("mandatory_float", false)}
                  className='w-4 h-4 text-primary border-border focus:ring-primary/20 accent-primary'
                />
                <span className='text-sm text-text-primary group-hover:text-primary transition-colors'>
                  No
                </span>
              </label>
            </div>
          </div>

          <FormInput
            label='Dress Code'
            placeholder='e.g. Navy Scrubs'
            value={form.dress_code ?? ""}
            onChange={(v) => updateField("dress_code", v)}
          />

          <div>
            <label className='text-sm font-semibold text-text-primary block mb-1.5'>
              Notes
            </label>
            <textarea
              value={form.notes ?? ""}
              onChange={(e) => updateField("notes", e.target.value)}
              rows={3}
              placeholder='Any additional notes for this shift'
              className='w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none'
            />
          </div>

          <div className='space-y-3 pt-4'>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className='w-full py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-light transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {submitting && <Loader2 size={16} className='animate-spin' />}
              {isEditMode ? "Save Changes" : "Publish Shift"}
            </button>
            <button
              onClick={handleCancel}
              disabled={submitting}
              className='w-full py-3 rounded-xl bg-surface text-primary text-sm font-semibold border border-primary/30 hover:bg-primary/5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className='text-sm font-semibold text-text-primary block mb-1.5'>
        {label}
      </label>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${error ? "border-accent-red" : "border-border"}`}
      />
      {error && <p className='text-xs text-accent-red mt-1'>{error}</p>}
    </div>
  );
}

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
  options: Option[];
  error?: string;
}) {
  return (
    <div>
      <label className='text-sm font-semibold text-text-primary block mb-1.5'>
        {label}
      </label>
      <div className='relative'>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-surface text-text-primary appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${!value ? "text-text-muted" : ""} ${error ? "border-accent-red" : "border-border"}`}
        >
          {placeholder && (
            <option value='' disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none'
        />
      </div>
      {error && <p className='text-xs text-accent-red mt-1'>{error}</p>}
    </div>
  );
}
