"use client";

import { useEffect, useRef, useState } from "react";
import type Quill from "quill";

import toast from "react-hot-toast";
import {
  useGetSettingContentQuery,
  useUpdateSettingContentMutation,
} from "@/redux/features/settings/settingsAPI";
import { showToast } from "@/lib/toast";
import { formatPerfectDateTime } from "@/utils/formatPerfectDateTime";

const EditTermsAndConditions = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const quillReadyRef = useRef(false);
  const [content, setContent] = useState<string>("");

  const { data } = useGetSettingContentQuery({});
  const [updateAboutUsMutation, { isLoading: isUpdating }] =
    useUpdateSettingContentMutation();

  const existing = data?.data;

  console.log("??????????", existing);

  // Step 1: Init Quill once on mount
  useEffect(() => {
    if (quillReadyRef.current || typeof window === "undefined") return;

    const init = async () => {
      const { default: Quill } = await import("quill");
      await import("quill/dist/quill.snow.css");

      if (editorRef.current && !editorRef.current.querySelector(".ql-editor")) {
        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Enter your terms and conditions...",
        });

        quillRef.current = quill;
        quillReadyRef.current = true;

        quill.on("text-change", () => {
          setContent(quill.root.innerHTML);
        });
      }
    };

    init();
  }, []);

  // Step 2: Once API data is ready AND Quill is ready, populate content
  useEffect(() => {
    if (!existing?.about_us) return;

    // Poll until quillRef is ready (handles async init timing)
    const interval = setInterval(() => {
      if (quillRef.current) {
        quillRef.current.root.innerHTML = existing.about_us;
        setContent(existing.about_us);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [existing?.about_us]);

  const handleSubmit = async () => {
    if (!existing) return;

    if (existing?.about_us == content) {
      showToast.error("Please, update terms and condition before save.");
      return;
    }

    try {
      const res = await updateAboutUsMutation({
        about_us: content,
      }).unwrap();

      if (res.status !== "success") throw new Error(res.message);
      if (res?.status === "success") {
        toast.success("Saved successfully!");
      }
    } catch {
      toast.error("Save failed.");
    }
  };

  return (
    <div className='min-h-[7vh] max-w-full mx-auto flex flex-col justify-between gap-6'>
      <p className='w-full text-sm'>
        <span className='font-semibold'>Last updated:</span>{" "}
        {formatPerfectDateTime(existing?.updated_at)}
      </p>
      <div className='space-y-6'>
        <div className='h-auto border4 rounded-2xl'>
          <div
            ref={editorRef}
            className='min-h-[35vh] bg-white text-base'
            id='quill-editor'
          />
        </div>
      </div>

      <div className='w-full'>
        <div className='pt-2'>
          <button
            onClick={handleSubmit}
            disabled={isUpdating}
            className='min-w-full block px-4 py-3 bg-[#d08726] hover:bg-[#b8751d] text-white font-medium rounded-xl transition-colors disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed'
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTermsAndConditions;
