import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Actions } from "react-native-router-flux";

import { Container, Content, Icon, Right, View, Text } from "native-base";

import Slideshow from "./Slideshow";

export default class Post extends React.Component {
  constructor(props) {
    super(props);

    this.onTagPress = this.onTagPress.bind(this);
    console.log("searchScreen", this.props);
  }

  onTagPress() {
    if (this.props.type == "post") {
      this.props.onStasht(this.props.index);
    }
  }

  render() {
    const { exdata } = this.props;
    return (
      <View style={styles.container}>
        {/* {this.props.pdata.active && this.props.type=='post' && 
                    <View style={styles.leftbar}></View>
                } */}

        <View style={styles.TopContainer}>
          <Image
            source={
              exdata.avatar ? exdata.avatar : require("../images/woman-5.png")
            } //this.props.pdata.user_img
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />

          <View style={{ marginLeft: 12 }}>
            <Text style={{ color: "black", fontWeight: "bold" }}>
              {exdata.name}
            </Text>
            <Text note style={{ color: "grey" }}>
              {exdata.location}
            </Text>
          </View>

          <Right>
            {this.props.pdata.source == "FACEBOOK" ? (
              <Image
                source={require("../images/facebook-icon.png")} //this.props.pdata.source
                style={{ width: 30, height: 30 }}
              />
            ) : this.props.pdata.source == "INSTAGRAM" ? (
              <Image
                source={require("../images/instagram-icon.png")} //this.props.pdata.source
                style={{ width: 30, height: 30 }}
              />
            ) : (
              <TouchableOpacity
                style={{ width: 30, alignItems: "center" }}
                onPress={() => Actions.EditPost({ pdata: this.props.pdata })}
              >
                <Icon name="more" style={{ color: "#aaa" }} />
              </TouchableOpacity>
            )}
          </Right>
        </View>

        <View style={styles.MiddleContainer}>
          <Slideshow
            dataSource={this.props.pdata.medias}
            // [{url : 'https://i.pinimg.com/originals/be/df/66/bedf667d653960c6c77b56e7f0fee992.jpg'},
            //  {url : 'https://i.pinimg.com/originals/3e/8d/bd/3e8dbd408a4d32e9c6cdb4ebcdae7d9c.jpg'},
            // //  {url : 'https://i.pinimg.com/originals/64/45/c1/6445c18a73e75b22f56ea849298b0e11.jpg'},
            // ]} //{this.props.pdata.photo}
            // style={{ width: '100%', height:'auto'}}
            height={500}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.PostContent}>
          <Text style={{ color: "#555" }}>{this.props.pdata.description}</Text>
        </View>

        <View style={styles.BottomContainer}>
          <Text note>{this.props.pdata.created_at.slice(0, 10)}</Text>
          {/* {this.props.pdata.tags != '' && */}
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={this.onTagPress}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              source={require("../images/export.png")}
              style={{ margin: 2 }}
            />
            <Text note style={{ color: "#00b7af" }}>
              {this.props.pdata.tags != ""
                ? this.props.pdata.tags
                : "STASHT THIS"}
            </Text>
          </TouchableOpacity>
          {/* } */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    flexDirection: "column",
    margin: 1
  },

  TopContainer: {
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "row"
  },

  MiddleContainer: {
    width: "100%",
    justifyContent: "center",
    marginTop: 15
  },

  PostContent: {
    width: "100%",
    justifyContent: "space-around",
    color: "#000",
    marginTop: 15
  },

  BottomContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },

  leftbar: {
    width: 10,
    height: "100%",
    backgroundColor: "#00B7B0",
    position: "absolute",
    left: -20
  }
});

//   :
//   this.props.pdata.source == 'stasht' ?
//   <Image
//       source={require('../images/stasht-icon.png')} //this.props.pdata.source
//       style={{width:30, height:30}}
//   />
