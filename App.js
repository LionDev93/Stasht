/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet} from 'react-native';
import { Router, Scene} from 'react-native-router-flux'

import SplashScreen from './app/SplashScreen';
import LogInScreen from './app/LogInScreen';
import ConnectScreen from './app/ConnectScreen';
import MainScreen from './app/MainScreen';
import AddStoryScreen from './app/AddStoryScreen';
import TimelineScreen from './app/TimelineScreen';
import SignupScreen from './app/SignupScreen';
import EditStoryScreen from './app/EditStoryScreen';
import EditPostScreen from './app/EditPostScreen';
import CameraScreen from './app/CameraScreen';
import RecordScreen from './app/RecordScreen.js';
import ForgotPwdScreen from './app/ForgotPwdScreen';
import NewPostScreen from './app/NewPostScreen';
import SearchScreen from './app/SearchScreen';
import FriendsList from './app/components/FriendsList';

import { Root } from "native-base";
import { StackNavigator } from "react-navigation";



console.disableYellowBox = true;


type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        3000
      )
    );
  }

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

            <Scene
              key="Signup"
              component={SignupScreen}
              title="Signup"
            />
            <Scene
              key="Connect"
              component={ConnectScreen}
              title="Connect"
            />

            <Scene
              key="Main"
              component={MainScreen}
              title="Main"
            />

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

            <Scene
              key="NewPost"
              component={NewPostScreen}
              title="NewPost"
            />

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

            <Scene
              key="Camera"
              component={CameraScreen}
              title="Camera"
            />

            <Scene
              key="Record"
              component={RecordScreen}
              title="Record"
            />

            <Scene
              key="Search"
              component={SearchScreen}
              title="Search"
            />

            <Scene
              key="FriendsList"
              component={FriendsList}
              title="FriendsList"
            />

          </Scene>
        </Router>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
