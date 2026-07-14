import baseAPI from "@/redux/api/api";

const nurseAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllNurse: builder.query({
      query: (params) => ({
        url: "/nurses/admin/",
        method: "GET",
        params,
      }),
      providesTags: ["Nurse"],
    }),
  }),
});

export const { useGetAllNurseQuery } = nurseAPI;
export default nurseAPI;
