import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Container, Content, Header, View, Col, Grid } from "native-base";
// import { Icon } from 'react-native-vector-icons/MaterialIcons';
import { SearchBar } from "react-native-elements";
import Post from "./components/Post";
import { Actions } from "react-native-router-flux";

import { post_array, queryPost } from "./data";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    const filtered = this.props.data.posts.filter(function(item, index, arr) {
      if (item.description !== "" || item.medias[0].url !== "") {
        return true;
      }
      return false;
    });
    this.state = {
      search: "",
      arrayholder: filtered,
      dataSource: filtered
    };
    console.log("search", this.props.data);
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  SearchFilterFunction(text) {
    const searchResult = this.state.arrayholder.filter(function(item) {
      const itemData = item.description.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: searchResult,
      search: text
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "100%",
          backgroundColor: "#fff",
          borderTopColor: "#bbbbbb",
          borderTopWidth: 2
        }}
      />
    );
  };

  onback() {
    Actions.pop();
  }
  render() {
    return (
      <Container style={{ backgroundColor: "white" }}>
        <Header style={{ backgroundColor: "white", height: 70 }}>
          <Grid>
            <Col size={1} style={{ justifyContent: "center" }}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => {
                  this.onback();
                }}
              >
                <Image source={require("./images/left-arrow.png")} />
              </TouchableOpacity>
            </Col>
            <Col size={8}>
              <SearchBar
                lightTheme
                containerStyle={{ backgroundColor: "transparent" }}
                inputStyle={{ color: "#000", backgroundColor: "transparent" }}
                round
                searchIcon={{ size: 24 }}
                onChangeText={text => this.SearchFilterFunction(text)}
                onClear={text => this.SearchFilterFunction("")}
                placeholder="Type Here..."
                value={this.state.search}
              />
            </Col>
          </Grid>
        </Header>
        {this.state.dataSource && this.state.dataSource.length > 0 && (
          <FlatList
            ref={ref => {
              this._flatList = ref;
            }}
            data={this.state.dataSource}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            renderItem={({ item }) => (
              <View style={{ margin: 16 }}>
                <Post
                  pdata={item}
                  type="search"
                  exdata={{
                    name: this.props.data.name,
                    avatar: this.props.data.avatar,
                    location: this.props.data.location
                  }}
                />
              </View>
            )}
            enableEmptySections={true}
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </Container>
    );
  }
}
