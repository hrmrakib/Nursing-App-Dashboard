import baseAPI from "@/redux/api/api";

const supportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getSupport: builder.query({
      query: (params) => ({
        url: "/support/tickets/",
        method: "GET",
        params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetSupportQuery } = supportAPI;
export default supportAPI;
