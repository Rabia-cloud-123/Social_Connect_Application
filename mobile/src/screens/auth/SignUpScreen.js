// ═══════════════════════════════════════════════════════════
// FILE: mobile/src/screens/auth/SignUpScreen.js
// PURPOSE: User Registration Screen
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
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';

import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

import {signUp, clearError} from '../../store/slices/authSlice';

import {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  SHADOW,
} from '../../theme';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),

  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {loading} = useSelector(state => state.auth);

  const handleRegister = async values => {
    dispatch(clearError());

    const result = await dispatch(signUp(values));

    if (signUp.fulfilled.match(result)) {
      Toast.show({
        type: 'success',
        text1: 'Account Created',
        text2: 'Welcome to Social Connect',
      });
    }

    if (signUp.rejected.match(result)) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: result.payload,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.subtitle}>
            Join Social Connect 🚀
          </Text>
        </View>

        {/* Form */}
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleRegister}>

          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>

              {/* Name */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>

                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor={COLORS.textLight}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />

                {touched.name && errors.name && (
                  <Text style={styles.errorText}>
                    {errors.name}
                  </Text>
                )}
              </View>

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

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>

                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={COLORS.textLight}
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />

                {touched.password && errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password}
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
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>

              {/* Login */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}>
                
                <Text style={styles.footerText}>
                  Already have an account? Login
                </Text>
              </TouchableOpacity>

            </View>
          )}
        </Formik>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.lg,
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
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },

  form: {
    gap: SPACING.md,
  },

  inputGroup: {
    marginBottom: SPACING.md,
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
    marginTop: SPACING.md,
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

export default SignUpScreen;