import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'
import { useSignIn } from './useSingIn'

export const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER)
  const [signIn] = useSignIn()

  const signUp = async (username, password) => {
    try {
      const { data } = await mutate({ variables: { user: { username, password } } })

      if (data && data.createUser) {
        await signIn({ username, password })
      }
    } catch (e) {
      console.log(e)
    }
  }

  return [signUp, result]
}
