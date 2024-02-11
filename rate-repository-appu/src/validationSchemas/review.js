import * as yup from 'yup'

export const reviewValidationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required('Repository name required'),
  ownerName: yup
    .string()
    .required('Repository owner username required'),
  rating: yup
    .number()
    .min(0, 'Between 0 and 100')
    .max(100, 'Between 0 and 100')
    .required('Score rating required'),
  text: yup
    .string()
    .optional()
})
