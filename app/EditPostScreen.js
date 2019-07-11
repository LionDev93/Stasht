import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import {
  Container,
  Content,
  Grid,
  Button,
  Icon,
  Card,
  CardItem,
  Left,
  Form,
  Header,
  Thumbnail,
  Body,
  Right,
  View,
  Text,
  ListItem,
  Row,
  Col,
  Textarea
} from "native-base";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import { Actions } from "react-native-router-flux";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
// import Emoticons from 'react-native-emoticons';
export default class EditPostScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEmoji: false,
      textcontent: props.pdata.content,
      cursorPosition: 0
    };
  }

  inputRef = null;

  onEmoji = () => {
    this.setState({ showEmoji: !this.state.showEmoji });
  };

  onInsertEmoji = emoji => {
    var string1 = this.state.textcontent;
    var string2 = "";
    string2 = string1.slice(0, this.state.cursorPosition) + emoji;
    string2 += string1.slice(this.state.cursorPosition);
    this.setState({ textcontent: string2 });

    this.state.cursorPosition += 2;
  };

  onCursor = event => {
    this.setState({ cursorPosition: event.nativeEvent.selection.end });
  };
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "white" }}>
          <Grid>
            <Col size={1} style={{ justifyContent: "center" }}>
              <TouchableOpacity
                style={{ height: "100%", justifyContent: "center" }}
                onPress={() => {
                  Actions.pop();
                }}
              >
                <Image source={require("./images/left-arrow.png")} />
              </TouchableOpacity>
            </Col>

            <Col
              size={3}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 24, color: "#00b7af" }}
              >
                Edit Post
              </Text>
            </Col>

            <Col
              size={1}
              style={{ justifyContent: "center", alignItems: "flex-end" }}
            >
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <Text>Save </Text>
                <Image
                  style={{ alignSelf: "center" }}
                  source={require("./images/right-arrow.png")}
                />
              </TouchableOpacity>
            </Col>
          </Grid>
        </Header>
        <Content>
          <KeyboardAvoidingView
            style={{ width: "100%", height: "100%" }}
            enabled={true}
            behavior="padding"
            keyboardVerticalOffset={-10}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <View style={styles.TopContainer}>
                  <Image
                    source={require("./images/woman-5.png")} //this.props.pdata.user_img
                    style={{ width: 40, height: 40 }}
                    resizeMode="contain"
                  />

                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ color: "black", fontWeight: "bold" }}>
                      {this.props.pdata.name}
                    </Text>
                    <Text note style={{ color: "grey" }}>
                      {this.props.pdata.title}
                    </Text>
                  </View>

                  <Right />
                </View>

                <View style={styles.MiddleContainer}>
                  <Image
                    source={require("./images/photo1.png")} //{this.props.pdata.photo}
                    style={{ width: "100%" }}
                    resizeMode="stretch"
                  />
                </View>

                <View style={styles.PostContent}>
                  <Form>
                    <Textarea
                      ref={ref => {
                        this.inputRef = ref;
                      }}
                      rowSpan={8}
                      bordered
                      multiline
                      value={this.state.textcontent}
                      onChangeText={text => {
                        this.setState({ textcontent: text });
                        this.inputRef.setNativeProps({
                          selection: {
                            start: this.state.cursorPosition,
                            end: this.state.cursorPosition
                          }
                        });
                      }}
                      onSelectionChange={event => this.onCursor(event)}
                    />
                  </Form>
                  <TouchableOpacity
                    onPress={this.onEmoji}
                    style={{ margin: 10 }}
                  >
                    <Image
                      source={require("./images/emoji.png")} //this.props.pdata.post_type
                      style={{ width: 40, height: 40 }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  {this.state.showEmoji && (
                    <Content>
                      <EmojiSelector
                        style={{}}
                        category={Categories.people}
                        onEmojiSelected={emoji => this.onInsertEmoji(emoji)}
                      />
                    </Content>
                  )}
                </View>

                <View style={styles.BottomContainer}>
                  <Text note>{this.props.pdata.date}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: '100%',
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    flexDirection: "column",
    margin: 12
    // padding: 15,
  },

  TopContainer: {
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "row"
    // backgroundColor: 'yellow',
  },

  MiddleContainer: {
    width: "100%",
    justifyContent: "center",
    marginTop: 15
    // backgroundColor: 'red',
  },

  PostContent: {
    width: "100%",
    // height: 'auto',
    // height: 300,
    justifyContent: "space-around",
    color: "#000",
    marginTop: 15,
    flexDirection: "column"
  },

  BottomContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
    // backgroundColor: 'blue',
  }
});
