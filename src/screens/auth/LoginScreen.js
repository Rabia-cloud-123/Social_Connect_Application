import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  View,
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
        followers: [],
        following: [],
      };

      dispatch(loginSuccess(mockUser));
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoText}>SC</Text>
      </View>

      <Text style={styles.title}>Social Connect</Text>
      <Text style={styles.subtitle}>Welcome back to your community</Text>

      <View style={styles.card}>
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
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />

              {touched.email && errors.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />

              {touched.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.loginButton}
                activeOpacity={0.85}
                onPress={handleSubmit}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.bottomText}>
                  Don't have an account?{' '}
                  <Text style={styles.boldLink}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F6FF',
    justifyContent: 'center',
    padding: 20,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#6C63FF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    elevation: 5,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    elevation: 4,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginBottom: 10,
    color: '#1F2937',
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 10,
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: '#FF6584',
    padding: 16,
    borderRadius: 14,
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
  },
  linkText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#6C63FF',
    fontWeight: '700',
  },
  bottomText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  boldLink: {
    color: '#6C63FF',
    fontWeight: '800',
  },
});

export default LoginScreen;