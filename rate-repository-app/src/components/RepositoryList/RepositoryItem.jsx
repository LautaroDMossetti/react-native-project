import { View, StyleSheet, Image } from 'react-native'
import StyledText from '../StyledText.jsx'
import RepositoryStats from './RepositoryStats.jsx'
import theme from '../../utils/theme.js'

const RepositoryItem = ({ repo }) => {
  return (
    <View style={styles.container}>
      <RepositoryItemHeader repo={repo}/>
      <RepositoryStats repo={repo}/>
    </View>
  )
}

const RepositoryItemHeader = ({ repo }) => (
  <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
    <View style={{ paddingRight: 10 }}>
      <Image style={styles.image} source={{ uri: repo.ownerAvatarUrl }} />
    </View>
    <View style={{ flex: 1 }}>
      <StyledText fontSize='subHeading' fontWeight='bold'>FullName: {repo.fullName}</StyledText>
      <StyledText color='secondary'>{repo.description}</StyledText>
      <StyledText style={styles.language}>{repo.language}</StyledText>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 5
  },
  language: {
    padding: 4,
    marginVertical: 4,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    borderRadius: 4,
    overFlow: 'hidden' // Por si borderRadius no funciona
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 4
  }
})

export default RepositoryItem
