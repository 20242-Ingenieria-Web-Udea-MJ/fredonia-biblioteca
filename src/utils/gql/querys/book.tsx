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
  query User($userId: String!) {
    user(id: $userId) {
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
