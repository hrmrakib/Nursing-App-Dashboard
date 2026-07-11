"use client";

import { showToast } from "@/lib/toast";
import { Toast } from "react-hot-toast";

interface CardToastProps {
  t: Toast;
  avatarUrl: string;
  title: string;
  message: string;
}

export function ToastCard({ t, avatarUrl, title, message }: CardToastProps) {
  return (
    <div
      className={`${
        t.visible ? "animate-custom-enter" : "animate-custom-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className='flex-1 w-0 p-4'>
        <div className='flex items-start'>
          <div className='shrink-0 pt-0.5'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className='h-10 w-10 rounded-full'
              src={avatarUrl}
              alt={title}
            />
          </div>
          <div className='ml-3 flex-1'>
            <p className='text-sm font-medium text-gray-900'>{title}</p>
            <p className='mt-1 text-sm text-gray-500'>{message}</p>
          </div>
        </div>
      </div>
      <div className='flex border-l border-gray-200'>
        <button
          onClick={() => showToast.dismiss(t.id)}
          className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        >
          Close
        </button>
      </div>
    </div>
  );
}
