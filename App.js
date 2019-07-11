/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Router, Scene } from "react-native-router-flux";
// import ApolloClient from 'apollo-boost';
// import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider, graphql } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import SplashScreen from "./app/SplashScreen";
import LogInScreen from "./app/LogInScreen";
import ConnectScreen from "./app/ConnectScreen";
import MainScreen from "./app/MainScreen";
import AddStoryScreen from "./app/AddStoryScreen";
import TimelineScreen from "./app/TimelineScreen";
import SignupScreen from "./app/SignupScreen";
import EditStoryScreen from "./app/EditStoryScreen";
import EditPostScreen from "./app/EditPostScreen";
import CameraScreen from "./app/CameraScreen";
import RecordScreen from "./app/RecordScreen.js";
import ForgotPwdScreen from "./app/ForgotPwdScreen";
import NewPostScreen from "./app/NewPostScreen";
import SearchScreen from "./app/SearchScreen";
import FriendsList from "./app/components/FriendsList";

import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import { gql } from "apollo-boost";
import { _retrieveData } from "./app/service/localStorage";
import { ASKeys } from "./app/interface/AsyncStorageKeys";
console.disableYellowBox = true;

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 3000)
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    return (
      <ApolloProvider client={client}>
        <Root>
          <Router>
            <Scene key="root" hideNavBar={true}>
              <Scene
                key="Login"
                component={LogInScreen}
                title="LogIn"
                initial
              />

              <Scene
                key="ForgotPwd"
                component={ForgotPwdScreen}
                title="ForgotPwd"
              />

              <Scene key="Signup" component={SignupScreen} title="Signup" />
              <Scene key="Connect" component={ConnectScreen} title="Connect" />

              <Scene key="Main" component={MainScreen} title="Main" />

              <Scene
                key="AddStory"
                component={AddStoryScreen}
                title="AddStory"
              />

              <Scene
                key="EditStory"
                component={EditStoryScreen}
                title="EditStory"
              />

              <Scene key="NewPost" component={NewPostScreen} title="NewPost" />

              <Scene
                key="EditPost"
                component={EditPostScreen}
                title="EditPost"
              />

              <Scene
                key="Timeline"
                component={TimelineScreen}
                title="Timeline"
              />

              <Scene key="Camera" component={CameraScreen} title="Camera" />

              <Scene key="Record" component={RecordScreen} title="Record" />

              <Scene key="Search" component={SearchScreen} title="Search" />

              <Scene
                key="FriendsList"
                component={FriendsList}
                title="FriendsList"
              />
            </Scene>
          </Router>
        </Root>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

// Apollo client
// const client = new ApolloClient({
//   uri: 'https://stasht-api.herokuapp.com/graphql'
// });

const httpLink = createHttpLink({
  uri: "http://45.33.123.185/graphql"
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  var token = await _retrieveData(ASKeys.USER_TOKEN);
  console.log("user token:", token);
  //  if(token)
  //    token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE1Y2M5YjAwYTlmNjUzNjFmMWYyZjNlMWQzODk3NWMzMGU5NTMwNWZiZDIyOWIxNzM5M2VjZTAwMzBiODA5NDhkYjIxMDI1YWMyOWJkNTZiIn0.eyJhdWQiOiIyIiwianRpIjoiYTVjYzliMDBhOWY2NTM2MWYxZjJmM2UxZDM4OTc1YzMwZTk1MzA1ZmJkMjI5YjE3MzkzZWNlMDAzMGI4MDk0OGRiMjEwMjVhYzI5YmQ1NmIiLCJpYXQiOjE1NjIxNTU3OTUsIm5iZiI6MTU2MjE1NTc5NSwiZXhwIjoxNTkzNzc4MTk1LCJzdWIiOiIzOSIsInNjb3BlcyI6W119.OjQHjyCFtOXeb2uGBRLAYdNuhJTH4znuIlnA0pPqnnx2W80a7NV55R_pOd7Gn8pPl-y5qvjqWR6SfVTQuFlMvgQWJ-wYpo8TLmPJLwn2Bxvay8QCT2xmnEk9iucl2p8zO0EHZhhHM_1_1_QmuD5ROa4G80oGuIfYZjE5aR3-uAlcH2ZmhqqUO3CbEFTalleIS9K-18MohA0x4678fi8agJcPGPdT-7ol1nr_MSm0YdyeU7QHFVUTLquky7Y8cnKG7epwo2YrjYkx-nN0LdGzS4kRy_ZePTk8cXb3tudjexp8bBD4v8WCf-bwZV1FsNKkjg7os7kWtYgPEdJjd_TuchobwDxAsEv9F_q3LC3AJK5aNRTSXznAGdWV7r1EqRMJV06dngc5UHj5rUskDWcnQEjZKg9Sa8JXFh6Ae-2WWhvEcWINlD9L9kac73AKOiJOZrA6JDCojYxhdlXG3LwtKTq1qd7x1moZTkeuQieE18EZzZJoBUnxCPesDXXxlaFJM9AwYfbB0rtyR3PS0302yQCEg1I83mxB1pAvgz20EiwgTB1Dij2gQogpVotLlfJnXCG4BSV1i3Tgvfb7OII4JgdZU0fbDsoJkYBs4D8IBqqHfEnx1-RBedPokQwtI6pswdcz8AI_3s6n8XxhzCcpnG3ghxnZsr6ztPT-bYBXcQ4"
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
