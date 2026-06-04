import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const signupValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),

  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password')],
      'Passwords do not match',
    )
    .required('Confirm password is required'),
});

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

export const createPostValidationSchema = Yup.object({
  content: Yup.string()
    .trim()
    .min(1, 'Post content is required')
    .max(
      1000,
      'Post content cannot exceed 1000 characters',
    )
    .required('Post content is required'),
});

export const editProfileValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),

  bio: Yup.string()
    .max(250, 'Bio cannot exceed 250 characters'),
});