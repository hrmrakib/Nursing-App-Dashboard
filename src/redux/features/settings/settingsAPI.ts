import baseAPI from "@/redux/api/api";

const settingsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/auth/me/",
        method: "GET",
      }),
    }),

    getSettingContent: builder.query({
      query: () => ({
        url: "/settings/",
        method: "GET",
      }),
    }),

    updateSettingContent: builder.mutation({
      query: (data) => ({
        url: "/admin/settings/update/",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetSettingContentQuery,
  useUpdateSettingContentMutation,
} = settingsAPI;
export default settingsAPI;
