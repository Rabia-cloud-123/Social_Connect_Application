import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';

import {loginSuccess} from '../../store/slices/authSlice';

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const handleLogin = values => {
    try {
      const mockUser = {
        id: Date.now().toString(),
        name: 'Social Connect User',
        email: values.email,
        bio: '',
        profilePicture: '',
      };

      dispatch(loginSuccess(mockUser));
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Social Connect</Text>
      <Text style={styles.subtitle}>Welcome Back</Text>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}>
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

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />

            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.linkText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.linkText}>
                Don't have an account? Sign Up
              </Text>
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
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
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
  loginButton: {
    backgroundColor: '#1877F2',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  loginButtonText: {
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

export default LoginScreen;