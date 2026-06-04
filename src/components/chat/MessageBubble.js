import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {formatTime} from '../../utils/helpers';

const MessageBubble = ({
  message,
  currentUserId,
}) => {
  const isCurrentUser =
    message?.senderId === currentUserId;

  return (
    <View
      style={[
        styles.container,
        isCurrentUser
          ? styles.currentUserContainer
          : styles.otherUserContainer,
      ]}>
      <View
        style={[
          styles.bubble,
          isCurrentUser
            ? styles.currentUserBubble
            : styles.otherUserBubble,
        ]}>
        <Text
          style={[
            styles.messageText,
            isCurrentUser
              ? styles.currentUserText
              : styles.otherUserText,
          ]}>
          {message?.text || ''}
        </Text>

        <Text
          style={[
            styles.timeText,
            isCurrentUser
              ? styles.currentUserTime
              : styles.otherUserTime,
          ]}>
          {formatTime(message?.createdAt)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  currentUserContainer: {
    alignItems: 'flex-end',
  },
  otherUserContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  currentUserBubble: {
    backgroundColor: '#1877F2',
  },
  otherUserBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  messageText: {
    fontSize: 15,
  },
  currentUserText: {
    color: '#FFFFFF',
  },
  otherUserText: {
    color: '#222222',
  },
  timeText: {
    fontSize: 11,
    marginTop: 5,
  },
  currentUserTime: {
    color: '#DDE8FF',
    textAlign: 'right',
  },
  otherUserTime: {
    color: '#888888',
  },
});

export default MessageBubble;