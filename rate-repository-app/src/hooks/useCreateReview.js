import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'
import { useNavigate } from 'react-router-native'

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const createReview = async (ownerName, rating, repositoryName, text) => {
    try {
      const ratingNumber = Number(rating)
      const { data } = await mutate({ variables: { review: { ownerName, rating: ratingNumber, repositoryName, text } } })

      if (data && data.createReview) {
        navigate(`/${data.createReview.repositoryId}`, { replace: true })
      }
    } catch (e) {
      console.log(e)
    }
  }

  return [createReview, result]
}
