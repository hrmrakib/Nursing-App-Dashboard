"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Privacy Policy page — static legal content.
 */
export default function PrivacyPolicyPage() {
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
            <span className="text-lg font-bold text-text-primary">Privacy Policy</span>
          </Link>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-w-3xl">
          <div className="prose prose-sm text-text-secondary space-y-6">
            <p className="text-sm leading-relaxed">
              Last updated: July 1, 2026
            </p>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">Information We Collect</h3>
              <p className="text-sm leading-relaxed">
                We collect information you provide directly to us, including your name, email address,
                phone number, professional credentials, and employment history. We also automatically
                collect certain technical information when you use our platform, such as IP addresses,
                device identifiers, and usage patterns.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">How We Use Your Information</h3>
              <p className="text-sm leading-relaxed">
                Your information is used to provide and improve our staffing services, process applications,
                verify credentials, facilitate shift assignments, communicate with you about your account
                and services, and comply with legal obligations. We may also use aggregated, anonymized
                data for analytics and service improvement.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">Data Sharing</h3>
              <p className="text-sm leading-relaxed">
                We share your information only with healthcare facilities you are assigned to, regulatory
                bodies as required by law, and service providers who assist in operating our platform.
                We never sell your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">Data Security</h3>
              <p className="text-sm leading-relaxed">
                We implement industry-standard security measures including encryption, access controls,
                and regular security audits to protect your personal and medical information. All data
                is stored in HIPAA-compliant servers with continuous monitoring and threat detection.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">Your Rights</h3>
              <p className="text-sm leading-relaxed">
                You have the right to access, correct, or delete your personal information at any time.
                You may also request a copy of your data or restrict its processing. To exercise these
                rights, please contact our support team through the Messages section or at
                privacy@iacstaffing.com.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">Contact Us</h3>
              <p className="text-sm leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at
                privacy@iacstaffing.com or through the in-app messaging system.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
