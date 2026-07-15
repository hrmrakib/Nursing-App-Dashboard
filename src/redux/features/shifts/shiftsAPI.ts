import baseAPI from "@/redux/api/api";

const shiftsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllShiftsAssignments: builder.query({
      query: (params) => ({
        url: "/shifts/assignments/",
        method: "GET",
        params: params ?? {},
      }),
      providesTags: ["Shift"],
    }),
  }),
});

export const { useGetAllShiftsAssignmentsQuery } = shiftsAPI;
export default shiftsAPI;
