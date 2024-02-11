import { gql } from '@apollo/client'

export const REPOSITORY_DETAILS = gql`
    fragment RepositoryDetails on Repository {
        id
        name
        ownerName
        fullName
        reviewCount
        ratingAverage
        forksCount
        stargazersCount
        description
        language
        ownerAvatarUrl
        url
    }
`

export const REVIEW_DETAILS = gql`
    fragment ReviewDetails on Review {
        id
        text
        rating
        createdAt
        user {
            id
            username
        }
        repository {
            id
            fullName
        }
    }
`
