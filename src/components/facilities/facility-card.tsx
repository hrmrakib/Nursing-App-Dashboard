import React from "react";
import Image from "next/image";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export interface Facility {
  id: number;
  image: string;
  shift_count: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  latitude: string;
  longitude: string;
  phone: string;
  email: string;
  created_at: string;
}

interface FacilityCardProps {
  facility: Facility;
  onEdit: (facility: Facility) => void;
  onDelete: (facility: Facility) => void;
}

export default function FacilityCard({
  facility,
  onEdit,
  onDelete,
}: FacilityCardProps) {
  const router = useRouter();
  return (
    <div className='bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm border border-gray-100 w-full max-w-2xl'>
      {/* Image */}
      <div className='relative w-16 h-16 md:w-48 md:h-48 rounded-lg overflow-hidden shrink-0 bg-gray-100'>
        {facility.image ? (
          <Image
            src={facility.image}
            alt={facility.name}
            fill
            className='object-cover'
            unoptimized // Since API returns external URLs we might not have in next.config
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-gray-400'>
            No Image
          </div>
        )}
      </div>

      {/* Info */}
      <div className='flex flex-col flex-1'>
        <h3 className='text-lg font-semibold text-gray-900'>{facility.name}</h3>
        <div className='flex flex-col gap-1 mt-1 text-sm text-gray-500'>
          <div className='flex items-start'>
            <MapPin className='w-4 h-4 mr-2 text-gray-400 mt-0.5 shrink-0' />
            <span className='line-clamp-2'>
              {facility.address && facility.city
                ? `${facility.address}, ${facility.city}`
                : facility.address || facility.city || "No Location"}
              {facility.state ? `, ${facility.state}` : ""}
              {facility.zip_code ? ` ${facility.zip_code}` : ""}
            </span>
          </div>
          {facility.phone && (
            <div className='flex items-center'>
              <span className='w-4 h-4 mr-2 text-gray-400 flex justify-center'>
                📞
              </span>
              <span className='truncate'>{facility.phone}</span>
            </div>
          )}
          {facility.email && (
            <div className='flex items-center'>
              <span className='w-4 h-4 mr-2 text-gray-400 flex justify-center'>
                ✉️
              </span>
              <span className='truncate'>{facility.email}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className='flex items-center gap-2 mt-4 pt-3 border-t border-gray-50'>
          <button
            onClick={() =>
              router.push(`/shift-management/add?facilityId=${facility.id}`)
            }
            title='Add Shift'
            className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors'
          >
            <Plus className='w-4 h-4' />
          </button>
          <button
            onClick={() => onEdit(facility)}
            title='Edit Facility'
            className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors'
          >
            <Pencil className='w-4 h-4' />
          </button>
          <button
            onClick={() => onDelete(facility)}
            title='Delete Facility'
            className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-red-100 hover:text-red-600 transition-colors'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
