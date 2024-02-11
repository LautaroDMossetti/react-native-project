import { View, StyleSheet, Pressable, Text, Alert } from 'react-native'
import { format, parseISO } from 'date-fns'
import { useLocation, useNavigate } from 'react-router-native'
import { useDeleteReview } from '../hooks/useDeleteReview'
import StyledText from './StyledText'
import theme from '../utils/theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10
  },
  rating: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    textAlignVertical: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: (30 / 2)
  },
  date: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSizes.small
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  buttonBox: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 4,
    height: 40,
    borderWidth: 1,
    justifyContent: 'space-evenly',
    marginBottom: 20
  },
  viewRepoButton: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary
  },
  deleteReviewButton: {
    borderColor: 'red',
    backgroundColor: 'red'
  }
})

const ReviewItem = ({ review, refetch = null }) => {
  // eslint-disable-next-line quotes
  const userFriendlyDate = format(parseISO(review.createdAt), "dd/MM/y, p")
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [deleteReview] = useDeleteReview()

  const onPressViewRepo = () => {
    navigate(`/${review.repository.id}`, { replace: true })
  }

  const onPressDeleteReview = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review', [
      {
        text: 'Cancel'
      },
      {
        text: 'Delete',
        onPress: () => {
          deleteReview(review.id)
          refetch()
        }
      }
    ], {
      cancelable: true
    })
  }

  return (
    <View>
      <View style={styles.container}>
        <View>
          <StyledText align='center' fontWeight='bold' style={styles.rating}>{review.rating}</StyledText>
        </View>
        <View style={{ flex: 1, paddingLeft: 5 }}>
          <StyledText fontWeight='bold' >{pathname === '/me' ? review.repository.fullName : review.user.username}</StyledText>
          <StyledText style={styles.date}>{userFriendlyDate}</StyledText>
          <StyledText>{review.text}</StyledText>
        </View>
      </View>
      {pathname === '/me'
        ? <View style={styles.container}>
            <Pressable onPress={onPressViewRepo} style={[styles.buttonBox, styles.viewRepoButton]}>
              <Text style={styles.buttonText}>View repository</Text>
            </Pressable>
            <Pressable onPress={onPressDeleteReview} style={[styles.buttonBox, styles.deleteReviewButton]}>
              <Text style={styles.buttonText}>Delete review</Text>
            </Pressable>
          </View>
        : null}
    </View>
  )
}

export default ReviewItem
