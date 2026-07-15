"use client";

import React from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { Facility } from "./facility-card";

interface DeleteFacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  facility: Facility | null;
  isLoading?: boolean;
}

export default function DeleteFacilityModal({
  isOpen,
  onClose,
  onConfirm,
  facility,
  isLoading,
}: DeleteFacilityModalProps) {
  if (!isOpen || !facility) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Facility</h2>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete <strong>{facility.name}</strong>? This action cannot be undone.
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-70 flex justify-center items-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
