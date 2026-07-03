"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/toast";

/**
 * Change Password page — form to update the user's password.
 */
export default function ChangePasswordPage() {
  const { addToast } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Toggle visibility per field
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = useCallback(async () => {
    const newErrors: Record<string, string> = {};
    if (!currentPassword) newErrors.currentPassword = "Current password is required";
    if (!newPassword) newErrors.newPassword = "New password is required";
    else if (newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSaving(false);
    addToast("Password changed successfully!", "success");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }, [currentPassword, newPassword, confirmPassword, addToast]);

  return (
    <div className="animate-fade-in">
      <div className="bg-surface rounded-xl border border-border shadow-card overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-border">
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary
                       hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-lg font-bold text-text-primary">Change Password</span>
          </Link>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="max-w-md space-y-5">
            {/* Current Password */}
            <PasswordField
              label="Current Password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={setCurrentPassword}
              show={showCurrent}
              onToggle={() => setShowCurrent(!showCurrent)}
              error={errors.currentPassword}
            />

            {/* New Password */}
            <PasswordField
              label="New Password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={setNewPassword}
              show={showNew}
              onToggle={() => setShowNew(!showNew)}
              error={errors.newPassword}
            />

            {/* Confirm Password */}
            <PasswordField
              label="Confirm New Password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
              error={errors.confirmPassword}
            />

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-3 rounded-lg bg-primary text-white text-sm font-semibold
                           hover:bg-primary-light transition-all duration-200
                           disabled:opacity-60 disabled:cursor-not-allowed
                           flex items-center gap-2 shadow-md"
              >
                {saving && <Loader2 size={16} className="animate-spin" />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Password Field Sub-component ────────────────────────────
function PasswordField({
  label,
  placeholder,
  value,
  onChange,
  show,
  onToggle,
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggle: () => void;
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm font-bold text-text-primary block mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pr-11 text-sm rounded-lg border bg-surface text-text-primary
                     placeholder:text-text-muted focus:outline-none focus:ring-2
                     focus:ring-primary/20 focus:border-primary transition-all
                     ${error ? "border-accent-red" : "border-border"}`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted
                     hover:text-text-primary transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-xs text-accent-red mt-1">{error}</p>}
    </div>
  );
}
