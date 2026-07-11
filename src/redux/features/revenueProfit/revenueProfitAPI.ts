import baseAPI from "@/redux/api/api";

const revenueProfitAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getRevenueProfit: builder.query({
      query: (params) => ({
        url: `/users/dashboard/commission/`,
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const { useGetRevenueProfitQuery } = revenueProfitAPI;
export default revenueProfitAPI;
