import baseAPI from "@/redux/api/api";

const shiftsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllShiftsAssignments: builder.query({
      query: (params) => ({
        url: "/shifts/shift/",
        method: "GET",
        params: params ?? {},
      }),
      providesTags: ["Shift"],
    }),

    getSingleShiftAssignment: builder.query({
      query: (id) => ({
        url: `/shifts/shift/${id}/`,
      }),
      providesTags: ["Shift"],
    }),

    createShiftAssignment: builder.mutation({
      query: (data) => ({
        url: "/shifts/shift/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Shift"],
    }),

    updateShiftAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/shifts/shift/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Shift"],
    }),

    deleteShiftAssignment: builder.mutation({
      query: (id) => ({
        url: `/shifts/shift/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Shift"],
    }),
  }),
});

export const {
  useGetAllShiftsAssignmentsQuery,
  useGetSingleShiftAssignmentQuery,
  useCreateShiftAssignmentMutation,
  useUpdateShiftAssignmentMutation,
  useDeleteShiftAssignmentMutation,
} = shiftsAPI;
export default shiftsAPI;
