import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ErrorView = ({
  message = 'Something went wrong.',
  buttonText = 'Try Again',
  onRetry,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>

      <Text style={styles.title}>
        Oops!
      </Text>

      <Text style={styles.message}>
        {message}
      </Text>

      {onRetry ? (
        <TouchableOpacity
          style={styles.button}
          onPress={onRetry}>
          <Text style={styles.buttonText}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1877F2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default ErrorView;