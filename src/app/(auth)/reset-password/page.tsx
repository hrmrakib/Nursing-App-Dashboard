"use client";

import React, { useState, Suspense } from "react";
import { Key } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import InputField from "@/components/auth/InputField";
import AuthButton from "@/components/auth/AuthButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/features/auth/authAPI";
import { showToast } from "@/lib/toast";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reset_token = searchParams.get("token") || "";

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return showToast.error("Passwords do not match");
    }

    if (!reset_token) {
      showToast.error("Reset token is missing. Please try again.");
      return router.push("/forgot-password");
    }

    try {
      const res = await resetPassword({ reset_token, password, password_confirm: passwordConfirm }).unwrap();
      showToast.success(res.message || "Password reset successfully");
      router.push("/login");
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <AuthCard 
      title="Verify Email" 
      subtitle="Your password must be 8-10 character long."
      backHref="/verify-code"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <InputField
          type="password"
          placeholder="Enter Password"
          icon={<Key className="w-5 h-5" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          maxLength={10}
        />
        
        <InputField
          type="password"
          placeholder="Re-type Password"
          icon={<Key className="w-5 h-5" />}
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          minLength={8}
          maxLength={10}
          className="mb-4"
        />

        <AuthButton type="submit" isLoading={isLoading}>
          Confirm
        </AuthButton>
      </form>
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
