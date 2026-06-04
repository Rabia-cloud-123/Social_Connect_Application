import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },

    updatePost: (state, action) => {
      const updatedPost = action.payload;

      state.posts = state.posts.map(post =>
        post.id === updatedPost.id ? {...post, ...updatedPost} : post,
      );
    },

    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        post => post.id !== action.payload,
      );
    },

    toggleLike: (state, action) => {
      const {postId, userId} = action.payload;

      const post = state.posts.find(item => item.id === postId);

      if (post) {
        if (!post.likes) {
          post.likes = [];
        }

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
          post.likes = post.likes.filter(id => id !== userId);
        } else {
          post.likes.push(userId);
        }
      }
    },

    addComment: (state, action) => {
      const {postId, comment} = action.payload;

      const post = state.posts.find(item => item.id === postId);

      if (post) {
        if (!post.comments) {
          post.comments = [];
        }

        post.comments.push(comment);
      }
    },

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
  },
});

export const {
  setPosts,
  addPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  setLoading,
  setError,
  clearError,
} = postSlice.actions;

export default postSlice.reducer;