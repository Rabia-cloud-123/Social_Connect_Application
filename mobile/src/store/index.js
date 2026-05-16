// ─────────────────────────────────────────────
// File: mobile/src/store/index.js
// Combines all Redux slices into one store
// ─────────────────────────────────────────────
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,   // current user session
    posts: postReducer,  // feed, create, like, comment
    user: userReducer,   // profile views
  },
  // Redux Toolkit includes redux-thunk by default
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Firebase objects aren't serializable
    }),
});

// TypeScript-style helpers (works in JS too for IDE autocomplete)
export const RootState = store.getState;
export const AppDispatch = store.dispatch;