import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  conversations: {},
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
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

    setMessages: (state, action) => {
      const {conversationId, messages} = action.payload;

      state.conversations[conversationId] = messages;
    },

    addMessage: (state, action) => {
      const {conversationId, message} = action.payload;

      if (!state.conversations[conversationId]) {
        state.conversations[conversationId] = [];
      }

      state.conversations[conversationId].push(message);
    },

    clearConversation: (state, action) => {
      const conversationId = action.payload;

      delete state.conversations[conversationId];
    },

    clearAllChats: state => {
      state.conversations = {};
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setMessages,
  addMessage,
  clearConversation,
  clearAllChats,
} = chatSlice.actions;

export default chatSlice.reducer;