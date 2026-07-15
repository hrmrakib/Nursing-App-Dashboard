import baseAPI from "@/redux/api/api";

const facilitiesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: () => ({
        url: "/facilities/",
        method: "GET",
      }),
      providesTags: ["Facility"],
    }),

    getSingleFacility: builder.query({
      query: (facilityId) => ({
        url: `/facilities/${facilityId}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Facility", id }],
    }),

    createFacility: builder.mutation({
      query: (facilityData) => ({
        url: "/facilities/",
        method: "POST",
        body: facilityData,
      }),
      invalidatesTags: ["Facility"],
    }),

    updateFacility: builder.mutation({
      query: ({ facilityId, facilityData }) => ({
        url: `/facilities/${facilityId}/`,
        method: "PATCH",
        body: facilityData,
      }),
      invalidatesTags: ["Facility"],
    }),

    deleteFacility: builder.mutation({
      query: (facilityId) => ({
        url: `/facilities/${facilityId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Facility"],
    }),
  }),
});

export const {
  useGetAllFacilitiesQuery,
  useGetSingleFacilityQuery,
  useCreateFacilityMutation,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
} = facilitiesAPI;
export default facilitiesAPI;
