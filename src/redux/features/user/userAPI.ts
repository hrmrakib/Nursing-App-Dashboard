import baseAPI from "@/redux/api/api";

const userAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users/list/",
        params,
      }),
    }),

    getUserDetails: builder.query<
      void,
      {
        role: string;
        id: string;
        page?: number;
        limit?: number;
        search?: string;
      }
    >({
      query: ({ role, id, page, limit, search }) => ({
        url: `/users/${role}/${id}/analytics/`,
        params: { page, limit, search },
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserDetailsQuery } = userAPI;
