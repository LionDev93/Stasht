import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  FlatList
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Swipeout from "react-native-swipeout";
import {
  Root,
  Container,
  Content,
  Header,
  List,
  ListItem,
  Thumbnail,
  Tab,
  Tabs,
  Grid,
  Text,
  Left,
  Body,
  Right,
  Button,
  View,
  Icon,
  Row,
  Col
} from "native-base";

import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";

import Post from "./components/Post";

import { Actions } from "react-native-router-flux";
import { Avatar, Badge } from "react-native-elements";

import { post_array, queryPost } from "./data";

export default class TimelineScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listViewData__1: []
    };

    this.filterPostArray = this.filterPostArray.bind(this);
  }

  componentDidMount() {
    this.filterPostArray();
  }

  filterPostArray() {
    var title = this.props.storyTitle;
    var temp = queryPost.data.me.posts.filter(function(item) {
      if (item.tags === title) {
        return true;
      }
      return false;
    });

    this.setState({ listViewData__1: temp });
  }

  deleteRow(secId, rowId, rowMap) {
    this.state.listViewData__1.splice(index, 1);
    this.setState({ listViewData__1: this.state.listViewData__1 });
  }

  onPublish() {
    this.ActionSheet.show();
  }
  
  render() {
    return (
      <Container>
        {/* <Head/> */}
        <Content>
          <ImageBackground
            blurRadius={Platform.OS == "ios" ? 8 : 4}
            source={require("./images/timeline_bg.png")}
            style={{ width: "100%", height: 250 }}
            resizeMode="stretch"
          >
            <Grid style={{ padding: 20 }}>
              <Row size={2}>
                <Left>
                  <TouchableOpacity
                    onPress={() => {
                      Actions.pop();
                    }}
                  >
                    <Icon name="arrow-back" style={{ color: "#fff" }} />
                  </TouchableOpacity>
                </Left>

                <Body style={{}}>
                  {/* <Text style={{fontWeight:'bold', fontSize:24, color:'#00b7af'}}>Add Story</Text> */}
                  <View style={{}}>
                    <Avatar
                      rounded
                      size={"large"}
                      source={require("./images/woman-5.png")}
                    />
                    <Badge
                      value={26}
                      badgeStyle={{ backgroundColor: "#00b7af" }}
                      containerStyle={{
                        position: "absolute",
                        right: -10,
                        left: 40
                      }}
                    />
                  </View>
                </Body>

                <Right>
                  <TouchableOpacity
                    style={{ width: 30, alignItems: "flex-end" }}
                    onPress={() => Actions.EditStory()}
                  >
                    <Icon name="more" style={{ color: "#fff" }} />
                  </TouchableOpacity>
                </Right>
              </Row>
              <Row size={1.5}>
                <Body>
                  <Text
                    style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
                  >
                    {this.props.storyTitle}
                  </Text>
                </Body>
              </Row>
              <Row size={1} style={{ justifyContent: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("./images/avata3.png")}
                    style={{ width: 30, height: 30 }}
                  />
                  <Image
                    source={require("./images/avata2.png")}
                    style={{ width: 30, height: 30 }}
                  />
                  <Image
                    source={require("./images/avata1.png")}
                    style={{ width: 30, height: 30 }}
                  />
                </View>
              </Row>
              <Row size={1} style={{ justifyContent: "center" }}>
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  Our travel pics from our Mexico trip 2019{" "}
                </Text>
              </Row>
              <Row size={1} style={{ justifyContent: "center" }}>
                <Button
                  style={{
                    borderWidth: 0,
                    borderRadius: 20,
                    margin: 10,
                    width: 80,
                    height: 30,
                    backgroundColor: "white",
                    alignSelf: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    uppercase={false}
                    numberOfLines={1}
                    style={{ color: "#000", fontSize: wp("2.5%") }}
                  >
                    #cabo
                  </Text>
                </Button>
                <Button
                  style={{
                    borderWidth: 0,
                    borderRadius: 20,
                    margin: 10,
                    width: 80,
                    height: 30,
                    backgroundColor: "white",
                    alignSelf: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    uppercase={false}
                    numberOfLines={1}
                    style={{ color: "#000", fontSize: wp("2.5%") }}
                  >
                    #ixtapa
                  </Text>
                </Button>
              </Row>
            </Grid>
          </ImageBackground>

          {/* Post list */}
          <FlatList
            data={this.state.listViewData__1}
            renderItem={({ item, index }) => (
              <Swipeout
                backgroundColor="#fff"
                autoClose={true}
                left={[
                  {
                    onPress: () => {
                      this.deleteRow(index);
                    },
                    component: (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Image source={require("./images/trashcan.png")} />
                      </View>
                    ),
                    type: "delete"
                  }
                ]}
              >
                <View style={{ margin: 16 }}>
                  <Post type="timeline" pdata={item} />
                </View>
              </Swipeout>
            )}
            enableEmptySections={true}
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.ListViewItemSeparator}
          />
        </Content>

        <View style={styles.bottombar}>
          <Left>
            <Button
              rounded
              style={styles.recordbtn}
              onPress={() => Actions.Record()}
            >
              <Icon
                type={"Foundation"}
                name="record"
                style={{ color: "#00b7af" }}
              />
            </Button>
          </Left>
          <Body>
            <Button style={styles.publishbtn} onPress={() => this.onPublish()}>
              <ActionSheet
                ref={o => (this.ActionSheet = o)}
                title={
                  <Text style={{ color: "#00b7af", fontSize: 18 }}>
                    Publish Story
                  </Text>
                }
                options={[
                  "",
                  <Text style={{ color: "black" }}>Create a link</Text>,
                  <Text style={{ color: "black" }}>Publish to facebook</Text>,
                  <Text style={{ color: "black" }}>
                    Export Images to Album
                  </Text>,
                  <Text style={{ color: "black" }} />
                ]}
                cancelButtonIndex={0}
                destructiveButtonIndex={5}
                styles={{
                  body: { borderRadius: 20, backgroundColor: "#fff" },
                  titleBox: { borderRadius: 20 }
                }}
                // onPress={(index) => { alert(index) }}
              />
              <Text uppercase={false}>Publish</Text>
            </Button>
          </Body>
          <Right>
            <Button
              rounded
              style={{ borderWidth: 0, backgroundColor: "#fff" }}
              onPress={() => Actions.Camera()}
            >
              <Icon name="camera" style={{ color: "#00b7af" }} />
            </Button>
          </Right>
        </View>
      </Container>
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

  bottombar: {
    backgroundColor: "transparent",
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    // position:'absolute',
    bottom: 1,
    // width:'100%',
    alignSelf: "center",
    flexDirection: "row"
  },

  recordbtn: {
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignSelf: "flex-start"
  },

  publishbtn: {
    borderWidth: 0,
    borderRadius: 30,
    width: 150,
    backgroundColor: "#00b7af",
    alignSelf: "center",
    justifyContent: "center"
  }
});
