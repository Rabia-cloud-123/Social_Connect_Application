// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/store/slices/postSlice.js
// FOLDER: mobile → src → store → slices
// PURPOSE: Global state for feed posts, creating posts,
//          toggling likes, and adding/fetching comments
// ═══════════════════════════════════════════════════════════

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/apiClient';

// ── Async Thunks ─────────────────────────────

// Fetch paginated feed
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ limit = 20, startAfter = null } = {}, { rejectWithValue }) => {
    try {
      const params = { limit };
      if (startAfter) params.startAfter = startAfter;
      const res = await api.get('/posts', { params });
      return res.data; // { posts, nextCursor }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Create a new post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ text, imageURL }, { rejectWithValue }) => {
    try {
      const res = await api.post('/posts', { text, imageURL });
      return res.data.post;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Delete a post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      await api.delete(`/posts/${postId}`);
      return postId;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Toggle like on a post
export const toggleLike = createAsyncThunk(
  'posts/toggleLike',
  async (postId, { rejectWithValue }) => {
    try {
      const res = await api.post(`/posts/${postId}/like`);
      return { postId, ...res.data }; // { postId, liked, likesCount }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Fetch comments for a post
export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/posts/${postId}/comments`);
      return { postId, comments: res.data.comments };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Add a comment
export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postId, text }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/posts/${postId}/comments`, { text });
      return { postId, comment: res.data.comment };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// Fetch posts by a specific user (for profile screen)
export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/posts/user/${userId}`);
      return res.data.posts;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// ── Slice ────────────────────────────────────
const postSlice = createSlice({
  name: 'posts',
  initialState: {
    feed: [],              // array of post objects
    userPosts: [],         // posts for profile view
    comments: {},          // { [postId]: [comment, ...] }
    nextCursor: null,      // for pagination
    loading: false,
    loadingMore: false,    // separate flag for "load more" spinner
    creating: false,
    error: null,
  },
  reducers: {
    clearPosts: (state) => {
      state.feed = [];
      state.nextCursor = null;
    },
    // Called by Realtime Database listener to update live like count
    updateLiveCount: (state, action) => {
      const { postId, likesCount } = action.payload;
      const post = state.feed.find(p => p.id === postId);
      if (post) post.likesCount = likesCount;
    },
  },
  extraReducers: (builder) => {
    // fetchPosts
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        // If paginating, use loadingMore; otherwise main loader
        if (action.meta.arg?.startAfter) state.loadingMore = true;
        else state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        if (action.meta.arg?.startAfter) {
          // Append to existing feed (pagination)
          state.feed = [...state.feed, ...action.payload.posts];
        } else {
          // Fresh load — replace feed
          state.feed = action.payload.posts;
        }
        state.nextCursor = action.payload.nextCursor;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.loadingMore = false;
        state.error = action.payload;
      })

    // createPost
      .addCase(createPost.pending, (state) => { state.creating = true; })
      .addCase(createPost.fulfilled, (state, action) => {
        state.creating = false;
        // Prepend new post to feed
        state.feed = [action.payload, ...state.feed];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })

    // deletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        state.feed = state.feed.filter(p => p.id !== action.payload);
        state.userPosts = state.userPosts.filter(p => p.id !== action.payload);
      })

    // toggleLike — optimistic update
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, liked, likesCount } = action.payload;
        const post = state.feed.find(p => p.id === postId);
        if (post) {
          post.likedByMe = liked;
          post.likesCount = likesCount;
        }
      })

    // fetchComments
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments[action.payload.postId] = action.payload.comments;
      })

    // addComment
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        if (!state.comments[postId]) state.comments[postId] = [];
        state.comments[postId].push(comment);
        // Increment local count
        const post = state.feed.find(p => p.id === postId);
        if (post) post.commentsCount = (post.commentsCount || 0) + 1;
      })

    // fetchUserPosts
      .addCase(fetchUserPosts.pending, (state) => { state.loading = true; })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPosts, updateLiveCount } = postSlice.actions;
export default postSlice.reducer;