import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function useAuth() {
  // Select the auth slice directly for cleaner access
  const { user, access, profileLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  return {
    user,
    access,
    profileLoading,

    isLoggedIn: !!user && !!access,

    isVerified: user?.is_active ?? false,

    isAdmin: user?.role === "admin",
  };
}
