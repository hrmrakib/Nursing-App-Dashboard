"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import {
  useGetAllFacilitiesQuery,
  useCreateFacilityMutation,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
} from "@/redux/features/facilities/facilitiesAPI";
import FacilityCard, { Facility } from "@/components/facilities/facility-card";
import FacilityModal from "@/components/facilities/facility-modal";
import DeleteFacilityModal from "@/components/facilities/delete-facility-modal";
import { useToast } from "@/components/toast";

export default function FacilitiesPage() {
  const { addToast } = useToast();

  // Queries
  const { data: facilitiesResponse, isLoading: isLoadingFacilities } =
    useGetAllFacilitiesQuery({});
  const facilities: Facility[] = facilitiesResponse?.data || [];

  // Mutations
  const [createFacility, { isLoading: isCreating }] =
    useCreateFacilityMutation();
  const [updateFacility, { isLoading: isUpdating }] =
    useUpdateFacilityMutation();
  const [deleteFacility, { isLoading: isDeleting }] =
    useDeleteFacilityMutation();

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null,
  );

  // Handlers
  const handleOpenAddModal = () => {
    setSelectedFacility(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    // Don't clear selectedFacility immediately to avoid UI flashes during close animation
    setTimeout(() => setSelectedFacility(null), 300);
  };

  const handleModalSubmit = async (formData: FormData) => {
    try {
      if (selectedFacility) {
        // Update
        const res = await updateFacility({
          facilityId: selectedFacility.id,
          facilityData: formData,
        }).unwrap();
        if (res.status !== "error") {
          addToast("Facility updated successfully!", "success");
          handleCloseModals();
        }
      } else {
        // Create
        const res = await createFacility(formData).unwrap();
        if (res.status !== "error") {
          addToast("Facility created successfully!", "success");
          handleCloseModals();
        }
      }
    } catch (error: any) {
      addToast(error?.data?.message || "An error occurred", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedFacility) return;
    try {
      const res = await deleteFacility(selectedFacility.id).unwrap();
      if (res.status !== "error") {
        addToast("Facility deleted successfully!", "success");
        handleCloseModals();
      }
    } catch (error: any) {
      addToast(error?.data?.message || "Failed to delete facility", "error");
    }
  };

  return (
    <div className='space-y-6 pb-12'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-900'>Facilities</h1>
        <button
          onClick={handleOpenAddModal}
          className='bg-[#0a1930] hover:bg-[#112240] text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors'
        >
          <Plus size={18} />
          Add Facilities
        </button>
      </div>

      {/* Facilities List */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        {isLoadingFacilities ? (
          <div className='flex justify-center py-12'>
            <div className='w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin'></div>
          </div>
        ) : facilities.length > 0 ? (
          facilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              onEdit={handleOpenEditModal}
              onDelete={handleOpenDeleteModal}
            />
          ))
        ) : (
          <div className='text-center py-12 bg-white rounded-xl border border-gray-100'>
            <h3 className='text-lg font-medium text-gray-900 mb-1'>
              No Facilities Found
            </h3>
            <p className='text-gray-500 mb-4'>
              Get started by adding your first facility.
            </p>
            <button
              onClick={handleOpenAddModal}
              className='bg-[#0a1930] hover:bg-[#112240] text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 font-medium transition-colors'
            >
              <Plus size={18} />
              Add Facility
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <FacilityModal
        isOpen={isModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleModalSubmit}
        facility={selectedFacility}
        isLoading={isCreating || isUpdating}
      />

      <DeleteFacilityModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteConfirm}
        facility={selectedFacility}
        isLoading={isDeleting}
      />
    </div>
  );
}
