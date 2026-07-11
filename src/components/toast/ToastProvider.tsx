"use client";

import { Toaster, ToasterProps } from "react-hot-toast";

export function ToastProvider(props: ToasterProps) {
  return (
    <Toaster
      position='top-right'
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "8px",
          background: "#fff",
          color: "#111",
          fontSize: "14px",
        },
      }}
      {...props}
    />
  );
}
