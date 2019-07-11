import React, { Component } from "react";
import { StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  Container,
  Header,
  List,
  ListItem,
  Thumbnail,
  Tab,
  Tabs,
  Text,
  Left,
  Body,
  Right,
  Button,
  View,
  Badge,
  Row,
  Col,
  Grid
} from "native-base";
import TagBoard from "./TagBoard";

import { story_array } from "../data";
import Swipeout from "react-native-swipeout";

// const post_array = [
//   'Simon Mignolet',
//   'Nathaniel Clyne',
//   'Dejan Lovren',
// ];

const ml = "MAKE\nLIVE";

export default class Stories extends React.Component {
  constructor() {
    super();
    this.state = {
      selected_tab: 1,
      listViewData: story_array
    };
  }

  deleteRow(index) {
    this.state.listViewData.splice(index, 1);
    console.log("list", this.state.listViewData);
    this.setState({ listViewData: this.state.listViewData });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "#fff",
          borderTopColor: "#bbbbbb",
          borderTopWidth: 2
        }}
      />
    );
  };

  getnames(aStory) {
    if (aStory.friends.length == 0) return "";
    if (aStory.friends.length == 1) return aStory.friends[0].name;
    if (aStory.friends.length > 1) {
      let str = "";
      for (var i = 0; i < 2; i++) {
        str += aStory.friends[i].name;
        str += " ";
      }

      if (aStory.friends.length - 2 > 0) {
        str += "+";
        str += aStory.friends.length - 2;
        str += " others";
      }
      return str;
    }
  }

  render() {
    return (
      <Container>
        <Tabs
          locked={true}
          tabBarPosition="top"
          tabBarUnderlineStyle={{ backgroundColor: "#00b7af" }}
        >
          <Tab
            heading="Live"
            tabStyle={{ backgroundColor: "white" }}
            textStyle={{ color: "#00b7af" }}
            activeTabStyle={{ backgroundColor: "white" }}
            activeTextStyle={{ color: "#00b7af", fontWeight: "bold" }}
          >
            {console.log("123123123")}
            <Grid style={styles.tab_grid}>
              <Row>
                <FlatList
                  style={styles.list}
                  data={this.state.listViewData}
                  ItemSeparatorComponent={this.ListViewItemSeparator}
                  enableEmptySections={true}
                  renderItem={
                    ({ item, index }) => (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                          Actions.Timeline({ storyTitle: "Mexico 2019" });
                        }}
                      >
                        <Grid style={{ backgroundColor: "#fff", padding: 8 }}>
                          <Col
                            style={{
                              width: 80,
                              flexDirection: "row",
                              justifyContent: "center"
                            }}
                          >
                            <Image
                              borderRadius={16}
                              source={require("../images/photo1.png")}
                              resizeMode="stretch"
                              style={styles.thumb1}
                            />
                            <Image
                              borderRadius={16}
                              source={require("../images/photo2.png")}
                              resizeMode="stretch"
                              style={styles.thumb2}
                            />
                            {item.unviewed > 0 && (
                              <Badge style={styles.unreadNumbers}>
                                <Text>{item.unviewed}</Text>
                              </Badge>
                            )}
                          </Col>
                          <Col style={{}}>
                            <Text>Mexico 2019</Text>
                            <Text note numberOfLines={1}>
                              Our travel pics from #cabo to #Ixtapa
                            </Text>

                            <View style={{ flexDirection: "row" }}>
                              <TagBoard tagname="#julie" />
                              <TagBoard tagname="#raul" />
                            </View>

                            <View style={{ flexDirection: "row" }}>
                              {item.friends.map((value, index) => {
                                return (
                                  <Image
                                    key={index}
                                    source={require("../images/avata3.png")}
                                    style={{ width: 20, height: 20 }}
                                  />
                                );
                              })}

                              {/* <Image
                            source={ require('../images/avata2.png')}
                            style={{ width:20, height:20, left:-5, zIndex:-1}}
                          />
                          <Image
                            source={ require('../images/avata1.png')}
                            style={{ width:20, height:20, left:-9, zIndex:-1}}
                          />
                           <Image
                            source={ require('../images/avata2.png')}
                            style={{ width:20, height:20, left:-13, zIndex:-1}}
                          />
                          <Image
                            source={ require('../images/avata1.png')}
                            style={{ width:20, height:20, left:-17, zIndex:-1}}
                          /> */}
                              <Text
                                note
                                numberOfLines={1}
                                style={{ marginLeft: 3 }}
                              >
                                {this.getnames(item)}
                              </Text>
                            </View>
                          </Col>
                          <Col
                            style={{
                              width: 40,
                              flexDirection: "column",
                              justifyContent: "center"
                            }}
                          >
                            <Badge
                              style={{
                                backgroundColor: "#00b7af",
                                flexDirection: "column",
                                justifyContent: "center"
                              }}
                            >
                              <Text style={{ color: "white" }}>
                                {item.posts.length}
                              </Text>
                            </Badge>
                          </Col>
                        </Grid>
                      </TouchableOpacity>
                    )
                    // <ListItem noIndent itemHeader={false} avatar style={{backgroundColor:'white', margin:0, padding:0}}
                    //     onPress={() => {Actions.Timeline({storyTitle: 'Mexico 2019'})}} >
                    //   <Left style={styles.thumb_bg}>
                    //     <Image borderRadius={16} source={ require('../images/photo1.png') }
                    //         resizeMode='stretch' style={styles.thumb1}
                    //     />
                    //     <Image borderRadius={16} source={ require('../images/photo2.png') }
                    //         resizeMode='stretch' style={styles.thumb2}
                    //       />
                    //     <Badge style={styles.unreadNumbers}><Text>{item.unviewed}</Text></Badge>
                    //   </Left>
                    //   <Body style={{backgroundColor:'yellow'}}>
                    //     <Text>
                    //       Mexico 2019
                    //     </Text>
                    //     <Text note numberOfLines={1}>
                    //       Our travel pics from #cabo to #Ixtapa
                    //     </Text>

                    //     <View style={{ flexDirection:'row'}}>
                    //       <TagBoard tagname='#julie'/>
                    //       <TagBoard tagname='#raul'/>
                    //     </View>

                    //     <View style={{ flexDirection:'row'}}>
                    //       <Image
                    //         source={ require('../images/avata3.png')}
                    //         style={{ width:20, height:20}}
                    //       />
                    //       <Image
                    //         source={ require('../images/avata2.png')}
                    //         style={{ width:20, height:20, left:-5, zIndex:-1}}
                    //       />
                    //       <Image
                    //         source={ require('../images/avata1.png')}
                    //         style={{ width:20, height:20, left:-9, zIndex:-1}}
                    //       />
                    //       <Text note numberOfLines={1}>Susan Smith, + 2 others</Text>
                    //     </View>
                    //   </Body>
                    //   <Right style={{backgroundColor:'blue', justifyContent:'center'}}>
                    //     <Badge style={{ backgroundColor: '#00b7af'}}>
                    //       <Text style={{ color: 'white' }}>26</Text>
                    //     </Badge>
                    //   </Right>
                    // </ListItem>
                  }
                />
              </Row>
              {/* Add Story button */}
              <Row style={styles.bottomArea}>
                <Button
                  style={styles.storybutton}
                  onPress={() => Actions.AddStory()}
                >
                  <Text style={{ color: "#00b7af" }} uppercase={false}>
                    +Add Story
                  </Text>
                </Button>
              </Row>
            </Grid>
          </Tab>

          <Tab
            heading="Publish"
            tabStyle={{ backgroundColor: "white" }}
            textStyle={{ color: "#00b7af" }}
            activeTabStyle={{ backgroundColor: "white" }}
            activeTextStyle={{ color: "#00b7af", fontWeight: "bold" }}
          >
            <Grid style={styles.tab_grid}>
              <Row>
                <FlatList
                  style={styles.list}
                  data={this.state.listViewData}
                  ItemSeparatorComponent={this.ListViewItemSeparator}
                  enableEmptySections={true}
                  renderItem={({ item, index }) => (
                    <Swipeout
                      backgroundColor="#fff"
                      autoClose={true}
                      left={[
                        {
                          // onPress: () => {
                          //   alert('a');
                          //   this.deleteRow(index)
                          // },
                          component: (
                            <Button
                              style={{
                                width: "100%",
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#bbbbbb"
                              }}
                              onPress={() => this.deleteRow(index)}
                            >
                              <View>
                                <Image
                                  style={{ alignSelf: "center" }}
                                  source={require("../images/forward.png")}
                                />
                              </View>
                              <View>
                                <Text style={styles.textButton}>{ml}</Text>
                              </View>
                            </Button>
                          )
                          // type: "delete",
                        }
                      ]}
                    >
                      <Grid style={{ backgroundColor: "#fff", padding: 8 }}>
                        <Col
                          style={{
                            width: 80,
                            flexDirection: "row",
                            justifyContent: "center"
                          }}
                        >
                          <Image
                            borderRadius={16}
                            source={require("../images/photo1.png")}
                            resizeMode="stretch"
                            style={styles.thumb1}
                          />
                          <Image
                            borderRadius={16}
                            source={require("../images/photo2.png")}
                            resizeMode="stretch"
                            style={styles.thumb2}
                          />
                          {item.unviewed > 0 && (
                            <Badge style={styles.unreadNumbers}>
                              <Text>{item.unviewed}</Text>
                            </Badge>
                          )}
                        </Col>
                        <Col style={{}}>
                          <Text>Mexico 2019</Text>
                          <Text note numberOfLines={1}>
                            Our travel pics from #cabo to #Ixtapa
                          </Text>

                          <View style={{ flexDirection: "row" }}>
                            <TagBoard tagname="#julie" />
                            <TagBoard tagname="#raul" />
                          </View>

                          <View style={{ flexDirection: "row" }}>
                            <Image
                              source={require("../images/avata3.png")}
                              style={{ width: 20, height: 20 }}
                            />
                            <Image
                              source={require("../images/avata2.png")}
                              style={{
                                width: 20,
                                height: 20,
                                left: -5,
                                zIndex: -1
                              }}
                            />
                            <Image
                              source={require("../images/avata1.png")}
                              style={{
                                width: 20,
                                height: 20,
                                left: -9,
                                zIndex: -1
                              }}
                            />
                            <Text note numberOfLines={1}>
                              Susan Smith, + 2 others
                            </Text>
                          </View>
                        </Col>
                        <Col
                          style={{
                            width: 40,
                            flexDirection: "column",
                            justifyContent: "center"
                          }}
                        >
                          <Badge style={{ backgroundColor: "#00b7af" }}>
                            <Text style={{ color: "white" }}>
                              {item.posts.length}
                            </Text>
                          </Badge>
                        </Col>
                      </Grid>
                    </Swipeout>
                  )}
                />
              </Row>
              {/* Add Story button */}
              <Row style={styles.bottomArea}>
                <Button
                  style={styles.storybutton}
                  onPress={() => Actions.AddStory()}
                >
                  <Text style={{ color: "#00b7af" }} uppercase={false}>
                    +Add Story
                  </Text>
                </Button>
              </Row>
            </Grid>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },

  tab_grid: {
    backgroundColor: "#eee"
  },

  list: {
    width: "100%",
    margin: 0,
    padding: 0
  },

  thumb_bg: {
    backgroundColor: "pink",
    width: 56,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  thumb1: {
    width: 58,
    height: 56,
    alignSelf: "center",
    position: "absolute"
  },

  thumb2: {
    width: 58,
    height: 56,
    left: 15,
    top: 22,
    zIndex: -1,
    alignSelf: "center",
    position: "absolute"
  },

  unreadNumbers: {
    top: 25,
    left: 0,
    backgroundColor: "#EF5D3A",
    position: "absolute",
    alignSelf: "center"
  },

  bottomArea: {
    height: 100,
    justifyContent: "center"
  },

  storybutton: {
    borderWidth: 0,
    borderRadius: 30,
    margin: 20,
    width: 150,
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center"
  },

  textButton: {
    textAlign: "center",
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "center"
  }
});
