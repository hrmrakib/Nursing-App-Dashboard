import baseAPI from "@/redux/api/api";

const nurseAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllNurse: builder.query({
      query: (params) => ({
        url: "/nurses/",
        method: "GET",
        params: params ?? {},
      }),
      providesTags: ["Nurse"],
    }),

    getSingleNurse: builder.query({
      query: (id) => ({
        url: `/nurses/${id}/`,
      }),
      providesTags: ["Nurse"],
    }),

    nurseReview: builder.mutation({
      query: ({ id, action }) => ({
        url: `/api/v1/nurses/${id}/review/`,
        method: "POST",
        body: { action },
      }),
      invalidatesTags: ["Nurse"],
    }),
  }),
});

export const {
  useGetAllNurseQuery,
  useGetSingleNurseQuery,
  useNurseReviewMutation,
} = nurseAPI;
export default nurseAPI;
