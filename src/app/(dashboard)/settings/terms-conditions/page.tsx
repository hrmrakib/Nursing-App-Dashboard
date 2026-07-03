"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Terms & Conditions page — static legal content.
 */
export default function TermsConditionsPage() {
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
            <span className="text-lg font-bold text-text-primary">Terms & Conditions</span>
          </Link>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-w-3xl">
          <div className="prose prose-sm text-text-secondary space-y-6">
            <p className="text-sm leading-relaxed">
              Last updated: July 1, 2026
            </p>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">1. Acceptance of Terms</h3>
              <p className="text-sm leading-relaxed">
                By accessing and using the IAC Staffing platform, you agree to be bound by these Terms and
                Conditions. If you do not agree with any part of these terms, you must not use our services.
                These terms apply to all users of the platform, including administrators, nurses, and
                facility managers.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">2. Use of Services</h3>
              <p className="text-sm leading-relaxed">
                IAC Staffing provides a workforce management platform for healthcare facilities. You agree
                to use the platform only for lawful purposes and in accordance with applicable healthcare
                regulations. You are responsible for maintaining the confidentiality of your account
                credentials and for all activities that occur under your account.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">3. User Responsibilities</h3>
              <p className="text-sm leading-relaxed">
                Users must provide accurate and complete information when creating accounts and managing
                nurse profiles. All medical credentials and certifications must be valid and up-to-date.
                Misrepresentation of qualifications or documentation is strictly prohibited and may result
                in immediate account termination.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">4. Data Protection</h3>
              <p className="text-sm leading-relaxed">
                We are committed to protecting your personal and medical data in compliance with HIPAA
                regulations. All sensitive information is encrypted and stored securely. We do not sell
                or share personal data with third parties without explicit consent, except as required
                by law.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">5. Limitation of Liability</h3>
              <p className="text-sm leading-relaxed">
                IAC Staffing shall not be liable for any indirect, incidental, special, consequential,
                or punitive damages resulting from your use of the platform. Our total liability shall
                not exceed the amount paid by you in the twelve months preceding the claim.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">6. Modifications</h3>
              <p className="text-sm leading-relaxed">
                We reserve the right to modify these terms at any time. Users will be notified of
                significant changes via email or in-app notification. Continued use of the platform
                after modifications constitutes acceptance of the updated terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
