import ReviewItem from './ReviewItem'
import { useMe } from '../hooks/useMe'
import { FlatList } from 'react-native'

const UserReviewsView = () => {
  const [me, refetch] = useMe(true)

  if (!me || !me.reviews) return null

  const reviews = me.reviews.edges.map(edge => edge.node)

  return (
    <FlatList
    data={reviews}
    renderItem={({ item: review }) => <ReviewItem review={review} refetch={refetch} />}
    keyExtractor={({ id }) => id}
    />
  )
}

export default UserReviewsView
