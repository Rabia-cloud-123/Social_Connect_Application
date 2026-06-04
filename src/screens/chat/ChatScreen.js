import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';

import MessageBubble from '../../components/chat/MessageBubble';
import {
  sendMessage,
  subscribeToMessages,
} from '../../services/chatService';

const ChatScreen = ({route}) => {
  const {user} = useSelector(state => state.auth);
  const {receiver} = route.params;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToMessages(
      user.id,
      receiver.id,
      setMessages,
    );

    return unsubscribe;
  }, [user.id, receiver.id]);

  const handleSendMessage = async () => {
    if (!text.trim()) {
      return;
    }

    await sendMessage({
      senderId: user.id,
      receiverId: receiver.id,
      text,
    });

    setText('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Text style={styles.header}>
          Chat with {receiver.name || 'User'}
        </Text>

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <MessageBubble
              message={item}
              currentUserId={user.id}
            />
          )}
          contentContainerStyle={styles.messageList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={text}
            onChangeText={setText}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  messageList: {
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F3F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#1877F2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ChatScreen;