/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Fixed to match your actual API response
export type TUser = {
  id: number;
  profile_pic: string | null;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  delivery_address: string | null;
  delivery_latitude: number | null;
  delivery_longitude: number | null;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
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

    // Matches the { access, refresh, user } shape from your login response
    setUser: (
      state,
      action: PayloadAction<{ user: TUser; access: string; refresh: string }>,
    ) => {
      const { user, access, refresh } = action.payload;
      state.user = user;
      state.access = access;
      state.refresh = refresh;
      state.profileLoading = false;
    },

    logout: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.profileLoading = false;
      // Clean up local storage if you aren't doing it in the component
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
