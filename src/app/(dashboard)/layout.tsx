"use client";

import Sidebar from "@/components/sidebar";
import TopHeader from "@/components/top-header";
import { ToastProvider } from "@/components/toast";

/**
 * Dashboard route group layout.
 * Wraps all dashboard pages with the sidebar + top header.
 * Responsive: sidebar collapses to hamburger on mobile.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className='min-h-screen flex'>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area — offset by sidebar width on desktop */}
        <main className='flex-1 lg:ml-60 min-h-screen'>
          <div className='container mx-auto space-y-6'>
            {/* Top header */}
            <div className='mt-12 lg:mt-0 p-5'>
              <TopHeader />
            </div>

            {/* Page content */}
            <div className='p-5'>{children}</div>
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
