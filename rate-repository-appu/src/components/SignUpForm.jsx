import { Formik, useField } from 'formik'
import { StyleSheet, View, Button } from 'react-native'
import StyledTextInput from './StyledTextInput'
import StyledText from './StyledText'
import theme from '../utils/theme'
import { registerValidationSchema } from '../validationSchemas/register'
import { useSignUp } from '../hooks/useSignUp'

const initialValues = {
  username: '',
  password: '',
  confirmPassword: ''
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

const SignUpform = () => {
  const [signUp] = useSignUp()

  const onSubmit = (values) => {
    const { username, password, confirmPassword } = values

    if (password === confirmPassword) {
      signUp(username, password)
    }
  }

  return (
        <Formik validateOnBlur={false} validateOnChange={false} validationSchema={registerValidationSchema} initialValues={initialValues} onSubmit={onSubmit} >
            {({ handleSubmit }) => {
              return (
                    <View style={styles.form}>
                        <FormikValueInput
                            name='username'
                            placeholder='Username'
                            placeholderTextColor={styles.placeholder.color}
                        />
                        <FormikValueInput
                            name='password'
                            placeholder='Password'
                            placeholderTextColor={styles.placeholder.color}
                        />
                        <FormikValueInput
                            name='confirmPassword'
                            placeholder='Confirm password'
                            placeholderTextColor={styles.placeholder.color}
                        />
                        <Button onPress={handleSubmit} title='Register'/>
                    </View>
              )
            }}
        </Formik>
  )
}

export default SignUpform
