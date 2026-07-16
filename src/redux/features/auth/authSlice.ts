/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Updated to perfectly match your actual API response data structure
export type TUser = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  profile_picture: string | null; // Fixed from profile_pic
  is_active: boolean;
  onboarding_complete: boolean; // Added from API
  date_joined: string; // Fixed from created_at/updated_at
};

type TAuthState = {
  userToggle: boolean;
  user: TUser | null;
  access: string | null;
  refresh: string | null;
  profileLoading?: boolean;
};

const initialState: TAuthState = {
  userToggle: false,
  user: null,
  access: null,
  refresh: null,
  profileLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userTrack: (state) => {
      state.userToggle = !state.userToggle;
    },

    // Handles setting the user details
    setUser: (
      state,
      action: PayloadAction<{
        user: TUser;
        access?: string | null;
        refresh?: string | null;
      }>,
    ) => {
      const { user, access, refresh } = action.payload;
      state.user = user;

      // Only update tokens if they are passed in the payload (e.g., during login)
      if (access !== undefined) state.access = access;
      if (refresh !== undefined) state.refresh = refresh;

      state.profileLoading = false;
    },

    logout: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.profileLoading = false;

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },

    setProfileLoading: (state, action: PayloadAction<boolean>) => {
      state.profileLoading = action.payload;
    },
  },
});

export const { userTrack, setUser, logout, setProfileLoading } =
  authSlice.actions;

export default authSlice.reducer;
