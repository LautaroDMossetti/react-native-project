import { useQuery } from '@apollo/client'
import { GET_ME } from '../graphql/queries.js'

export const useMe = (includeReviews = false) => {
  const { data, refetch } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews }
  })

  return data ? [data?.me, refetch] : null
}
