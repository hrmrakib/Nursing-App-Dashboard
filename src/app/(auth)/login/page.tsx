"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Key } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import InputField from "@/components/auth/InputField";
import AuthButton from "@/components/auth/AuthButton";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/auth/authAPI";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { showToast } from "@/lib/toast";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      
      // Update local storage
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      
      // Update redux state
      dispatch(setUser({
        user: res.data.user,
        access: res.data.access,
        refresh: res.data.refresh,
      }));
      
      showToast.success(res.message || "Logged in successfully");
      router.push("/");
    } catch (err: any) {
      // Error is handled in the custom base query, but we can catch it here if needed
      console.error(err);
    }
  };

  return (
    <AuthCard title="Sign In" backHref="/">
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <InputField
          type="email"
          placeholder="Enter your email"
          icon={<Mail className="w-5 h-5" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <InputField
          type="password"
          placeholder="Enter Password"
          icon={<Key className="w-5 h-5" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between mt-2 mb-6">
          <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-slate-300 text-[#112349] focus:ring-[#112349]"
            />
            Remember me
          </label>
          <Link 
            href="/forgot-password" 
            className="text-sm text-[#112349] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton type="submit" isLoading={isLoading}>
          Sign In
        </AuthButton>
      </form>
    </AuthCard>
  );
}
