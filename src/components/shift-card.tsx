"use client";

import { MapPin, Calendar } from "lucide-react";
import type { ShiftCard as ShiftCardType } from "@/lib/types";

interface ShiftCardProps {
  shift: ShiftCardType;
  onClick: (shift: ShiftCardType) => void;
}

/**
 * ShiftCard — card component for the shift management grid.
 * Shows a facility image, name, location, date/time, and pay rate.
 * Clicking opens the shift detail modal.
 */
export default function ShiftCard({ shift, onClick }: ShiftCardProps) {
  return (
    <button
      onClick={() => onClick(shift)}
      className='bg-surface rounded-xl border border-border shadow-card overflow-hidden
                 text-left w-full hover:shadow-card-hover transition-all duration-300
                 group animate-fade-in'
    >
      {/* Facility Image */}
      <div className='relative h-40 sm:h-44 bg-linear-to-br from-blue-50 to-slate-100 overflow-hidden'>
        {/* Placeholder medical building illustration */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='relative w-full h-full'>
            {/* Sky */}
            <div className='absolute inset-0 bg-linear-to-b from-sky-200 via-sky-100 to-sky-50' />
            {/* Buildings */}
            <div className='absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 px-4'>
              {/* Left building */}
              <div className='w-1/4 h-24 bg-linear-to-b from-sky-300 to-sky-400 rounded-t-sm relative'>
                <div className='absolute inset-2 grid grid-cols-3 gap-0.5'>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className='bg-sky-200/60 rounded-[1px]' />
                  ))}
                </div>
              </div>
              {/* Center building (main) */}
              <div className='w-2/5 h-32 bg-linear-to-b from-blue-200 to-blue-300 rounded-t-sm relative'>
                <div className='absolute inset-2 grid grid-cols-4 gap-0.5'>
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className='bg-blue-100/60 rounded-[1px]' />
                  ))}
                </div>
                {/* Red cross medical symbol */}
                <div className='absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow'>
                  <span className='text-red-500 text-xs font-bold'>✚</span>
                </div>
              </div>
              {/* Right building */}
              <div className='w-1/4 h-28 bg-linear-to-b from-slate-200 to-slate-300 rounded-t-sm relative'>
                <div className='absolute inset-2 grid grid-cols-3 gap-0.5'>
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className='bg-slate-100/60 rounded-[1px]' />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300' />
      </div>

      {/* Card Content */}
      <div className='p-4 space-y-2'>
        {/* Facility Name */}
        <h3 className='text-sm font-bold text-text-primary group-hover:text-primary transition-colors'>
          {shift.facilityName}
        </h3>

        {/* Location */}
        <div className='flex items-center gap-1.5 text-text-secondary'>
          <MapPin size={13} className='shrink-0 text-text-muted' />
          <span className='text-xs'>{shift.location}</span>
        </div>

        {/* Date + Time */}
        <div className='flex items-center gap-1.5 text-text-secondary'>
          <Calendar size={13} className='shrink-0 text-text-muted' />
          <span className='text-xs'>
            {shift.date} • {shift.timeFrom} - {shift.timeTo}
          </span>
        </div>

        {/* Pay Rate */}
        <div className='flex items-center gap-1'>
          <span className='text-base font-bold text-primary'>
            ${shift.payRate}
          </span>
          <span className='text-xs text-text-muted'>/hr</span>
        </div>
      </div>
    </button>
  );
}
