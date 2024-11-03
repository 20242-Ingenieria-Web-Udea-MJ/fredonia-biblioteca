import { gql } from '@apollo/client';

export const GET_ALL_BOOKS = gql`
  query Books {
    books {
      id
      name
      email
      image
      role
      deleted
      enabled
    }
  }
`;

export const GET_USER = gql`
  query Book($bookId: String!) {
    book(id: $bookId) {
      id
      name
      email
      image
      role
      deleted
      enabled
    }
  }
`;
