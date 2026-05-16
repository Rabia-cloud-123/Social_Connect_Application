// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/store/slices/authSlice.js
// PURPOSE: Authentication Redux Slice
// ═══════════════════════════════════════════════════════════

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

// ═══════════════════════════════════════════════════════════
// SIGN UP
// ═══════════════════════════════════════════════════════════

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, {rejectWithValue}) => {
    try {
      const {name, email, password} = userData;

      // Firebase Auth Create User
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const uid = response.user.uid;

      // User Object
      const newUser = {
        uid,
        name,
        email,
        bio: '',
        profileImage: '',
        createdAt: new Date().toISOString(),
      };

      // Save User In Firestore
      await firestore()
        .collection('users')
        .doc(uid)
        .set(newUser);

      return newUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ═══════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, {rejectWithValue}) => {
    try {
      const {email, password} = userData;

      // Firebase Login
      const response = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      const uid = response.user.uid;

      // Fetch User Data
      const userDocument = await firestore()
        .collection('users')
        .doc(uid)
        .get();

      return userDocument.data();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ═══════════════════════════════════════════════════════════
// LOGOUT
// ═══════════════════════════════════════════════════════════

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, {rejectWithValue}) => {
    try {
      await auth().signOut();

      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ═══════════════════════════════════════════════════════════
// UPDATE PROFILE
// ═══════════════════════════════════════════════════════════

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (updatedData, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();

      const currentUser = auth.user;

      const updatedUser = {
        ...currentUser,
        ...updatedData,
      };

      // Update Firestore
      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .update(updatedData);

      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// ═══════════════════════════════════════════════════════════
// INITIAL STATE
// ═══════════════════════════════════════════════════════════

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// ═══════════════════════════════════════════════════════════
// SLICE
// ═══════════════════════════════════════════════════════════

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    clearError: state => {
      state.error = null;
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },

  extraReducers: builder => {
    builder

      // ═══════════════════════════════════════════════════
      // SIGN UP
      // ═══════════════════════════════════════════════════

      .addCase(signUp.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ═══════════════════════════════════════════════════
      // LOGIN
      // ═══════════════════════════════════════════════════

      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ═══════════════════════════════════════════════════
      // LOGOUT
      // ═══════════════════════════════════════════════════

      .addCase(logoutUser.pending, state => {
        state.loading = true;
      })

      .addCase(logoutUser.fulfilled, state => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ═══════════════════════════════════════════════════
      // UPDATE PROFILE
      // ═══════════════════════════════════════════════════

      .addCase(updateUserProfile.pending, state => {
        state.loading = true;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════

export const {clearError, setUser} =
  authSlice.actions;

export default authSlice.reducer;