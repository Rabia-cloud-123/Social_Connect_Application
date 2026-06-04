import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },

    logoutUser: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearError: state => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  loginSuccess,
  logoutUser,
  updateUserProfile,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;