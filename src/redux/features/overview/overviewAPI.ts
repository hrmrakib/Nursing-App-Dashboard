import baseAPI from "@/redux/api/api";

const overviewAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: () => ({
        url: "/users/dashboard/",
        method: "GET",
      }),
    }),

    getPercentage: builder.query({
      query: () => ({
        url: "/users/dashboard/usage-percentages/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOverviewQuery, useGetPercentageQuery } = overviewAPI;
export default overviewAPI;
