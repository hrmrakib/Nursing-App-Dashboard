import baseAPI from "@/redux/api/api";

const manageDriversVeterinariansAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllDrivers: builder.query({
      query: (params) => ({
        url: "/users/manage/transport-providers/",
        method: "GET",
        params,
      }),
    }),

    getAllVeterinarians: builder.query({
      query: (params) => ({
        url: "/users/manage/veterinarians/",
        method: "GET",
        params,
      }),
    }),

    getAllSellers: builder.query({
      query: (params) => ({
        url: "/users/manage/sellers/",
        method: "GET",
        params,
      }),
    }),

    acceptUser: builder.mutation({
      query: (id) => ({
        url: `/users/verify/${id}/accept/`,
        method: "POST",
      }),
    }),

    rejectUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/verify/${id}/reject/`,
        method: "POST",
        body: data,
      }),
    }),

    resubmitUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/verify/${id}/resubmit/`,
        method: "POST",
        body: data,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/list/${id}/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllDriversQuery,
  useGetAllVeterinariansQuery,
  useGetAllSellersQuery,
  useAcceptUserMutation,
  useRejectUserMutation,
  useResubmitUserMutation,
  useDeleteUserMutation,
} = manageDriversVeterinariansAPI;
export default manageDriversVeterinariansAPI;
