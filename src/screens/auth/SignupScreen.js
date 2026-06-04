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

const signupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignupScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const handleSignup = values => {
    try {
      const mockUser = {
        id: Date.now().toString(),
        name: values.name,
        email: values.email,
        bio: '',
        profilePicture: '',
      };

      dispatch(loginSuccess(mockUser));
    } catch (error) {
      Alert.alert('Error', 'Signup failed');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join Social Connect</Text>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signupValidationSchema}
        onSubmit={handleSignup}>
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
              placeholder="Full Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />

            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

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

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
            />

            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword}
              </Text>
            )}

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSubmit}>
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>
                Already have an account? Login
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
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
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
  signupButton: {
    backgroundColor: '#1877F2',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  signupButtonText: {
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

export default SignupScreen;