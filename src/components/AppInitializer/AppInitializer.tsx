"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setProfileLoading, setUser } from "@/redux/features/auth/authSlice";
import { useGetProfileQuery } from "@/redux/features/settings/settingsAPI";

export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  // Safely grab the access token from localStorage
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  // Fetch profile data, skipping if there's no token present
  const { data, isLoading } = useGetProfileQuery({}, { skip: !token });

  // Sync the RTK Query loading state with the Auth Slice loading state
  useEffect(() => {
    if (!token) {
      dispatch(setProfileLoading(false));
      return;
    }

    dispatch(setProfileLoading(isLoading));
  }, [isLoading, token, dispatch]);

  // Dispatch user details once API successfully returns data
  useEffect(() => {
    if (data?.data) {
      dispatch(
        setUser({
          user: data.data,
          access: token, // Fixed: Changed 'token' to 'access' to match TAuthState shape
        }),
      );
    }
  }, [data, token, dispatch]);

  return children;
}
