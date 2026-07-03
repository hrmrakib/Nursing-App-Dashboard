"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, Loader2 } from "lucide-react";
import { useToast } from "@/components/toast";

/**
 * Personal Information page — profile editing form.
 * Shows avatar with upload, name, email, phone with country code, and save button.
 */
export default function PersonalInformationPage() {
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Form state ────────────────────────────────────────────
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [name, setName] = useState("Adam");
  const [email, setEmail] = useState("example@gmail.com");
  const [countryCode, setCountryCode] = useState("+1242");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  // ─── Validation errors ─────────────────────────────────────
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ─── Avatar upload ─────────────────────────────────────────
  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  // ─── Save handler ──────────────────────────────────────────
  const handleSave = useCallback(async () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSaving(false);
    addToast("Personal information updated successfully!", "success");
  }, [name, email, addToast]);

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
            <span className="text-lg font-bold text-text-primary">Personal Information</span>
          </Link>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* ── Left: Avatar Section ───────────────────────── */}
            <div className="flex flex-col items-center">
              <div
                className="w-44 h-52 rounded-xl border-2 border-dashed border-border
                           flex flex-col items-center justify-center gap-3 bg-surface-alt
                           hover:border-primary/30 transition-colors cursor-pointer relative overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <>
                    {/* Default avatar placeholder */}
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-200 to-slate-300
                                    flex items-center justify-center overflow-hidden border-3 border-white shadow-md">
                      <div className="text-4xl font-bold text-slate-500">A</div>
                    </div>
                  </>
                )}

                {/* Camera overlay on hover */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors
                                flex items-center justify-center opacity-0 hover:opacity-100">
                  <Camera size={24} className="text-white" />
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm font-medium text-text-secondary mt-3">Profile</p>
              <p className="text-base font-bold text-text-primary">Admin</p>
            </div>

            {/* ── Right: Form Fields ────────────────────────── */}
            <div className="flex-1 max-w-xl space-y-5">
              {/* Name */}
              <div>
                <label className="text-sm font-bold text-text-primary block mb-1.5">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-3 text-sm rounded-lg border bg-surface text-text-primary
                             placeholder:text-text-muted focus:outline-none focus:ring-2
                             focus:ring-primary/20 focus:border-primary transition-all
                             ${errors.name ? "border-accent-red" : "border-border"}`}
                />
                {errors.name && <p className="text-xs text-accent-red mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-bold text-text-primary block mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 text-sm rounded-lg border bg-surface text-text-primary
                             placeholder:text-text-muted focus:outline-none focus:ring-2
                             focus:ring-primary/20 focus:border-primary transition-all
                             ${errors.email ? "border-accent-red" : "border-border"}`}
                />
                {errors.email && <p className="text-xs text-accent-red mt-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-sm font-bold text-text-primary block mb-1.5">Phone Number</label>
                <div className="flex gap-3">
                  {/* Country code selector */}
                  <div className="flex items-center gap-2 px-3 py-3 rounded-lg border border-border
                                  bg-surface text-sm text-text-primary shrink-0 min-w-[100px]">
                    {/* US flag emoji */}
                    <span className="text-base">🇺🇸</span>
                    <span className="text-sm font-medium">{countryCode}</span>
                  </div>
                  {/* Phone input */}
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="xxxxxxxxx"
                    className="flex-1 px-4 py-3 text-sm rounded-lg border border-border bg-surface
                               text-text-primary placeholder:text-text-muted
                               focus:outline-none focus:ring-2 focus:ring-primary/20
                               focus:border-primary transition-all"
                  />
                </div>
              </div>

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
    </div>
  );
}
