"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useToast } from "@/components/toast";

// ─── Navigation Items ────────────────────────────────────────
const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Nurse Management", href: "/nurse-management", icon: Users },
  { label: "Facilities", href: "/facilities", icon: Briefcase },
  { label: "Shift Management", href: "/shift-management", icon: Briefcase },
  { label: "Message", href: "/messages", icon: Mail },
  { label: "Settings", href: "/settings", icon: Settings },
];

/**
 * Sidebar navigation component.
 * - Desktop: fixed 240px sidebar
 * - Mobile: hamburger toggle → slide-out overlay
 */
export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { addToast } = useToast();

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  /** Check if a nav item is currently active */
  const isActive = (href: string) => {
    if (href === "/dashboard")
      return pathname === "/dashboard" || pathname === "/";
    return pathname.startsWith(href);
  };

  // ─── Sidebar Content (shared between desktop & mobile) ─────
  const sidebarContent = (
    <div className='flex flex-col h-full'>
      {/* Logo */}
      <div className='flex items-center justify-center pt-6 pb-8'>
        <div className='w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center border-2 border-amber-200 shadow-sm'>
          <span className='text-primary font-extrabold text-xs leading-tight text-center'>
            IAC
            <br />
            <span className='text-[8px] font-semibold tracking-wider'>
              STAFFING
            </span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-3 space-y-1'>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200 group
                ${
                  active
                    ? "bg-primary text-white shadow-md"
                    : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                }
              `}
            >
              <Icon
                size={18}
                className={`shrink-0 transition-colors ${
                  active
                    ? "text-white"
                    : "text-text-muted group-hover:text-text-primary"
                }`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Log Out */}
      <div className='px-3 pb-6'>
        <button
          onClick={() => setLogoutModalOpen(true)}
          className='flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
                     text-accent-red hover:bg-red-50 transition-all duration-200 w-full'
        >
          <LogOut size={18} className='shrink-0' />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Mobile Hamburger Button ──────────────────────────── */}
      <button
        onClick={toggleMobile}
        className='lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-surface shadow-card
                   border border-border text-text-primary hover:bg-surface-hover transition-colors'
        aria-label='Toggle navigation'
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* ── Mobile Overlay ───────────────────────────────────── */}
      {mobileOpen && (
        <div
          className='lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm'
          onClick={closeMobile}
        />
      )}

      {/* ── Mobile Sidebar ───────────────────────────────────── */}
      <aside
        className={`
          lg:hidden fixed top-0 left-0 z-40 h-full w-60 bg-surface border-r border-border
          shadow-sidebar transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {sidebarContent}
      </aside>

      {/* ── Desktop Sidebar ──────────────────────────────────── */}
      <aside className='hidden lg:block fixed top-0 left-0 h-full w-60 bg-surface border-r border-border shadow-sidebar z-30'>
        {sidebarContent}
      </aside>

      {/* ── Logout Modal ─────────────────────────────────────── */}
      {logoutModalOpen && (
        <>
          <div
            className='fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in'
            onClick={() => setLogoutModalOpen(false)}
          />
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div
              className='bg-surface rounded-2xl shadow-dropdown border border-border w-full max-w-sm
                         p-6 animate-fade-in'
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className='text-lg font-bold text-text-primary mb-2'>
                Log Out
              </h3>
              <p className='text-sm text-text-secondary mb-6'>
                Are you sure you want to log out of your account?
              </p>
              <div className='flex gap-3'>
                <button
                  onClick={() => setLogoutModalOpen(false)}
                  className='flex-1 py-2.5 rounded-xl bg-surface text-text-primary text-sm font-semibold
                             border border-border hover:bg-surface-hover transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setLogoutModalOpen(false);
                    addToast("Logged out successfully.", "success");
                  }}
                  className='flex-1 py-2.5 rounded-xl bg-accent-red text-white text-sm font-semibold
                             hover:bg-red-600 transition-colors'
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
