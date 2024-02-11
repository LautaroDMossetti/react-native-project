import RepositoryItem from './RepositoryList/RepositoryItem'
import { useRepository } from '../hooks/useRepository'
import { useParams } from 'react-router-native'
import { openURL } from 'expo-linking'
import { Pressable, StyleSheet, FlatList, View } from 'react-native'
import theme from '../utils/theme'
import StyledText from './StyledText'
import ReviewItem from './ReviewItem'

const styles = StyleSheet.create({
  button: {
    padding: 4,
    marginVertical: 4,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: 'center',
    height: 45,
    width: 350,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 4
  }
})

const RepositoryView = () => {
  const { repoId } = useParams()
  const { repository, reviews, fetchMore } = useRepository(repoId, 4)

  const onEndReach = () => {
    fetchMore()
  }

  if (!repository) return <StyledText>Repo not found</StyledText>

  return <RepositoryViewContainer repo={repository} repoReviews={reviews} onEndReach={onEndReach} style={{ flex: 1 }} />
}

const RepositoryViewContainer = ({ repo, repoReviews, onEndReach }) => {
  return (
    <FlatList
      data={repoReviews}
      renderItem={({ item: review }) => {
        return (
          <ReviewItem review={review} />
        )
      }}
      keyExtractor={({ id }) => id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.1}
      ListHeaderComponent={
        <View>
          <RepositoryItem repo={repo} />
          <Pressable onPress={() => openURL(`${repo.url}`)}><StyledText style={styles.button}>Open on GitHub</StyledText></Pressable>
        </View>
      }
    />
  )
}

export default RepositoryView
