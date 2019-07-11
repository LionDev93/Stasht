import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform
} from "react-native";
import {
  Container,
  Grid,
  Row,
  Left,
  Right,
  Body,
  Col,
  Text,
  Card,
  CardItem,
  Thumbnail,
  List,
  ListItem,
  Avatar,
  Content
} from "native-base";
import SwitchToggle from "react-native-switch-toggle";
import { Toast } from "native-base";
import { Actions } from "react-native-router-flux";
import ContactsWrapper from "react-native-contacts-wrapper";
import Contacts from "react-native-contacts";
import ImagePicker from "react-native-image-picker";

import { Query } from "react-apollo";
import { ME_QUERY, DISCONNECTSOCIALMEDIA_MUTATION } from "../graphql/gql";
import { _storeData, _retrieveData } from "../service/localStorage";
import { ASKeys } from "../interface/AsyncStorageKeys";
import { Mutation } from "react-apollo";

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      toggleInstagram: true,
      toggleFacebook: false,
      invitedFriends: [],
      avatarUrl: "",
      skipOn: false
    };
  }

  componentDidMount() {
    _retrieveData(ASKeys.FB_SYNC).then(result => {
      this.setState({ toggleFacebook: result });
    });
    _retrieveData(ASKeys.IG_SYNC).then(result => {
      this.setState({ toggleInstagram: result });
    });
    _retrieveData(ASKeys.SKIP_ON).then(result => {
      this.setState({ skipOn: result });
    });
  }
  getContactData() {
    ContactsWrapper.getContact()
      .then(contact => {
        for (var j = 0; j < this.state.invitedFriends.length; j++) {
          if (this.state.invitedFriends[j].givenName == contact.name) {
            Toast.show({
              text: "Already Invited",
              buttonText: "OK",
              duration: 3000,
              position: "bottom",
              style: {
                backgroundColor: "#8A69C4"
              }
            });
            return;
          }
        }
        Contacts.getAll((err, contacts) => {
          if (err) {
            throw err;
          }
          console.log("a", contacts);
          var curIndex = 0;
          for (var i = 0; i < contacts.length; i++) {
            if (contacts[i].givenName == contact.name) {
              curIndex = i;
              break;
            }
          }

          ss = this.state.invitedFriends;
          ss.push(contacts[curIndex]);
          this.setState({ invitedFriends: ss });
        });
      })
      .catch(error => {});
  }
  onInviteFriends() {
    Actions.FriendsList();
    // if(Platform.OS === 'ios'){
    //     this.getContactData();
    // }
    // else{
    //     const granted= PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //         {
    //         'title': 'Contacts',
    //         'message': 'This app would like to view your contacts.',
    //         buttonPositive: 'OK',
    //         }
    //     ).then((result) => {
    //         console.log('aaaaa',result);
    //         if(result === 'granted'){
    //             this.getContactData()
    //         }
    //     })
    // }
  }

  changeAvatar() {
    const option = {
      noData: true,
      mediaType: "photo"
    };
    ImagePicker.launchImageLibrary(option, response => {
      if (response.uri) {
        console.log("sfd", response.uri);
        this.setState({ avatarUrl: response.uri });
      }
    });
  }

  onDisconnectSMResult(data) {}
  onDisconnectSMError(data) {
    console.log("onDisconnectMedia", data);
    alert("DisconnectMedia: " + data);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Mutation
          mutation={DISCONNECTSOCIALMEDIA_MUTATION}
          onCompleted={data => this.onDisconnectSMResult(data)}
          onError={data => this.onDisconnectSMError(data)}
        >
          {disconnectSocialMedia => (
            <Query query={ME_QUERY} skip={this.state.skipOn}>
              {({ loading, error, data }) => {
                if (loading) return <Text>Loading</Text>;
                if (error) {
                  console.log("me error: ", error);
                  return <Text>error</Text>;
                }
                {
                  /* console.log('me:', data); */
                }
                return (
                  <Grid>
                    <Row style={{ height: 24 }}>
                      <Left>
                        <Text style={{ fontSize: 20, color: "#00b7af" }}>
                          Settings
                        </Text>
                      </Left>
                    </Row>
                    <Row style={styles.avatarline}>
                      <TouchableOpacity onPress={() => this.changeAvatar()}>
                        <Thumbnail
                          source={
                            data.me.avatar
                              ? { uri: data.me.avatar }
                              : require("../images/avata1.png")
                          }
                          style={{ width: 40, height: 40 }}
                        />
                      </TouchableOpacity>
                      <Text numberOfLines={1} style={styles.avataText}>
                        {data.me.name}
                      </Text>
                    </Row>
                    <Row style={styles.syncNetwork}>
                      <Grid>
                        <Row>
                          <Text>Sync Networks</Text>
                        </Row>
                        <Row>
                          <Left>
                            <Text>Instagram</Text>
                          </Left>
                          <Right>
                            <SwitchToggle
                              containerStyle={{
                                marginTop: 2,
                                width: 35,
                                height: 22,
                                borderRadius: 30,
                                padding: 5
                              }}
                              backgroundColorOn="#00B7B0"
                              backgroundColorOff="#95989A"
                              circleStyle={{
                                width: 15,
                                height: 15,
                                borderRadius: 20
                              }}
                              circleColorOff="#eeeeee"
                              circleColorOn="white"
                              duration={300}
                              switchOn={this.state.toggleInstagram}
                              onPress={() =>
                                this.onSwitchInstagram(disconnectSocialMedia)
                              }
                            />
                          </Right>
                        </Row>
                        <Row>
                          <Left>
                            <Text>Facebook</Text>
                          </Left>
                          <Right>
                            <SwitchToggle
                              containerStyle={{
                                marginTop: 2,
                                width: 35,
                                height: 22,
                                borderRadius: 30,
                                padding: 5
                              }}
                              backgroundColorOn="#00B7B0"
                              backgroundColorOff="#95989A"
                              circleStyle={{
                                width: 15,
                                height: 15,
                                borderRadius: 20
                              }}
                              circleColorOff="#eeeeee"
                              circleColorOn="white"
                              duration={300}
                              switchOn={this.state.toggleFacebook}
                              onPress={() =>
                                this.onSwitchFacebook(disconnectSocialMedia)
                              }
                            />
                          </Right>
                        </Row>
                      </Grid>
                    </Row>
                    <Row
                      style={{
                        height: 30,
                        marginTop: 20,
                        paddingBottom: 10
                        // borderBottomWidth:1,borderColor: '#bbbbbb'
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                        onPress={() => this.onInviteFriends()}
                      >
                        <Text>+ Invite Friends</Text>
                        <Image
                          source={require("../images/right-arrow.png")}
                          style={{ alignSelf: "center" }}
                        />
                      </TouchableOpacity>
                    </Row>
                    <Row>
                      <Content>
                        <List style={styles.card}>
                          {this.state.invitedFriends &&
                            this.state.invitedFriends.map(contact => {
                              return (
                                <ListItem style={{}}>
                                  {contact.thumbnailPath ? (
                                    <Thumbnail
                                      circular
                                      small
                                      source={{ uri: contact.thumbnailPath }}
                                    />
                                  ) : (
                                    <Thumbnail
                                      circular
                                      small
                                      source={require("../images/none.png")}
                                    />
                                  )}
                                  <Text style={{ left: 16 }}>
                                    {contact.givenName}
                                  </Text>
                                </ListItem>
                              );
                            })}
                        </List>
                      </Content>
                    </Row>
                    <Row style={{ height: 40 }}>
                      <Left>
                        <Text
                          style={styles.link}
                          onPress={() => this.handleDeleteAccount()}
                        >
                          Delete Account
                        </Text>
                      </Left>
                    </Row>
                  </Grid>
                );
              }}
            </Query>
          )}
        </Mutation>
      </Container>
    );
  }

  onSwitchInstagram(disconnectSocialMedia) {
    if (
      this.state.toggleFacebook == false &&
      this.state.toggleInstagram == true
    ) {
      Toast.show({
        text: "Turn on more than one!",
        buttonText: "OK",
        duration: 2000,
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
      if (this.state.toggleInstagram == false) {
        console.log("1");
        disconnectSocialMedia({ variable: { source: "instagram" } });
      }
    });
  }
  onSwitchFacebook(disconnectSocialMedia) {
    if (
      this.state.toggleInstagram == false &&
      this.state.toggleFacebook == true
    ) {
      Toast.show({
        text: "Turn on more than one!",
        buttonText: "OK",
        duration: 2000,
        position: "top",
        style: {
          backgroundColor: "#8A69C4"
        }
      });
      return;
    }
    this.setState({ toggleFacebook: !this.state.toggleFacebook }, function() {
      _storeData(ASKeys.FB_SYNC, this.state.toggleFacebook);
      if (this.state.toggleFacebook == false) {
        console.log("2");
        disconnectSocialMedia({ variable: { source: "facebook" } });
      }
    });
  }

  handleDeleteAccount() {
    Actions.reset("Login");
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12,
    borderWidth: 1,
    borderColor: "#bbbbbb"
  },

  avatarline: {
    marginTop: 20,
    height: 50
  },

  avataText: {
    alignSelf: "center",
    marginLeft: 10
  },

  syncNetwork: {
    marginTop: 12,
    paddingTop: 12,
    height: 150,
    borderBottomWidth: 1,
    borderColor: "#bbbbbb",
    borderTopWidth: 1
  },

  card: {
    width: "100%",
    left: -10,
    padding: 0,
    margin: 0
  },

  link: {
    color: "red",
    borderBottomWidth: 1,
    borderColor: 1
  }
});
