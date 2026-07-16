"use client";

import { MessageCircle, ExternalLink } from "lucide-react";

/**
 * Messages page — now redirects to the Tawk.to live chat dashboard
 * instead of rendering the in-app messaging UI.
 */
export default function MessagesPage() {
  const TAWK_DASHBOARD_URL = "https://dashboard.tawk.to/";

  return (
    <div
      className='bg-surface rounded-xl border border-border shadow-card overflow-hidden animate-fade-in
                 flex items-center justify-center'
      style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}
    >
      <div className='flex flex-col items-center gap-4 text-center px-6'>
        <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center'>
          <MessageCircle size={28} className='text-primary' />
        </div>

        <div>
          <h2 className='text-lg font-semibold text-text-primary'>
            Messages moved to Tawk.to
          </h2>
          <p className='text-sm text-text-secondary mt-1 max-w-sm'>
            All conversations are now handled through the Tawk.to live chat
            dashboard. Click below to open it.
          </p>
        </div>

        <a
          href={TAWK_DASHBOARD_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium
                     hover:bg-primary-light transition-colors'
        >
          Open Tawk.to Dashboard
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}
