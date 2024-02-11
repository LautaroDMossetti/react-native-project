import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'

export const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW)

  const deleteReview = async reviewId => {
    try {
      const { data } = await mutate({ variables: { deleteReviewId: reviewId } })

      return data ? data.deleteReview : null
    } catch (e) {
      console.log(e)
    }
  }

  return [deleteReview, result]
}
