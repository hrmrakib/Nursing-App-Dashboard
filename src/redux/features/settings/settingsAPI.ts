import baseAPI from "@/redux/api/api";

const settingsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/auth/me/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProfileQuery } = settingsAPI;
export default settingsAPI;
