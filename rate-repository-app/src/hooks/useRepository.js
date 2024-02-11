import { GET_REPOSITORY } from '../graphql/queries'
import { useQuery } from '@apollo/client'

export const useRepository = (repositoryId, first = 4) => {
  const variables = {
    repositoryId,
    first
  }

  const { data, loading, fetchMore, ...results } = useQuery(GET_REPOSITORY, {
    variables: { ...variables },
    fetchPolicy: 'cache-and-network'
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        ...variables,
        after: data.repository.reviews.pageInfo.endCursor
      }
    })
  }

  const repository = data
    ? data.repository
    : null

  const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : []

  return { repository, reviews: reviewNodes, loading, fetchMore: handleFetchMore, ...results }
}
