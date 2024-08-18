import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[A-ZА-Я]/, 'Name must start with a capital letter')
    .required('Name is required'),
  email: yup
    .string()
    .matches(
      /^[^@]+@[^@]+\.[^@]+$/,
      'Email must contain "@" and a domain (e.g., example@domain.com)'
    )
    .required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-ZА-Я])(?=.*[a-zа-я])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
      'Password must contain at least uppercase letter, lowercase letter, number, special character'
    )
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  gender: yup.string().required('Gender is required'),
  country: yup.string().required('Country is required'),
  terms: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
});

export default validationSchema;
