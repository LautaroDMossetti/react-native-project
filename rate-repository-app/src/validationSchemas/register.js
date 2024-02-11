import * as yup from 'yup'

export const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username is required')
    .max(30, 'Too long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Too short!')
    .max(50, 'Too long!')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password confirm must match password')
    .required('Password confirm is required')
})
