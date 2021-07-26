import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $name: String!
    $userName: String!
    $email: String!
    $password: String!
  ) {
    signUp(name: $name, userName: $userName, email: $email, password: $password)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation SignInMutation(
    $userName: String!
    $email: String
    $password: String!
    $auth: String!
  ) {
    signIn(userName: $userName, email: $email, password: $password, auth: $auth)
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout
  }
`;
