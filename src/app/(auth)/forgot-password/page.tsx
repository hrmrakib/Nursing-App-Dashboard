"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import InputField from "@/components/auth/InputField";
import AuthButton from "@/components/auth/AuthButton";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/features/auth/authAPI";
import { showToast } from "@/lib/toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      showToast.success(res.message || "OTP sent successfully");
      router.push(`/verify-code?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <AuthCard title="Forget Password" backHref="/login">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          type="email"
          placeholder="Enter your email ..."
          icon={<Mail className="w-5 h-5" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthButton type="submit" isLoading={isLoading} className="mt-4">
          Send OTP
        </AuthButton>
      </form>
    </AuthCard>
  );
}
