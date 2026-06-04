import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  error,
  editable = true,
  autoCapitalize = 'none',
  style,
  inputStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text style={styles.label}>
          {label}
        </Text>
      ) : null}

      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          error && styles.errorInput,
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        editable={editable}
        autoCapitalize={autoCapitalize}
        placeholderTextColor="#999999"
        {...props}
      />

      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    color: '#222222',
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  errorInput: {
    borderColor: '#E53935',
  },
  errorText: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomInput;