import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearError: state => {
      state.error = null;
    },

    setNotifications: (state, action) => {
      state.notifications = action.payload;

      state.unreadCount = action.payload.filter(
        item => !item.isRead,
      ).length;
    },

    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);

      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },

    markAsRead: (state, action) => {
      const notificationId = action.payload;

      const notification = state.notifications.find(
        item => item.id === notificationId,
      );

      if (notification && !notification.isRead) {
        notification.isRead = true;

        state.unreadCount = Math.max(
          0,
          state.unreadCount - 1,
        );
      }
    },

    clearNotifications: state => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setNotifications,
  addNotification,
  markAsRead,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;