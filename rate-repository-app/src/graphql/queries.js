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
  query Repository($repositoryId: ID!, $reviewsFirst: Int, $reviewsAfter: String) {
    repository(id: $repositoryId) {
      ...RepositoryFragment
      reviews(first: $reviewsFirst, after: $reviewsAfter) {
        edges {
          node {
            ...ReviewFragment
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
  ${REVIEW_FRAGMENT}
`

export const GET_REPOSITORIES = gql`
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $after: String, $first: Int) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, after: $after, first: $first) {
      edges {
        node {
          ...RepositoryFragment
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`
