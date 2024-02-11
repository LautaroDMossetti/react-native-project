import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

export const useRepositories = (order = 'Latest', filter = '', first = 8) => {
  let orderBy = ''
  let orderDirection = ''

  switch (order) {
    case 'Latest':
      orderBy = 'CREATED_AT'
      orderDirection = 'ASC'
      break
    case 'Highest rated':
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'DESC'
      break
    case 'Lowest rated':
      orderBy = 'RATING_AVERAGE'
      orderDirection = 'ASC'
      break
    default:
      orderBy = 'CREATED_AT'
      orderDirection = 'ASC'
  }

  const variables = {
    orderBy,
    orderDirection,
    searchKeyword: filter,
    first
  }

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { ...variables }
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        ...variables,
        after: data.repositories.pageInfo.endCursor
      }
    })
  }

  const repositoryNodes = data
    ? data.repositories.edges.map(edge => edge.node)
    : []

  return { repositories: repositoryNodes, loading, fetchMore: handleFetchMore, ...result }
}
