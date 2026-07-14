"use client";

import {
  useGetSingleNurseQuery,
  useNurseReviewMutation,
} from "@/redux/features/nurse/nurseAPI";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

export interface NurseDocument {
  document_type: "ssn_card" | "license" | "id_card" | string;
  file: string;
  uploaded_at: string;
}

export interface NurseData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  masked_ssn: string;
  nurse_type: "RN" | "CNA" | "LPN" | string;
  years_of_experience: number;
  license_number: string;
  documents: NurseDocument[];
  application_status: "pending_review" | "approved" | "rejected" | string;
  submitted_at: string | null;
  reviewed_at: string | null;
}

export interface NurseApiResponse {
  status: "success" | "error";
  code: number;
  message: string;
  data: NurseData;
}

export type ReviewAction = "approve" | "reject";
export default function NurseProfileDashboard() {
  const router = useRouter();

  // FIX: Extract dynamic route parameter (the '1' in /nurse-management/1)
  const params = useParams<{ id: string }>();
  const nurseId = params?.id;

  // RTK Query Hooks
  const {
    data: response,
    isLoading,
    isError,
  } = useGetSingleNurseQuery(nurseId, {
    skip: !nurseId,
  }) as {
    data: NurseApiResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const [reviewNurse, { isLoading: isReviewing }] = useNurseReviewMutation();

  const handleReviewAction = async (action: ReviewAction) => {
    if (!nurseId) return;

    try {
      await reviewNurse({ id: nurseId, action }).unwrap();
      alert(`Successfully marked as ${action}d!`);
    } catch (error) {
      console.error(`Failed to ${action} nurse:`, error);
      alert(`An error occurred while trying to ${action} this application.`);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center bg-gray-50'>
        <p className='text-gray-500 font-medium animate-pulse'>
          Loading profile...
        </p>
      </div>
    );
  }

  if (isError || !response?.data) {
    return (
      <div className='flex h-screen items-center justify-center bg-gray-50'>
        <p className='text-red-500 font-medium'>
          Failed to load nurse data or ID missing.
        </p>
      </div>
    );
  }

  const nurse = response.data;

  // Reusable typed component for profile fields
  const ProfileField = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className='mb-4'>
      <p className='text-sm font-semibold text-gray-900'>{label}</p>
      <p className='text-base text-slate-600 font-medium mt-0.5'>
        {value || "N/A"}
      </p>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50 flex justify-center p-4 sm:p-6'>
      <div className='w-full max-w-xl bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8'>
        {/* Header section */}
        <div className='flex items-center gap-3 mb-6'>
          <button
            onClick={() => router.back()}
            className='text-gray-600 hover:text-gray-900 transition-colors'
            aria-label='Go back'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
              />
            </svg>
          </button>
          <h1 className='text-lg font-bold text-gray-900'>Nurse Profile</h1>
        </div>

        {/* Profile Avatar */}
        <div className='mb-6'>
          <div className='w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100 relative bg-gray-200'>
            <Image
              src='https://i.pravatar.cc/150?u=nurse'
              alt={`${nurse.name}'s avatar`}
              fill
              className='object-cover'
            />
          </div>
        </div>

        {/* Info Fields */}
        <div className='flex flex-col'>
          <ProfileField label='Name' value={nurse.name} />
          <ProfileField label='Phone Number' value={nurse.phone} />
          <ProfileField label='Email' value={nurse.email} />
          <ProfileField label='Address' value={nurse.address} />
          <ProfileField
            label='SSN'
            value={nurse.masked_ssn || "Not provided"}
          />
          <ProfileField label='Select Nurse Type' value={nurse.nurse_type} />
          <ProfileField
            label='Years of Experience'
            value={nurse.years_of_experience}
          />
          <ProfileField label='License Number' value={nurse.license_number} />
          <ProfileField label='Interested in Housing Program?' value='Yes' />
        </div>

        {/* Documents Section */}
        {nurse.documents && nurse.documents.length > 0 && (
          <div className='mt-2 mb-8 space-y-6'>
            {nurse.documents.map((doc, idx) => (
              <div key={idx} className='flex flex-col gap-2'>
                <p className='text-sm font-semibold text-gray-900 capitalize'>
                  {doc.document_type.replace(/_/g, " ")}
                </p>
                <div className='relative w-full h-48 sm:h-56 border-2 border-gray-100 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center'>
                  <Image
                    src={doc.file}
                    alt={doc.document_type}
                    fill
                    className='object-cover'
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex flex-col gap-3 mt-8'>
          <button
            onClick={() => handleReviewAction("approve")}
            disabled={isReviewing}
            className='w-full py-3 rounded-lg font-semibold bg-[#112a58] text-white hover:bg-[#0c1e40] transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isReviewing ? "Processing..." : "Approve"}
          </button>

          <button
            onClick={() => handleReviewAction("reject")}
            disabled={isReviewing}
            className='w-full py-3 rounded-lg font-semibold bg-white text-[#112a58] border-2 border-[#112a58] hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isReviewing ? "Processing..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}
