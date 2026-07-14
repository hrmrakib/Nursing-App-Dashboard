"use client";

import React, { Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Users,
  CheckCircle,
  ClipboardList,
  XCircle,
  Search,
} from "lucide-react";
import { useGetAllNurseQuery } from "@/redux/features/nurse/nurseAPI";

export interface Nurse {
  id: number;
  name: string;
  email: string;
  nurse_type: string;
  application_status:
    | "not_submitted"
    | "pending_review"
    | "approved"
    | "rejected";
  submitted_at: string | null;
}

export interface ApiResponse {
  status: string;
  code: number;
  message: string;
  data: Nurse[];
  meta: {
    count: number;
    page: number;
    page_size: number;
    next: string | null;
    previous: string | null;
    total_pages: number;
  };
}

const TABS = [
  { id: "not_submitted", label: "Not Submitted" },
  { id: "pending_review", label: "Pending Review" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

function DashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current status from URL, default to 'pending_review'
  const currentStatus = searchParams.get("status") || "pending_review";
  const searchQuery = searchParams.get("search") || "";

  // Fetch data via RTK Query
  const {
    data: response,
    isFetching,
    isError,
  } = useGetAllNurseQuery({
    application_status: currentStatus,
    search: searchQuery,
  });

  const nurses = response?.data || [];

  // Update URL search params
  const handleTabChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    params.delete("search"); // Optional: clear search on tab switch
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("search", e.target.value);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  // Helper to format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    let colorStyles = "";

    switch (status) {
      case "approved":
        colorStyles = "bg-green-100 text-green-700 border-green-200";
        break;
      case "rejected":
        colorStyles = "bg-red-100 text-red-700 border-red-200";
        break;
      case "pending_review":
        colorStyles = "bg-amber-100 text-amber-700 border-amber-200";
        break;
      case "not_submitted":
      default:
        colorStyles = "bg-slate-100 text-slate-700 border-slate-200";
        break;
    }

    return (
      <span
        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border capitalize ${colorStyles}`}
      >
        {status.replace("_", " ")}
      </span>
    );
  };

  return (
    <div className='min-h-screen bg-transparent p-4 md:p-8 font-sans'>
      <div className='container mx-auto space-y-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
          <StatCard
            icon={<Users className='w-6 h-6 text-[#1e40af]' />}
            title='Total Nurses'
            value='1,250'
            iconBg='bg-blue-100'
          />
          <StatCard
            icon={<CheckCircle className='w-6 h-6 text-blue-700' />}
            title='Active Nurses'
            value='1,108'
            iconBg='bg-blue-100'
          />
          <StatCard
            icon={<ClipboardList className='w-6 h-6 text-slate-600' />}
            title='Pending Approval'
            value='145'
            iconBg='bg-slate-200'
          />
          <StatCard
            icon={<XCircle className='w-6 h-6 text-slate-700' />}
            title='Rejected'
            value='16'
            iconBg='bg-slate-200'
          />
        </div>

        {/* --- TABS --- */}
        <div className='flex flex-wrap items-center gap-3'>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                currentStatus === tab.id
                  ? "bg-[#1e40af] text-white shadow-sm"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- MAIN TABLE AREA --- */}
        <div className='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'>
          {/* Table Header Controls */}
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-4 border-b border-slate-100'>
            <h2 className='text-xl font-semibold text-slate-800'>
              Recent Applications
            </h2>
            <div className='relative w-full sm:w-auto flex items-center'>
              <input
                type='text'
                placeholder='Search...'
                value={searchQuery}
                onChange={handleSearch}
                className='w-full sm:w-64 pl-4 pr-10 py-2 bg-slate-100 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e40af] focus:border-transparent text-sm'
              />
              <div className='absolute right-0 top-0 h-full w-10 flex items-center justify-center bg-[#1e40af] rounded-r-md cursor-pointer'>
                <Search className='w-4 h-4 text-white' />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className='overflow-x-auto w-full'>
            <table className='w-full text-left whitespace-nowrap'>
              <thead>
                <tr className='bg-[#1e40af] text-white text-sm'>
                  <th className='px-6 py-4 font-medium'>Nurse</th>
                  <th className='px-6 py-4 font-medium'>Position</th>
                  <th className='px-6 py-4 font-medium'>Submitted</th>
                  <th className='px-6 py-4 font-medium'>Status</th>
                  <th className='px-6 py-4 font-medium text-center'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100 text-sm text-slate-700'>
                {isFetching ? (
                  /* --- SKELETON LOADER ROWS --- */
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr
                      key={idx}
                      className='animate-pulse hover:bg-transparent'
                    >
                      <td className='px-6 py-4'>
                        <div className='h-4 bg-slate-200 rounded-md w-3/4 mb-2'></div>
                        <div className='h-3 bg-slate-100 rounded-md w-1/2'></div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='h-4 bg-slate-200 rounded-md w-12'></div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='h-4 bg-slate-200 rounded-md w-24'></div>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='h-4 bg-slate-200 rounded-md w-20'></div>
                      </td>
                      <td className='px-6 py-4 flex justify-center'>
                        <div className='h-8 bg-slate-200 rounded-md w-20'></div>
                      </td>
                    </tr>
                  ))
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={5}
                      className='px-6 py-8 text-center text-red-500'
                    >
                      Error fetching data.
                    </td>
                  </tr>
                ) : nurses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className='px-6 py-8 text-center text-slate-500'
                    >
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  nurses.map((nurse: Nurse) => (
                    <tr
                      key={nurse.id}
                      className='hover:bg-slate-50 transition-colors'
                    >
                      <td className='px-6 py-4'>
                        <div className='font-medium text-slate-900'>
                          {nurse.name}
                        </div>
                        <div className='text-slate-500 text-xs mt-0.5'>
                          {nurse.email}
                        </div>
                      </td>
                      <td className='px-6 py-4'>{nurse.nurse_type}</td>
                      <td className='px-6 py-4'>
                        {formatDate(nurse.submitted_at)}
                      </td>

                      <td className='px-6 py-4'>
                        {getStatusBadge(nurse.application_status)}
                      </td>

                      <td className='px-6 py-4 text-center'>
                        <button
                          onClick={() =>
                            router.push(`/nurse-management/${nurse.id}`)
                          }
                          className='px-6 py-2 bg-[#172554] text-white text-xs font-medium rounded-md hover:bg-blue-900 transition-colors'
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Sub-component
function StatCard({
  icon,
  title,
  value,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  iconBg: string;
}) {
  return (
    <div className='bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4'>
      <div className={`p-4 rounded-xl ${iconBg}`}>{icon}</div>
      <div>
        <p className='text-sm text-slate-500 font-medium mb-1'>{title}</p>
        <h3 className='text-3xl font-bold text-slate-800'>{value}</h3>
      </div>
    </div>
  );
}

// Next.js requires components accessing useSearchParams to be wrapped in Suspense.
export default function DashboardPage() {
  return (
    <Suspense
      fallback={<div className='p-8 text-center'>Loading interface...</div>}
    >
      <DashboardContent />
    </Suspense>
  );
}
