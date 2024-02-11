import { render } from '@testing-library/react-native'
import { RepositoryListContainer } from '../../components/RepositoryList'
import { parseThousands } from '../../utils/utils.js'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repo1 = {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 4,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4'
      }
      const repo2 = {
        id: 'async-library.react-async',
        fullName: 'async-library/react-async',
        description: 'Flexible promise-based React data loader',
        language: 'JavaScript',
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4'
      }

      const repositories = [repo1, repo2]
      const handlePress = () => {}

      const { getByText } = render(<RepositoryListContainer repositories={repositories} handlePress={handlePress} />)

      expect(getByText(`FullName: ${repositories[0].fullName}`)).toBeDefined()
      expect(getByText(repositories[0].description)).toBeDefined()
      expect(getByText(repositories[0].language)).toBeDefined()
      expect(getByText(parseThousands(repositories[0].forksCount))).toBeDefined()
      expect(getByText(parseThousands(repositories[0].stargazersCount))).toBeDefined()
      expect(getByText(parseThousands(repositories[0].ratingAverage))).toBeDefined()
      expect(getByText(parseThousands(repositories[0].reviewCount))).toBeDefined()

      expect(getByText(`FullName: ${repositories[1].fullName}`)).toBeDefined()
      expect(getByText(repositories[1].description)).toBeDefined()
      expect(getByText(repositories[1].language)).toBeDefined()
      expect(getByText(parseThousands(repositories[1].forksCount))).toBeDefined()
      expect(getByText(parseThousands(repositories[1].stargazersCount))).toBeDefined()
      expect(getByText(parseThousands(repositories[1].ratingAverage))).toBeDefined()
      expect(getByText(parseThousands(repositories[1].reviewCount))).toBeDefined()
    })
  })
})
