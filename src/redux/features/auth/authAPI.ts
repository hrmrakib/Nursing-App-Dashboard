/* eslint-disable @typescript-eslint/no-explicit-any */
import baseAPI from "@/redux/api/api";
import { TUser } from "./authSlice";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { data: { user: TUser; access: string; refresh: string }; message: string },
      any
    >({
      query: (body) => ({
        url: "/auth/login/",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password/",
        method: "POST",
        body,
      }),
    }),

    verifyOtp: builder.mutation<{ data: { reset_token: string }; message: string }, { email: string; code: string }>({
      query: (body) => ({
        url: "/auth/forgot-password/verify-otp/",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<{ message: string }, any>({
      query: (body) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body,
      }),
    }),

    verifyEmail: builder.mutation<
      { message: string },
      { email: string; otp: string }
    >({
      query: (payload) => ({
        url: "/auth/verify-email/",
        method: "POST",
        body: payload,
      }),
    }),

    resendOtp: builder.mutation<any, { email: string; purpose: string }>({
      query: (body) => ({
        url: "/auth/resend-otp/",
        method: "POST",
        body,
      }),
    }),

    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),

    // 6. LOGOUT
    logout: builder.mutation<{ detail: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          //   dispatch(logout());
        } catch {
          console.error("Logout failed");
        }
      },
    }),

    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/change-password/",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useGetMeQuery,
  useLogoutMutation,
  useChangePasswordMutation,
} = authAPI;
export default authAPI;
