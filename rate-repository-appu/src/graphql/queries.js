import { gql } from '@apollo/client'
import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments'

export const GET_REPOSITORY = gql`
    query($repositoryId: ID!, $first: Int!, $after: String){
        repository(id: $repositoryId){
            ...RepositoryDetails
            reviews(first: $first, after: $after) {
                edges {
                    node {
                        ...ReviewDetails
                    }
                    cursor
                }
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                }
            }
        }
    }

    ${REPOSITORY_DETAILS}
    ${REVIEW_DETAILS}
`

export const GET_ME = gql`
    query($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        ...ReviewDetails
                    }
                    cursor
                }
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                }
            }
        }
    }

    ${REVIEW_DETAILS}
`

export const GET_REPOSITORIES = gql`
    query($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection!, $searchKeyword: String, $first: Int!, $after: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
            edges {
                node {
                    ...RepositoryDetails
                }
                cursor
            }
            pageInfo {
                startCursor
                endCursor
                hasNextPage
            }
        }
    }

    ${REPOSITORY_DETAILS}
`
