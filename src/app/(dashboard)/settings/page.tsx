"use client";

import { useState } from "react";
import { User, Bell, Shield, Palette, Save, Loader2 } from "lucide-react";
import { useToast } from "@/components/toast";

/**
 * Settings page — profile settings, notifications, and preferences.
 */
export default function SettingsPage() {
  const { addToast } = useToast();
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    addToast("Settings saved successfully!", "success");
  };

  const sections = [
    { key: "profile", label: "Profile", icon: User },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "security", label: "Security", icon: Shield },
    { key: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="animate-fade-in">
      <div className="bg-surface rounded-xl border border-border shadow-card overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* ── Settings Navigation ─────────────────────────── */}
          <div className="md:w-56 border-b md:border-b-0 md:border-r border-border">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-text-primary px-3 py-2">Settings</h2>
            </div>
            <nav className="px-3 pb-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
              {sections.map((section) => {
                const Icon = section.icon;
                const active = activeSection === section.key;
                return (
                  <button
                    key={section.key}
                    onClick={() => setActiveSection(section.key)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium
                      transition-all whitespace-nowrap
                      ${active
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                      }`}
                  >
                    <Icon size={16} />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ── Settings Content ─────────────────────────────── */}
          <div className="flex-1 p-6 sm:p-8">
            {activeSection === "profile" && (
              <div className="space-y-6 max-w-lg">
                <h3 className="text-lg font-semibold text-text-primary">Profile Settings</h3>

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border-2 border-blue-100">
                    <span className="text-lg font-bold text-primary">SH</span>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors">
                    Change Photo
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <FormField label="Full Name" defaultValue="Sharon Williams" />
                  <FormField label="Email" defaultValue="sharon@iacstaffing.com" type="email" />
                  <FormField label="Phone" defaultValue="(404) 555-0123" type="tel" />
                  <FormField label="Role" defaultValue="Admin" disabled />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold
                             hover:bg-primary-light transition-all duration-200
                             disabled:opacity-60 disabled:cursor-not-allowed
                             flex items-center gap-2"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save Changes
                </button>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-6 max-w-lg">
                <h3 className="text-lg font-semibold text-text-primary">Notification Preferences</h3>
                <div className="space-y-4">
                  <ToggleField label="Email Notifications" description="Receive email updates for new applications" defaultChecked />
                  <ToggleField label="SMS Notifications" description="Get text alerts for urgent matters" defaultChecked={false} />
                  <ToggleField label="Push Notifications" description="Browser push notifications for real-time updates" defaultChecked />
                  <ToggleField label="Weekly Reports" description="Receive a weekly summary report via email" defaultChecked />
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-6 max-w-lg">
                <h3 className="text-lg font-semibold text-text-primary">Security Settings</h3>
                <div className="space-y-4">
                  <FormField label="Current Password" type="password" placeholder="Enter current password" />
                  <FormField label="New Password" type="password" placeholder="Enter new password" />
                  <FormField label="Confirm Password" type="password" placeholder="Confirm new password" />
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold
                             hover:bg-primary-light transition-all flex items-center gap-2
                             disabled:opacity-60"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />}
                  Update Password
                </button>
              </div>
            )}

            {activeSection === "appearance" && (
              <div className="space-y-6 max-w-lg">
                <h3 className="text-lg font-semibold text-text-primary">Appearance</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-text-primary block mb-2">Theme</label>
                    <div className="flex gap-3">
                      {["Light", "Dark", "System"].map((theme) => (
                        <button
                          key={theme}
                          className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all
                            ${theme === "Light"
                              ? "bg-primary text-white border-primary"
                              : "bg-surface text-text-secondary border-border hover:border-primary/30"
                            }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>
                  <ToggleField label="Compact Mode" description="Reduce spacing for denser information display" defaultChecked={false} />
                  <ToggleField label="Animations" description="Enable UI animations and transitions" defaultChecked />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────

function FormField({
  label,
  defaultValue,
  type = "text",
  placeholder,
  disabled = false,
}: {
  label: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-text-primary block mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-surface
                   text-text-primary placeholder:text-text-muted
                   focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                   disabled:bg-surface-alt disabled:text-text-muted disabled:cursor-not-allowed
                   transition-all"
      />
    </div>
  );
}

function ToggleField({
  label,
  description,
  defaultChecked = false,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between py-3 border-b border-border-light">
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className="text-xs text-text-secondary mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`w-11 h-6 rounded-full transition-colors duration-200 relative
          ${checked ? "bg-primary" : "bg-gray-200"}`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200
            ${checked ? "translate-x-5.5" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}
