import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';

const Loader = ({
  visible = true,
  text = 'Loading...',
  size = 'large',
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size}
        color="#1877F2"
      />

      {text ? (
        <Text style={styles.loadingText}>
          {text}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
});

export default Loader;