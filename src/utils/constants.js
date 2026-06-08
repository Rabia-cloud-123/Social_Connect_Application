/*
|--------------------------------------------------------------------------
| App Information
|--------------------------------------------------------------------------
*/

export const APP_NAME = 'Social Connect';

export const APP_VERSION = '1.0.0';

/*
|--------------------------------------------------------------------------
| Firestore Collections
|--------------------------------------------------------------------------
*/

export const COLLECTIONS = {
  USERS: 'users',
  POSTS: 'posts',
  CHATS: 'chats',
  NOTIFICATIONS: 'notifications',
};

/*
|--------------------------------------------------------------------------
| Navigation Routes
|--------------------------------------------------------------------------
*/

export const ROUTES = {
  AUTH: 'Auth',
  MAIN: 'Main',

  LOGIN: 'Login',
  SIGNUP: 'Signup',
  FORGOT_PASSWORD: 'ForgotPassword',

  HOME: 'Home',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',

  CREATE_POST: 'CreatePost',
  EDIT_POST: 'EditPost',

  COMMENTS: 'Comments',

  USER_PROFILE: 'UserProfile',
  EDIT_PROFILE: 'EditProfile',

  CHAT: 'Chat',

  SEARCH: 'Search',
  NOTIFICATIONS: 'Notifications',
};

/*
|--------------------------------------------------------------------------
| Notification Types
|--------------------------------------------------------------------------
*/

export const NOTIFICATION_TYPES = {
  LIKE: 'LIKE',
  COMMENT: 'COMMENT',
  FOLLOW: 'FOLLOW',
  MESSAGE: 'MESSAGE',
};

/*
|--------------------------------------------------------------------------
| Limits
|--------------------------------------------------------------------------
*/

export const LIMITS = {
  MAX_POST_LENGTH: 1000,
  MAX_BIO_LENGTH: 250,
  MAX_NAME_LENGTH: 50,
  MIN_PASSWORD_LENGTH: 6,
};

/*
|--------------------------------------------------------------------------
| Default Values
|--------------------------------------------------------------------------
*/

export const DEFAULTS = {
  PROFILE_IMAGE: '',
  USER_BIO: 'No bio added yet.',
};

/*
|--------------------------------------------------------------------------
| Theme Colors
|--------------------------------------------------------------------------
*/

export const COLORS = {
  PRIMARY: '#6C63FF',
  PRIMARY_DARK: '#5146D8',
  SECONDARY: '#F4F6FF',
  ACCENT: '#FF6584',
  WHITE: '#FFFFFF',
  BLACK: '#1F2937',
  GRAY: '#6B7280',
  LIGHT_GRAY: '#E5E7EB',
  CARD: '#FFFFFF',
  DANGER: '#EF4444',
  SUCCESS: '#22C55E',
};