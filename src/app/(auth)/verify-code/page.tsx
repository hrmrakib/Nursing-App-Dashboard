"use client";

import React, { useState, Suspense } from "react";
import AuthCard from "@/components/auth/AuthCard";
import OtpInput from "@/components/auth/OtpInput";
import AuthButton from "@/components/auth/AuthButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyOtpMutation } from "@/redux/features/auth/authAPI";
import { showToast } from "@/lib/toast";

function VerifyCodeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [otpValue, setOtpValue] = useState("");

  const handleVerify = async () => {
    if (otpValue.length !== 6) return;
    if (!email) {
      showToast.error("Email not found. Please try again.");
      return router.push("/forgot-password");
    }
    
    try {
      const res = await verifyOtp({ email, code: otpValue }).unwrap();
      showToast.success(res.message || "OTP verified successfully");
      router.push(`/reset-password?token=${res.data.reset_token}`);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <AuthCard title="Verify Email" backHref="/forgot-password">
      <div className="flex flex-col">
        <OtpInput 
          length={6} 
          onComplete={(otp) => setOtpValue(otp)} 
        />

        <AuthButton 
          type="button" 
          onClick={handleVerify}
          isLoading={isLoading} 
          disabled={otpValue.length !== 6}
        >
          Verify
        </AuthButton>

        <p className="text-center text-sm text-slate-500 mt-6">
          Please enter the OTP we have sent you in your email.
        </p>
      </div>
    </AuthCard>
  );
}

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyCodeContent />
    </Suspense>
  );
}
