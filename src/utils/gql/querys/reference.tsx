import { gql } from '@apollo/client';


export const GET_ALL_REFERENCES = gql`
  query GetAllReferences {
    Reference {
      id
      title
      publisher
      publicationYear
      ISBN
      genre
      availableUnits
    }
  }
`;

export const GET_USER = gql`
  query Book($referenceId: String!) {
    reference(id: $referenceId) {
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
