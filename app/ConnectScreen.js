import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Toast } from 'native-base';
import SwitchToggle from 'react-native-switch-toggle';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

import InstagramLogin from 'react-native-instagram-login'
import Cookie from 'react-native-cookie'

import { LoginButton, AccessToken, LoginManager  } from 'react-native-fbsdk';

import { ASKeys } from './interface/AsyncStorageKeys';
import {_storeData, _retrieveData} from './service/localStorage';

export default class ConnectScreen extends React.Component {

    constructor(){
      super();
      this.state = {
          toggleInstagram: true,
          toggleFacebook: false,
          Instagram_token: '',
          facebook_token: '',
      }
    }

    componentDidMount() {
      _retrieveData(ASKeys.INSTAGRAM_TOKEN).then(result => {
        this.setState({Instagram_token: result});
      })
      _retrieveData(ASKeys.FB_TOKEN).then(result => {
        this.setState({facebook_token: result});
      })
    }

    componentWillUnmount(){
      console.log('cc', 'component will unmount');
      if(this.state.Instagram_token === null)
        this.LogoutInstagram();
    }
    render() {
      return (
        <View style={styles.ConnectScreenContainer}>
            <View style={styles.TopContainer}>
                <Image
                  source={require('./images/postlogo.png')}
                />
                <Text style={styles.TitleText}>Connect Accounts</Text>
                <Text style={styles.BodyText}>Please choose at least one network</Text>
                <Text style={styles.BodyText}>so we can access your photos and posts.</Text>
                
            </View>

            <View style={styles.MiddleContainer}>
              <View style={styles.SwitchButton}>
              <Image
                  source={require('./images/instagram.png')} 
                  style={{ width: 120, height: 40}} 
                  resizeMode="contain"
                />
                <SwitchToggle style={{marginLeft:30}}
                  containerStyle={{
                    marginTop: 2,
                    width: 50,
                    height: 25,
                    borderRadius: 30,
                    padding: 5,
                    marginLeft:20
                  }}
                  backgroundColorOn='#00B7B0'
                  backgroundColorOff='#95989A'
                  circleStyle={{
                    width: 22,
                    height: 22,
                    borderRadius: 27.5,
                    backgroundColor: 'blue', // rgb(102,134,205)
                  }}
                  circleColorOff='#eeeeee'
                  circleColorOn='white'
                  duration={300}
                  // type={1}
                  switchOn={this.state.toggleInstagram}
                  onPress={ () => this.onSwitchInstagram()}
                />
              </View>
              <InstagramLogin
                ref= {ref => this.instagramLogin= ref}
                clientId='29d22baf671443439e1a4d37c0926848'
                redirectUrl='https://google.com'
                scopes={['public_content', 'follower_list']}
                onLoginSuccess={(token) => alert(token)}
                onLoginFailure={(data) => alert(data)}
              />
              
              <View style={styles.SwitchButton}>
              <Image
                  source={require('./images/facebook.png')} 
                  style={{ width: 120, height: 40}} 
                  resizeMode="contain"
                />
                <SwitchToggle style={{marginLeft:30}}
                  containerStyle={{
                    marginTop: 2,
                    width: 50,
                    height: 25,
                    borderRadius: 30,
                    padding: 5,
                    marginLeft:20
                  }}
                  backgroundColorOn='#00B7B0'
                  backgroundColorOff='#95989A'
                  circleStyle={{
                    width: 22,
                    height: 22,
                    borderRadius: 27.5,
                    backgroundColor: 'blue', // rgb(102,134,205)
                  }}
                  circleColorOff='#eeeeee'
                  circleColorOn='white'
                  duration={300}
                  // type={1}
                  switchOn={this.state.toggleFacebook}
                  onPress={ () => this.onSwitchFacebook()}
                />
              </View>
               
            </View>

            <View style={styles.BottomContainer}>
                <LinearGradient
                    colors={['#52ede6', '#21CFC8']}
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                    style={styles.gradientButton}
                >
                    <TouchableOpacity style={styles.gradientButton} activeOpacity={0.6}
                     onPress={() => this.onNext()}
                      >
                        <Text style={styles.buttonText}>
                            NEXT   >
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>

              <Text style={{ color: '#00b7af', textAlign: 'center', margin:10, textDecorationLine:'underline'}}

                    onPress={() => Actions.reset('Main')}
                    >
                    Skip this step
              </Text>
            </View>
          </View>
        
      );
    }

    onSwitchInstagram() {
      if(this.state.toggleFacebook == false && this.state.toggleInstagram == true){
        Toast.show({
          text: "Turn on more than one!",
          buttonText: "OK",
          duration: 3000,
          position: "top",
          // type: "warning",
          style: {
            backgroundColor: "#8A69C4"
           }
        })
         return;
      }

      this.setState({toggleInstagram: !this.state.toggleInstagram})
    }
    onSwitchFacebook() {
      if(this.state.toggleInstagram == false && this.state.toggleFacebook == true){
        Toast.show({
          text: "Turn on more than one!",
          buttonText: "OK",
          duration: 3000,
          position: "top",
          type: "warning"
        })
        return;
      }

      this.setState({toggleFacebook: !this.state.toggleFacebook})
    }
    
    LoginToInstagram(){
      this.instagramLogin.show();
    }

    LogoutInstagram() {
      Cookie.clear().then(() => {
        this.setState({ Instagram_token: null })
      })
    }

    LoginToFacebook() {
      LoginManager.logInWithReadPermissions(['public_profile']).then(
        function(result) {
          if (result.isCancelled) {
            alert('Login was cancelled');
          } else {
            alert('Login was successful with permissions: '
              + result.grantedPermissions.toString());

              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  _storeData(ASKeys.FB_TOKEN, data.accessToken);
                  alert('access token: ' + data.accessToken.toString());
                }
              )
            
          }
        },
        function(error) {
          alert('Login failed with error: ' + error);
        }
      );
    }

    LogoutFacebook() {

    }

    onNext() {
      // Actions.Main();
      if(this.state.toggleInstagram && this.state.Instagram_token == ''){
        this.LoginToInstagram();
        return;
      }
      else if(this.state.toggleFacebook && this.state.facebook_token == ''){
        this.LoginToFacebook();
        return;
      }
      
      Actions.reset('Main');
    }
  }


  const styles = StyleSheet.create({
      ConnectScreenContainer: {
        //  flex: 1,
        width: '100%',
        height: '100%',
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
         backgroundColor: 'white',
      },

      TopContainer: {
        // flex: 1.5,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 70,
        // backgroundColor: 'green',
      },

      TitleText: {
        color: '#00b7af',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 25,
      },

      BodyText: {
        color: '#00b7af',
        fontSize: 12,
        margin: 2,
      },
      
      MiddleContainer: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // backgroundColor: 'black',
        paddingTop: 20,
      },

      SwitchButton: {
          // flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 10,
          // backgroundColor: 'red',
      },

      BottomContainer: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 30,
        // backgroundColor: 'blue',
        alignItems: 'center',
      },

      gradientButton: {
         height: 45,
         marginTop: 10,
         width:240,
         borderRadius: 40,
         alignItems: 'center',
         justifyContent:'center',
        //  backgroundColor:'blue'
      },


      buttonContainer: {
        width: 200,
        alignItems: 'center',
        justifyContent:'center',
    },
    buttonText: {
        textAlign: 'center',
        // backgroundColor:'red',
        alignSelf: 'center',
        color: '#fff',
        // padding: 15,
        // width: 200
        // fontSize: 20
        fontWeight:'bold',
        top: -5

    },

    nextButton: {
      height: 45,
      marginTop: 10,
      width:240,
      borderRadius: 40,
      backgroundColor: '#00b7af',
   },
      
  });