import { gql } from 'apollo-boost';

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
        login(data:{
            username: $username,
            password: $password,
        }){
            access_token
            refresh_token
        }
    }
`;

export const LOGINWITHFB_MUTATION = gql`
    mutation loginWithFB($token: String!) {
        signInWithFBUser(token: $token) {
            access_token
            refresh_token
            expires_in
            token_type
        }
    }
`;

export const LOGINWITHIG_MUTATION = gql`
    mutation loginWithIG($ig_access_token: String!) {
        signInWithIGUser(token: $ig_access_token) {
            access_token
            refresh_token
            expires_in
            token_type
        }
    }
`;

export const ME_QUERY = gql`
    query {
        me {
            id
            name
            email
            created_at
            # profile {
            #     birthday
            #     phone_number
            #     image_url
            #     sync_instagram
            #     sync_facebook
            # }
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
        forgotPassword(data:{
            email: $email
        }){
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