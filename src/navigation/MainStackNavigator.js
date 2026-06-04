import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import CreatePostScreen from '../screens/posts/CreatePostScreen';
import EditPostScreen from '../screens/posts/EditPostScreen';
import CommentsScreen from '../screens/comments/CommentsScreen';
import UserProfileScreen from '../screens/profile/UserProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import SearchScreen from '../screens/search/SearchScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{title: 'Create Post'}}
      />

      <Stack.Screen
        name="EditPost"
        component={EditPostScreen}
        options={{title: 'Edit Post'}}
      />

      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{title: 'Comments'}}
      />

      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{title: 'User Profile'}}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />

      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{title: 'Chat'}}
      />

      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{title: 'Search'}}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{title: 'Notifications'}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;