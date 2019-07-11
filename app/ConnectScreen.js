import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { Toast } from "native-base";
import SwitchToggle from "react-native-switch-toggle";
import { Actions } from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";

import InstagramLogin from "react-native-instagram-login";
import Cookie from "react-native-cookie";

import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";

import { ASKeys } from "./interface/AsyncStorageKeys";
import { _storeData, _retrieveData } from "./service/localStorage";
import { Mutation } from "react-apollo";

import {
  LOGINWITHFB_MUTATION,
  LOGINWITHIG_MUTATION,
  DISCONNECTSOCIALMEDIA_MUTATION
} from "./graphql/gql";

export default class ConnectScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      toggleInstagram: true,
      toggleFacebook: false,
      Instagram_token: "",
      facebook_token: "",
      login_processing: false,

      signInWithIGUser: null,
      signInWithIGUser_Done: false,
      signInWithFBUser: null,
      signInWithFBUser_Done: false,
      disconnectSocialMedia: null
    };
  }

  componentDidMount() {
    _retrieveData(ASKeys.INSTAGRAM_TOKEN).then(result => {
      this.setState({ Instagram_token: result });
    });
    _retrieveData(ASKeys.FB_TOKEN).then(result => {
      this.setState({ facebook_token: result });
    });

    _retrieveData(ASKeys.FB_SYNC).then(result => {
      if (!result) result = false;
      this.setState({ toggleFacebook: result });
    });
    _retrieveData(ASKeys.IG_SYNC).then(result => {
      if (!result) result = false;
      this.setState({ toggleInstagram: result });
    });
  }

  componentWillUnmount() {
    // console.log("cc", "component will unmount");
    // if (this.state.Instagram_token === null) this.LogoutInstagram();
  }
  render() {
    return (
      <Mutation
        mutation={LOGINWITHIG_MUTATION}
        onCompleted={data => this.onLoginIGResult(data)}
        onError={data => this.onLoginIGError(data)}
      >
        {signInWithIGUser => (
          <Mutation
            mutation={LOGINWITHFB_MUTATION}
            onCompleted={data => this.onLoginFBResult(data)}
            onError={data => this.onLoginFBError(data)}
          >
            {signInWithFBUser => (
              <Mutation
                mutation={DISCONNECTSOCIALMEDIA_MUTATION}
                onCompleted={data => this.onDisconnectSMResult(data)}
                onError={data => this.onDisconnectSMError(data)}
              >
                {disconnectSocialMedia => (
                  <View style={styles.ConnectScreenContainer}>
                    <View style={styles.TopContainer}>
                      <Image source={require("./images/postlogo.png")} />
                      <Text style={styles.TitleText}>Connect Accounts</Text>
                      <Text style={styles.BodyText}>
                        Please choose at least one network
                      </Text>
                      <Text style={styles.BodyText}>
                        so we can access your photos and posts.
                      </Text>
                    </View>

                    <View style={styles.MiddleContainer}>
                      <View style={styles.SwitchButton}>
                        <Image
                          source={require("./images/instagram.png")}
                          style={{ width: 120, height: 40 }}
                          resizeMode="contain"
                        />
                        <SwitchToggle
                          style={{ marginLeft: 30 }}
                          containerStyle={{
                            marginTop: 2,
                            width: 50,
                            height: 25,
                            borderRadius: 30,
                            padding: 5,
                            marginLeft: 20
                          }}
                          backgroundColorOn="#00B7B0"
                          backgroundColorOff="#95989A"
                          circleStyle={{
                            width: 22,
                            height: 22,
                            borderRadius: 27.5,
                            backgroundColor: "blue" // rgb(102,134,205)
                          }}
                          circleColorOff="#eeeeee"
                          circleColorOn="white"
                          duration={300}
                          // type={1}
                          switchOn={this.state.toggleInstagram}
                          onPress={() => this.onSwitchInstagram()}
                        />
                      </View>

                      <InstagramLogin
                        ref={ref => (this.instagramLogin = ref)}
                        clientId="29d22baf671443439e1a4d37c0926848"
                        redirectUrl="https://elfsight.com/service/generate-instagram-access-token/"
                        scopes={["public_content"]}
                        onLoginSuccess={token =>
                          this.onSuccessIG(token, signInWithIGUser)
                        }
                        onLoginFailure={data => alert("IGFailed:" + data)}
                      />

                      <View style={styles.SwitchButton}>
                        <Image
                          source={require("./images/facebook.png")}
                          style={{ width: 120, height: 40 }}
                          resizeMode="contain"
                        />
                        <SwitchToggle
                          style={{ marginLeft: 30 }}
                          containerStyle={{
                            marginTop: 2,
                            width: 50,
                            height: 25,
                            borderRadius: 30,
                            padding: 5,
                            marginLeft: 20
                          }}
                          backgroundColorOn="#00B7B0"
                          backgroundColorOff="#95989A"
                          circleStyle={{
                            width: 22,
                            height: 22,
                            borderRadius: 27.5,
                            backgroundColor: "blue" // rgb(102,134,205)
                          }}
                          circleColorOff="#eeeeee"
                          circleColorOn="white"
                          duration={300}
                          // type={1}
                          switchOn={this.state.toggleFacebook}
                          onPress={() => this.onSwitchFacebook()}
                        />
                      </View>
                    </View>

                    <View style={styles.BottomContainer}>
                      <LinearGradient
                        colors={["#52ede6", "#21CFC8"]}
                        start={{ x: 0.0, y: 1.0 }}
                        end={{ x: 1.0, y: 1.0 }}
                        style={styles.gradientButton}
                      >
                        <TouchableOpacity
                          style={styles.gradientButton}
                          activeOpacity={0.6}
                          onPress={() =>
                            this.onNext(
                              signInWithFBUser,
                              signInWithIGUser,
                              disconnectSocialMedia
                            )
                          }
                        >
                          <Text style={styles.buttonText}>NEXT ></Text>
                        </TouchableOpacity>
                      </LinearGradient>

                      <Text
                        style={{
                          color: "#00b7af",
                          textAlign: "center",
                          margin: 10,
                          textDecorationLine: "underline"
                        }}
                        onPress={() => this.onSkip()}
                      >
                        Skip this step
                      </Text>
                    </View>
                  </View>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }

  async onSkip() {
    await _storeData(ASKeys.SKIP_ON, true);
    if (this.state.toggleInstagram == false) {
      disconnectSocialMedia({
        variables: { source: "instagram" }
      });
    }
    if (this.state.toggleFacebook == false) {
      disconnectSocialMedia({
        variables: { source: "facebook" }
      });
    }
    Actions.reset("Main");
  }

  onSwitchInstagram() {
    console.log(this.state);
    if (
      this.state.toggleFacebook == false &&
      this.state.toggleInstagram == true
    ) {
      Toast.show({
        text: "Turn on more than one!",
        buttonText: "OK",
        duration: 3000,
        position: "top",
        // type: "warning",
        style: {
          backgroundColor: "#8A69C4"
        }
      });
      return;
    }

    this.setState({ toggleInstagram: !this.state.toggleInstagram }, function() {
      _storeData(ASKeys.IG_SYNC, this.state.toggleInstagram);
    });
  }
  onSwitchFacebook() {
    if (
      this.state.toggleInstagram == false &&
      this.state.toggleFacebook == true
    ) {
      Toast.show({
        text: "Turn on more than one!",
        buttonText: "OK",
        duration: 3000,
        position: "top",
        type: "warning"
      });
      return;
    }

    this.setState({ toggleFacebook: !this.state.toggleFacebook }, function() {
      _storeData(ASKeys.FB_SYNC, this.state.toggleFacebook);
    });
  }

  onSuccessIG(token, signInWithIGUser) {
    _storeData(ASKeys.INSTAGRAM_TOKEN, token);

    this.setState({ login_processing: true, Instagram_token: token });
    console.log("IGTOken", token);
    signInWithIGUser({ variables: { token: token } });
  }

  onLoginIGResult(data) {
    console.log("onLoginIGResult", data.signInWithIGUser);
    this.setState({ login_processing: false });
    // this.setState({})
    // readyForNext()

    if (data.signInWithIGUser.status) {
      this.setState({ signInWithIGUser_Done: true }, function() {
        this.onNext(
          this.state.signInWithFBUser,
          this.state.signInWithIGUser,
          this.state.disconnectSocialMedia
        );
      });
    } else {
      _storeData(ASKeys.INSTAGRAM_TOKEN, "");
      this.setState({ Instagram_token: "" }, function() {
        this.onNext(
          this.state.signInWithFBUser,
          this.state.signInWithIGUser,
          this.state.disconnectSocialMedia
        );
      });
    }

    // alert('instagram sync successed.');
  }

  onLoginIGError(data) {
    alert("Instagram Error: " + data);
  }

  onInstagramLogin() {
    this.instagramLogin.show();
  }

  LogoutInstagram() {
    Cookie.clear().then(() => {
      this.setState({ Instagram_token: null });
    });
  }

  async onFacebookLogin(signInWithFBUser) {
    result = await LoginManager.logInWithReadPermissions([
      "public_profile",
      "email"
    ]);
    if (result.isCancelled) {
      // alert('Login was cancelled');
      // _storeData(
      //   ASKeys.FB_TOKEN,
      //   "EAAajkRurSuMBAA7NRuqnHRDCexxnWIEdKWgZAjWlr7htM90aATQL1CzMSMiVtJ2kk1UytH0IZBWZC4FyYyLX4II69sh6ZA5IxnYGBQ8mSgOB2wZB95rxZCFg0EPyjNWyxiF1Kaew8NuwLGcMxz1jOpEdaLqfYOXtVkLprL2XFJZAwZDZD"
      // );
      // this.setState({
      //   login_processing: true,
      //   facebook_token:
      //     "EAAajkRurSuMBAA7NRuqnHRDCexxnWIEdKWgZAjWlr7htM90aATQL1CzMSMiVtJ2kk1UytH0IZBWZC4FyYyLX4II69sh6ZA5IxnYGBQ8mSgOB2wZB95rxZCFg0EPyjNWyxiF1Kaew8NuwLGcMxz1jOpEdaLqfYOXtVkLprL2XFJZAwZDZD"
      // });
      // signInWithFBUser({
      //   variables: {
      //     token:
      //       "EAAajkRurSuMBAA7NRuqnHRDCexxnWIEdKWgZAjWlr7htM90aATQL1CzMSMiVtJ2kk1UytH0IZBWZC4FyYyLX4II69sh6ZA5IxnYGBQ8mSgOB2wZB95rxZCFg0EPyjNWyxiF1Kaew8NuwLGcMxz1jOpEdaLqfYOXtVkLprL2XFJZAwZDZD"
      //   }
      // });
    } else {
      console.log(
        "Login was successful with permissions: ",
        result.grantedPermissions.toString()
      );
      data = await AccessToken.getCurrentAccessToken();
      {
        _storeData(ASKeys.FB_TOKEN, data.accessToken);
        this.setState({
          login_processing: true,
          facebook_token: data.accessToken
        });
        signInWithFBUser({ variables: { token: data.accessToken.toString() } });
      }
    }
  }

  onLoginFBResult(data) {
    console.log("onLoginFBResult", data);
    this.setState({ login_processing: false });

    if (data.signInWithFBUser.status) {
      this.setState({ signInWithFBUser_Done: true }, function() {
        this.onNext(
          this.state.signInWithFBUser,
          this.state.signInWithIGUser,
          this.state.disconnectSocialMedia
        );
      });
    } else {
      _storeData(ASKeys.FB_TOKEN, "");
      this.setState({ facebook_token: "" }, function() {
        this.onNext(
          this.state.signInWithFBUser,
          this.state.signInWithIGUser,
          this.state.disconnectSocialMedia
        );
      });
    }
  }

  onLoginFBError(data) {
    console.log("onLoginFBError", data);
    this.setState({ login_processing: false });
    alert("Facebook Error: " + data);
  }

  LogoutFacebook() {}

  onNext(signInWithFBUser, signInWithIGUser, disconnectSocialMedia) {
    this.setState(
      {
        signInWithFBUser: signInWithFBUser,
        signInWithIGUser: signInWithIGUser,
        disconnectSocialMedia: disconnectSocialMedia
      },
      function() {
        if (this.state.toggleInstagram) {
          if (this.state.Instagram_token === "") {
            console.log("onNext-1");
            this.onInstagramLogin();
            return;
          } else if (!this.state.signInWithIGUser_Done) {
            console.log("onNext-2");
            this.setState({ login_processing: true });
            signInWithIGUser({
              variables: { token: this.state.Instagram_token }
            });
            return;
          }
          console.log("onNext-3");
        }
        if (this.state.toggleFacebook) {
          console.log("onNext-4");
          if (this.state.facebook_token === "") {
            console.log("onNext-5");
            this.onFacebookLogin(signInWithFBUser);
            return;
          } else if (!this.state.signInWithFBUser_Done) {
            console.log("onNext-6", this.state.facebook_token);
            this.setState({ login_processing: true });
            signInWithFBUser({
              variables: { token: this.state.facebook_token }
            });
            return;
          }
          console.log("onNext-7");
        }
        console.log("onNext-8");

        if (this.state.toggleInstagram == false) {
          disconnectSocialMedia({
            variables: { source: "instagram" }
          });
        }
        if (this.state.toggleFacebook == false) {
          disconnectSocialMedia({
            variables: { source: "facebook" }
          });
        }

        _storeData(ASKeys.SKIP_ON, false);
        Actions.reset("Main");
      }
    );
  }

  onDisconnectSMResult(data) {}
  onDisconnectSMError(data) {
    console.log("onDisconnectMedia", data);
    alert("DisconnectMedia: " + data);
  }
}

const styles = StyleSheet.create({
  ConnectScreenContainer: {
    //  flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white"
  },

  TopContainer: {
    // flex: 1.5,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 70
    // backgroundColor: 'green',
  },

  TitleText: {
    color: "#00b7af",
    fontSize: 20,
    fontWeight: "bold",
    margin: 25
  },

  BodyText: {
    color: "#00b7af",
    fontSize: 12,
    margin: 2
  },

  MiddleContainer: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    // backgroundColor: 'black',
    paddingTop: 20
  },

  SwitchButton: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10
    // backgroundColor: 'red',
  },

  BottomContainer: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginBottom: 30,
    // backgroundColor: 'blue',
    alignItems: "center"
  },

  gradientButton: {
    height: 45,
    marginTop: 10,
    width: 240,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
    //  backgroundColor:'blue'
  },

  buttonContainer: {
    width: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    // backgroundColor:'red',
    alignSelf: "center",
    color: "#fff",
    // padding: 15,
    // width: 200
    // fontSize: 20
    fontWeight: "bold",
    top: -5
  },

  nextButton: {
    height: 45,
    marginTop: 10,
    width: 240,
    borderRadius: 40,
    backgroundColor: "#00b7af"
  }
});
