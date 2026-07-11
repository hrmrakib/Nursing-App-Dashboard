import baseAPI from "@/redux/api/api";

interface INotification {
  title: string;
  message: string;
  role?: string;
  user_id?: string;
}

const notificationAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    sendNotification: builder.mutation<void, INotification>({
      query: (notification) => ({
        url: "/users/notifications/send/",
        method: "POST",
        body: notification,
      }),
    }),

    getUserNotifications: builder.query({
      query: () => ({
        url: "/users/notifications/user/",
        method: "GET",
      }),
    }),

    deleteUserNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/users/notifications/${notificationId}/delete/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSendNotificationMutation,
  useGetUserNotificationsQuery,
  useDeleteUserNotificationMutation,
} = notificationAPI;
export default notificationAPI;
