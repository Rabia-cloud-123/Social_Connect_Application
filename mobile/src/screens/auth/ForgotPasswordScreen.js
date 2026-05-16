// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/screens/auth/ForgotPasswordScreen.js
// PURPOSE: Forgot Password Screen
// ═══════════════════════════════════════════════════════════

import React from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';

import Toast from 'react-native-toast-message';

import {useSelector} from 'react-redux';

import auth from '@react-native-firebase/auth';

import {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  SHADOW,
} from '../../theme';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

const ForgotPasswordScreen = ({navigation}) => {
  const {loading} = useSelector(state => state.auth);

  const handleForgotPassword = async values => {
    try {
      await auth().sendPasswordResetEmail(values.email);

      Toast.show({
        type: 'success',
        text1: 'Reset Email Sent',
        text2: 'Please check your email inbox',
      });

      navigation.navigate('Login');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Reset Failed',
        text2: error.message,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Forgot Password
          </Text>

          <Text style={styles.subtitle}>
            Enter your email to receive reset link
          </Text>
        </View>

        {/* Form */}
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleForgotPassword}>

          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>

                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor={COLORS.textLight}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />

                {touched.email && errors.email && (
                  <Text style={styles.errorText}>
                    {errors.email}
                  </Text>
                )}
              </View>

              {/* Button */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={loading}>

                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  <Text style={styles.buttonText}>
                    Send Reset Link
                  </Text>
                )}
              </TouchableOpacity>

              {/* Back To Login */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}>
                
                <Text style={styles.footerText}>
                  Back to Login
                </Text>
              </TouchableOpacity>

            </View>
          )}
        </Formik>

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },

  header: {
    marginBottom: SPACING.xl,
  },

  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '700',
    color: COLORS.text,
  },

  subtitle: {
    marginTop: SPACING.sm,
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
  },

  form: {
    marginTop: SPACING.md,
  },

  inputGroup: {
    marginBottom: SPACING.lg,
  },

  label: {
    marginBottom: SPACING.sm,
    fontWeight: '600',
    color: COLORS.text,
  },

  input: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.text,
    ...SHADOW.sm,
  },

  errorText: {
    marginTop: 4,
    color: COLORS.error,
    fontSize: FONTS.sizes.sm,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONTS.sizes.md,
  },

  footerText: {
    textAlign: 'center',
    marginTop: SPACING.lg,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;