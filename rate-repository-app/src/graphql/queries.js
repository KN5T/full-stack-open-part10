import { gql } from '@apollo/client';
import { REPOSITORY_FRAGMENT, REVIEW_FRAGMENT } from './fragments';

export const GET_USER = gql`
  query getUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            repository {
              fullName
              id
            }
            createdAt
            text
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryFragment
      reviews {
        edges {
          node {
            ...ReviewFragment
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
  ${REVIEW_FRAGMENT}
`

export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepositoryFragment
        }
        cursor
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`
