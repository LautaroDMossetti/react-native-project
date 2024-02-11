import { StyleSheet, View, Button, Text } from 'react-native'
import { Formik, useField } from 'formik'
import StyledTextInput from '../components/StyledTextInput.jsx'
import StyledText from '../components/StyledText.jsx'
import { loginValidationSchema } from '../validationSchemas/login.js'
import { useSignIn } from '../hooks/useSingIn.js'
import { useState } from 'react'
import theme from '../utils/theme.js'

const initialValues = {
  username: '',
  password: ''
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

export const LogInPageContainer = ({ onSubmit, error }) => {
  return (
    <View>
      <Formik validateOnBlur={false} validateOnChange={false} validationSchema={loginValidationSchema} initialValues={initialValues} onSubmit={onSubmit} >
          {({ handleSubmit }) => {
            return (
              <View style={styles.form}>
                <FormikValueInput
                  placeholder='Username or E-mail'
                  name='username'
                  placeholderTextColor={styles.placeholder.color}
                />
                <FormikValueInput
                  placeholder='Password'
                  name='password'
                  placeholderTextColor={styles.placeholder.color}
                  secureTextEntry
                />
                <Button onPress={handleSubmit} title='Log In' />
              </View>
            )
          }}
      </Formik>
      <View>
        <Text style={styles.error}>
          {error}
        </Text>
      </View>
    </View>
  )
}

const LogInPage = () => {
  const [signIn] = useSignIn()
  const [error, setError] = useState('')

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await signIn({ username, password })
    } catch (e) {
      console.log(e)
      setError('Wrong Credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  return (
    <LogInPageContainer onSubmit={onSubmit} error={error} />
  )
}

export default LogInPage
