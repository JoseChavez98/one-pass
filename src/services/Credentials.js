import { gql } from '@apollo/client';

export const GET_CREDENTIALS_QUERY = gql`
  query GET_CREDENTIALS_QUERY {
    credentials {
      id
      alias
      userName
      email
      serviceProvider
      password
    }
  }
`;

export const CREATE_CREDENTIAL_MUTATION = gql`
  mutation CREATE_CREDENTIAL_MUTATION(
    $alias: String!
    $email: String
    $userName: String
    $serviceProvider: String
    $password: String!
  ) {
    createCredential(
      alias: $alias
      email: $email
      userName: $userName
      serviceProvider: $serviceProvider
      password: $password
    ) {
      id
      alias
      email
      userName
      serviceProvider
      password
    }
  }
`;
