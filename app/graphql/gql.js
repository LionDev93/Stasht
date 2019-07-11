import { gql } from "apollo-boost";

export const SIGNUP_MUTATION = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(data: { username: $username, password: $password }) {
      access_token
      refresh_token
    }
  }
`;

export const LOGINWITHFB_MUTATION = gql`
  mutation loginWithFB($token: String!) {
    signInWithFBUser(token: $token) {
      status
    }
  }
`;

export const LOGINWITHIG_MUTATION = gql`
  mutation loginWithIG($token: String!) {
    signInWithIGUser(token: $token) {
      status
    }
  }
`;

export const SIGNUPWITHFB_MUTATION = gql`
  mutation signUpWithFacebook($token: String!) {
    signUpWithFacebook(token: $token) {
      access_token
    }
  }
`;

export const DISCONNECTSOCIALMEDIA_MUTATION = gql`
  mutation disconnectSocialMedia($source: String) {
    disconnectSocialMedia(source: $source) {
      action
    }
  }
`;

export const ME_QUERY = gql`
  query {
    me {
      id
      name
      email
      avatar
      sync_instagram
      sync_facebook
      birthday
      phone_number
      location
      gender
      posts {
        source
        description
        media_type
        created_at
        medias {
          url
        }
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout {
      message
    }
  }
`;

export const FORGOT_MUTATION = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(data: { email: $email }) {
      status
      message
    }
  }
`;

export const USER_QUERY = gql`
  query user($id: ID!) {
    user(id: $id) {
      name
      email
      created_at
      profile {
        first_name
        birthday
        phone_number
      }
    }
  }
`;

export const StoreFBToken_MUTATION = gql`
  mutation storeFBToken($token: String!) {
    storeFBToken(token: $token) {
      id
      name
      email
    }
  }
`;
