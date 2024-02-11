import { Formik, useField } from 'formik'
import { Button, StyleSheet, View } from 'react-native'
import { reviewValidationSchema } from '../validationSchemas/review'
import { useCreateReview } from '../hooks/useCreateReview'
import StyledTextInput from './StyledTextInput'
import StyledText from './StyledText'
import theme from '../utils/theme'

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: ''
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 20,
    marginTop: -5
  },
  form: {
    margin: 12
  },
  placeholder: {
    color: theme.colors.secondary
  }
})

const FormikValueInput = ({ name, ...restOfProps }) => {
  const [field, meta, helpers] = useField(name)

  return (
        <>
            <StyledTextInput
                error={meta.error}
                value={field.value}
                onChangeText={value => helpers.setValue(value)}
                {...restOfProps}
            />
            {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
        </>
  )
}

const ReviewForm = () => {
  const [createReview] = useCreateReview()

  const onSubmit = (values) => {
    const { ownerName, rating, repositoryName, text } = values
    createReview(ownerName, rating, repositoryName, text)
  }

  return (
        <Formik validateOnBlur={false} validateOnChange={false} validationSchema={reviewValidationSchema} initialValues={initialValues} onSubmit={onSubmit} >
            {({ handleSubmit }) => {
              return (
                    <View style={styles.form}>
                        <FormikValueInput
                            placeholder='Repository Name'
                            name='repositoryName'
                            placeholderTextColor={styles.placeholder.color}
                        />
                        <FormikValueInput
                            placeholder='Repository Owner (GitHub Username)'
                            name='ownerName'
                            placeholderTextColor={styles.placeholder.color}
                        />
                        <FormikValueInput
                            placeholder='Give your rating'
                            name='rating'
                            placeholderTextColor={styles.placeholder.color}
                        />
                        <FormikValueInput
                            placeholder='Write your review (optional)'
                            name='text'
                            placeholderTextColor={styles.placeholder.color}
                            multiline
                        />
                        <Button onPress={handleSubmit} title='Submit Review'/>
                    </View>
              )
            }}
        </Formik>
  )
}

export default ReviewForm
