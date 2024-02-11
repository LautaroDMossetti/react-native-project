import { useMutation, useApolloClient } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'
import { useAuthStorage } from './useAuthStorage'
import { useNavigate } from 'react-router-native'

export const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigate = useNavigate()

  const [mutate, result] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { credentials: { username, password } } })
    if (data.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken)
      apolloClient.resetStore()
      navigate('/', { replace: true })
    }
  }

  return [signIn, result]
}
