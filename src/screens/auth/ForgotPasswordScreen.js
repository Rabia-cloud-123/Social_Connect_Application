import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

const ForgotPasswordScreen = ({navigation}) => {
  const handleResetPassword = values => {
    Alert.alert(
      'Password Reset',
      `Password reset link sent to ${values.email}`,
    );

    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email to reset your password
      </Text>

      <Formik
        initialValues={{email: ''}}
        validationSchema={forgotPasswordValidationSchema}
        onSubmit={handleResetPassword}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />

            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleSubmit}>
              <Text style={styles.resetButtonText}>
                Send Reset Link
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Back to Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  resetButton: {
    backgroundColor: '#1877F2',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  resetButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  linkText: {
    textAlign: 'center',
    marginTop: 15,
    color: '#1877F2',
    fontWeight: '500',
  },
});

export default ForgotPasswordScreen;