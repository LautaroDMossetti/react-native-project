import StyledText from '../StyledText.jsx'
import { View } from 'react-native'
import { parseThousands } from '../../utils/utils.js'

const RepositoryStats = ({ repo }) => {
  return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View>
          <StyledText align='center' fontWeight='bold'>{parseThousands(repo.stargazersCount)}</StyledText>
          <StyledText align='center'>Stars</StyledText>
        </View>
        <View>
          <StyledText align='center' fontWeight='bold'>{parseThousands(repo.forksCount)}</StyledText>
          <StyledText align='center'>ForksCount</StyledText>
        </View>
        <View>
          <StyledText align='center' fontWeight='bold'>{parseThousands(repo.reviewCount)}</StyledText>
          <StyledText align='center'>ReviewCount</StyledText>
        </View>
        <View>
          <StyledText align='center' fontWeight='bold'>{parseThousands(repo.ratingAverage)}</StyledText>
          <StyledText align='center'>RatingAverage</StyledText>
        </View>
      </View>
  )
}

export default RepositoryStats
