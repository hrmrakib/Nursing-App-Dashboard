import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/redux/features/Providers";

export const metadata: Metadata = {
  title: "IAC Staffing Dashboard",
  description:
    "IAC Staffing nursing management dashboard — manage nurses, shifts, applications, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full'>
      <body className='min-h-full bg-surface-alt'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
