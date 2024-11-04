import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    User {
      id
      name
      email
      role
    }
  }
`;
