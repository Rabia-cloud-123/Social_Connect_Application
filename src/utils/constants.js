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
  PRIMARY: '#1877F2',
  SECONDARY: '#F5F7FA',
  WHITE: '#FFFFFF',
  BLACK: '#222222',
  GRAY: '#777777',
  LIGHT_GRAY: '#DDDDDD',
  DANGER: '#E53935',
  SUCCESS: '#4CAF50',
};