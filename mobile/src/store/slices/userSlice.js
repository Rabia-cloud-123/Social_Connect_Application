// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/store/slices/userSlice.js
// FOLDER: mobile → src → store → slices
// PURPOSE: Fetch and cache other users' profiles
// ═══════════════════════════════════════════════════════════

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiClient';

// Fetch any user's public profile (used on UserProfileScreen)
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/${userId}`);
      return res.data.user;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Search users by name
export const searchUsers = createAsyncThunk(
  'user/searchUsers',
  async (query, { rejectWithValue }) => {
    try {
      const res = await api.get('/users/search', { params: { q: query } });
      return res.data.users;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profileCache: {}, // { [userId]: profileObject } — avoids re-fetching
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSearch: (state) => { state.searchResults = []; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => { state.loading = true; })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        // Cache by uid so repeated visits don't refetch
        state.profileCache[action.payload.uid] = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchUsers.pending, (state) => { state.loading = true; })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearch } = userSlice.actions;
export default userSlice.reducer;