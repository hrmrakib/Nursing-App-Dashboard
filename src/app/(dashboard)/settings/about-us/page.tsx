"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail, Globe } from "lucide-react";

/**
 * About Us page — company information and mission statement.
 */
export default function AboutUsPage() {
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
            <span className="text-lg font-bold text-text-primary">About Us</span>
          </Link>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-w-3xl">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-50
                            flex items-center justify-center border-2 border-amber-200 shadow-sm shrink-0">
              <span className="text-primary font-extrabold text-xs leading-tight text-center">
                IAC
                <br />
                <span className="text-[7px] font-semibold tracking-wider">STAFFING</span>
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-primary">IAC Staffing</h3>
              <p className="text-sm text-text-secondary">Healthcare Workforce Solutions</p>
            </div>
          </div>

          <div className="space-y-6">
            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">Our Mission</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                IAC Staffing is dedicated to bridging the gap between healthcare facilities and qualified
                nursing professionals. We provide a seamless, technology-driven platform that simplifies
                shift management, nurse credentialing, and workforce scheduling to ensure every facility
                has the right staff at the right time.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">What We Do</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                Our platform connects healthcare facilities with a network of over 1,200 verified nursing
                professionals across the country. We handle credential verification, shift scheduling,
                compliance management, and real-time communication — all in one unified dashboard. Our
                goal is to reduce staffing shortages and improve patient care quality.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">Our Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: "Quality Care", desc: "We prioritize patient safety by thoroughly vetting all professionals." },
                  { title: "Reliability", desc: "Facilities can count on us to fill shifts promptly and consistently." },
                  { title: "Innovation", desc: "We leverage technology to streamline healthcare staffing operations." },
                  { title: "Integrity", desc: "Transparency and trust are the foundation of every relationship." },
                ].map((value) => (
                  <div
                    key={value.title}
                    className="p-4 rounded-xl bg-blue-50/60 border border-blue-100"
                  >
                    <h4 className="text-sm font-bold text-text-primary mb-1">{value.title}</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Information */}
            <section className="space-y-3">
              <h3 className="text-base font-bold text-text-primary">Contact Information</h3>
              <div className="space-y-3">
                <ContactItem icon={<MapPin size={16} />} text="123 Healthcare Ave, Atlanta, GA 30301" />
                <ContactItem icon={<Phone size={16} />} text="+1 (404) 555-0100" />
                <ContactItem icon={<Mail size={16} />} text="info@iacstaffing.com" />
                <ContactItem icon={<Globe size={16} />} text="www.iacstaffing.com" />
              </div>
            </section>

            <p className="text-xs text-text-muted pt-2">
              © 2026 IAC Staffing. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-text-secondary">
      <span className="text-primary shrink-0">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  );
}
