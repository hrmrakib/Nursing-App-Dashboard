/* eslint-disable @typescript-eslint/no-explicit-any */
import baseAPI from "@/redux/api/api";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
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

    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/users/forgot-password/",
        method: "POST",
        body: payload,
      }),
    }),

    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/reset-password/",
        method: "POST",
        body: payload,
      }),
    }),

    verifyResetOtp: builder.mutation({
      query: (payload) => ({
        url: "/auth/verify-reset-otp/",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useVerifyEmailMutation,
  useResendOtpMutation,
  useGetMeQuery,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyResetOtpMutation,
} = authAPI;
export default authAPI;
