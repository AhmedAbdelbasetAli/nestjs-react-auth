import * as yup from 'yup';

// Sign In Schema
export const signinSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

// Sign Up Schema
export const signupSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  name: yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Minimum 8 characters')
    .matches(/[a-zA-Z]/, 'At least one letter')
    .matches(/[0-9]/, 'At least one number')
    .matches(/[^a-zA-Z0-9]/, 'At least one special character'),
});