"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/components/toast";
import { ProfileSkeleton } from "@/components/loading-skeleton";
import { getNurseProfile } from "@/lib/mock-data";
import type { NurseProfile } from "@/lib/types";

/**
 * Nurse Profile detail page.
 * Displays all nurse info, documents, and approve/reject buttons.
 */
export default function NurseProfilePage() {
  const params = useParams<{ id: string }>();
  const { addToast } = useToast();

  const [profile, setProfile] = useState<NurseProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<"approve" | "reject" | null>(null);

  // Simulate fetching profile data
  useEffect(() => {
    const timer = setTimeout(() => {
      setProfile(getNurseProfile(params.id));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [params.id]);

  // ─── Approve / Reject handlers ─────────────────────────────
  const handleApprove = async () => {
    setActionLoading("approve");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setActionLoading(null);
    addToast("Nurse application has been approved successfully!", "success");
  };

  const handleReject = async () => {
    setActionLoading("reject");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setActionLoading(null);
    addToast("Nurse application has been rejected.", "error");
  };

  // ─── Loading state ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-5 rounded" />
          <div className="skeleton h-6 w-32" />
        </div>
        <ProfileSkeleton />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="animate-fade-in">
      {/* ── Back Navigation ───────────────────────────────────── */}
      <div className="bg-surface rounded-xl border border-border shadow-card p-6 sm:p-8">
        <Link
          href="/nurse-management"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary
                     hover:text-text-primary transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Nurse Profile
        </Link>

        {/* ── Profile Content ───────────────────────────────────── */}
        <div className="max-w-md">
          {/* Avatar */}
          <div className="mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden border-3 border-blue-100">
              <span className="text-2xl font-bold text-primary">
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
          </div>

          {/* Info Fields */}
          <div className="space-y-5">
            <InfoField label="Name" value={profile.name} />
            <InfoField label="Phone Number" value={profile.phone} />
            <InfoField label="Email" value={profile.email} />
            <InfoField label="Address" value={profile.address} />
            <InfoField label="SSN" value={profile.ssn} />
            <InfoField label="Select Nurse Type" value={profile.nurseType} />
            <InfoField
              label="Interested in Housing Program?"
              value={profile.housingInterest ? "Yes" : "No"}
            />
          </div>

          {/* Documents */}
          <div className="mt-8 space-y-6">
            {profile.documents.map((doc) => (
              <div key={doc.id}>
                <h4 className="text-sm font-semibold text-text-primary mb-3">
                  {doc.label}
                </h4>
                <div className="rounded-xl border border-border overflow-hidden bg-surface-alt">
                  <div className="w-full h-40 sm:h-52 relative bg-amber-50/50 flex items-center justify-center">
                    {/* Placeholder certificate image */}
                    <div className="text-center p-4">
                      <div className="w-48 h-32 mx-auto border-2 border-amber-200 rounded-lg bg-gradient-to-b from-amber-50 to-white flex flex-col items-center justify-center p-3 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-amber-100" />
                          <div className="text-[6px] text-amber-700 font-bold uppercase tracking-wider">State of California</div>
                          <div className="w-6 h-6 rounded-full bg-amber-100" />
                        </div>
                        <div className="text-[7px] text-gray-500 font-medium">BOARD OF REGISTERED NURSING</div>
                        <div className="text-[10px] text-gray-700 font-semibold italic mt-1">{profile.name.toUpperCase()}</div>
                        <div className="w-16 h-px bg-amber-200 mt-1" />
                        <div className="text-[6px] text-gray-500 mt-1">REGISTERED NURSE</div>
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-4 h-4 rounded-full bg-red-100" />
                          <div className="text-[5px] text-gray-400 font-bold">LICENSE</div>
                          <div className="w-8 h-3 bg-blue-50 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <button
              onClick={handleApprove}
              disabled={actionLoading !== null}
              className="w-full py-3 rounded-xl bg-primary text-white text-sm font-semibold
                         hover:bg-primary-light transition-all duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {actionLoading === "approve" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Approve
            </button>
            <button
              onClick={handleReject}
              disabled={actionLoading !== null}
              className="w-full py-3 rounded-xl bg-surface text-primary text-sm font-semibold
                         border-2 border-primary hover:bg-primary/5 transition-all duration-200
                         disabled:opacity-60 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {actionLoading === "reject" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Info Field Sub-component ────────────────────────────────
function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-text-primary">{label}</dt>
      <dd className="text-sm text-accent-blue mt-0.5">{value}</dd>
    </div>
  );
}
