"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, MapPin, Building2, UploadCloud } from "lucide-react";
import { Facility } from "./facility-card";
import CommonLocationInput from "../common-location-input";

interface FacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  facility: Facility | null;
  isLoading?: boolean;
}

export default function FacilityModal({
  isOpen,
  onClose,
  onSubmit,
  facility,
  isLoading,
}: FacilityModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (facility) {
        setName(facility.name || "");
        setAddress(facility.address || "");
        setCity(facility.city || "");
        setStateCode(facility.state || "");
        setZip(facility.zip_code || "");
        setPhone(facility.phone || "");
        setEmail(facility.email || "");
        setLatitude(facility.latitude || "");
        setLongitude(facility.longitude || "");
        setPreviewImage(facility.image || null);
      } else {
        setName("");
        setAddress("");
        setCity("");
        setStateCode("");
        setZip("");
        setPhone("");
        setEmail("");
        setLatitude("");
        setLongitude("");
        setPreviewImage(null);
      }
    }
  }, [isOpen, facility]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("city", city);
    if (stateCode) formData.append("state", stateCode);
    if (zip) formData.append("zip_code", zip);
    if (phone) formData.append("phone", phone);
    if (email) formData.append("email", email);
    if (latitude) formData.append("latitude", latitude);
    if (longitude) formData.append("longitude", longitude);

    // Get file if newly uploaded
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append("image", file);
    }

    onSubmit(formData);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 text-center flex-1">
              {facility ? "Edit Facility" : "Add Facility"}
            </h2>
            <button
              onClick={onClose}
              className="absolute right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 overflow-y-auto">
            <form id="facility-form" onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Facility Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Building2 size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter facility name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <CommonLocationInput
                  label="Address (Location)"
                  value={address}
                  onChange={(res) => {
                    if (res) {
                      setAddress(res.address);
                      setLatitude(res.lat.toString());
                      setLongitude(res.lng.toString());
                    } else {
                      setAddress("");
                      setLatitude("");
                      setLongitude("");
                    }
                  }}
                  placeholder="Enter address"
                  className="pl-10" // To leave room for the MapPin if we want, but CommonLocationInput doesn't have an icon slot easily. Let's just pass basic classes.
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value)}
                    placeholder="State"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="Zip"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="col-span-2 mb-1">
                  <label className="block text-sm font-semibold text-gray-700">
                    Coordinates (Auto-filled from Address)
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    readOnly
                    value={latitude}
                    placeholder="Latitude"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    readOnly
                    value={longitude}
                    placeholder="Longitude"
                    className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Facility Image
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer transition-colors ${
                    previewImage ? "border-blue-200 bg-blue-50" : "border-gray-300 hover:border-blue-400"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  {previewImage ? (
                    <div className="relative w-full h-32 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="mx-auto flex justify-center text-gray-400 mb-2">
                        <UploadCloud size={24} />
                      </div>
                      <span className="text-sm text-gray-500">Upload image</span>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="p-6 border-t border-gray-100">
            <button
              type="submit"
              form="facility-form"
              disabled={isLoading}
              className="w-full py-3 bg-[#0a1930] hover:bg-[#112240] text-white rounded-lg font-semibold transition-colors disabled:opacity-70 flex justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : facility ? (
                "Update Facility"
              ) : (
                "Add Facility"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
