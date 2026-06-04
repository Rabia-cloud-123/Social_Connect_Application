import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const CustomButton = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const isDisabled = loading || disabled;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        isDisabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}>
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1877F2',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;