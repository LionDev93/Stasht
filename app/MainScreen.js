import React, { Component } from "react";
import { StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
  Container,
  Content,
  Text,
  Left,
  Body,
  Right,
  Button,
  View
} from "native-base";
import { ActionSheetCustom } from "react-native-actionsheet";
import Drawer from "react-native-drawer";
import { SearchBar } from "react-native-elements";
import { NavigationBar } from "navigationbar-react-native";
import { Actions } from "react-native-router-flux";
import Swipeout from "react-native-swipeout";

import { Query } from "react-apollo";
import { ME_QUERY } from "./graphql/gql";

import Post from "./components/Post";
import Stories from "./components/Stories";
import Settings from "./components/Settings";
import { post_array, queryPost } from "./data";
import { _retrieveData } from "./service/localStorage";
import { ASKeys } from "./interface/AsyncStorageKeys";
export default class MainScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selected_tab: 2,
      listViewData: null,
      settingOpen: false,
      searchbar: false,
      stashbtn_active: false,
      mainviewitem: 0,
      cur_post_id: 0,
      totalHeight: 0,
      viewHeight: 0,
      skipOn: false,

      queryMeData: null,
    };

    this.onStasht = this.onStasht.bind(this);

    this.elementArray = [];
    this.StoryNames = [];
  }

  componentWillMount() {
    _retrieveData(ASKeys.SKIP_ON).then(result => {
      this.setState({ skipOn: result });
    });
  }

  componentDidMount() {
    // if(this.state.listViewData[0].tags == ''){
    //   this.setState({stashbtn_active: true});
    // }
    // else{
    //   this.setState({stashbtn_active: false});
    // }
  }
  actionsheet_list() {
    this.elementArray = [""];
    this.StoryNames = [];
    this.state.listViewData.map(item => {
      if (item.tags != "") {
        var flag = false;
        for (var i = 0; i < this.StoryNames.length; i++) {
          if (this.StoryNames[i] == item.tags) {
            flag = true;
            break;
          }
        }
        if (flag == false) {
          this.elementArray.push(
            <Text note style={{ color: "black" }}>
              {item.tags}
            </Text>
          );
          this.StoryNames.push(item.tags);
        }
      }
    });
    this.elementArray.push(
      <Text style={{ color: "#00b7af" }}>+Add Story</Text>
    );
    this.elementArray.push(<Text style={{ color: "black" }} />);
    return this.elementArray;
  }

  deleteRow(index) {
    this.state.listViewData.splice(index, 1);
    this.setState({ listViewData: this.state.listViewData });
  }

  ComponentLeft = () => {
    return (
      <View style={{ flex: 1, alignItems: "flex-start", flexDirection: "row" }}>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => {
            this.setState({ selected_tab: 1 });
          }}
        >
          <Image
            source={
              this.state.selected_tab == 1
                ? require("./images/folder-icon-selected.png")
                : require("./images/folder-icon.png")
            }
            style={{ resizeMode: "contain", width: 50, alignSelf: "center" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => {
            this.setState({ selected_tab: 2 });

            // if (
            //   this.state.listViewData.length > 0 &&
            //   this.state.listViewData[0].tags == ""
            // ) {
            //   this.setState({ stashbtn_active: true });
            // } else {
            //   this.setState({ stashbtn_active: false });
            // }
          }}
        >
          <Image
            source={
              this.state.selected_tab == 2
                ? require("./images/images-icon-selected.png")
                : require("./images/images-icon.png")
            }
            style={{ resizeMode: "contain", width: 50, alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  ComponentCenter = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, color: "#00b7af", textAlign: "center" }}>
          {this.state.selected_tab == 1 ? "Stories" : "Posts"}
        </Text>
      </View>
    );
  };

  ComponentRight = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          flexDirection: "row-reverse"
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => {
            this.setState({ settingOpen: !this.state.settingOpen });
          }}
        >
          <Image
            source={require("./images/list-icon.png")}
            style={{ resizeMode: "contain", width: 50, alignSelf: "center" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => {
            // this.setState({searchbar: !this.state.searchbar})
            Actions.Search({ data: this.state.queryMeData });
          }}
        >
          <Image
            source={require("./images/search-icon.png")}
            style={{ resizeMode: "contain", width: 50, alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>
    );
  };

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

  handleScroll = event => {
    // var currentOffset = event.nativeEvent.contentOffset.y;
    // var viewitemHeight = this.state.totalHeight / this.state.listViewData.length;
    // for(i=0; i<this.state.listViewData.length; i++){
    //   if(currentOffset > viewitemHeight*i - this.state.viewHeight/2
    //       && currentOffset < viewitemHeight*(i+1) - this.state.viewHeight/2 )
    //   {
    //     this.setState({mainviewitem: i})
    //     if(this.state.listViewData[i].tags == '')
    //         this.setState({stashbtn_active : true});
    //     else{
    //       this.setState({stashbtn_active: false});
    //     }
    //     return;
    //   }
    // }
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ totalHeight: contentHeight });
  };

  onContainerSize = event => {
    this.setState({ viewHeight: event.nativeEvent.layout.height });
  };
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading</Text>;
          if (error) {
            console.log("me error: ", error);
            return <Text>error</Text>;
          }
          console.log("queried:", data.me);
          {
            /* if (data.me.posts.length == 0)
          return (
            <View>
              <Text>No Posts</Text>
            </View>
          ); */
          }
          {
            this.state.listViewData = data.me.posts;
            this.state.queryMeData = data.me;
          }
          {
            {/* test with static data
            this.state.listViewData = queryPost.data.me.posts;
            this.state.queryMeData = queryPost.data.me; */}
          }
          return (
            <Drawer
              style={drawerStyles}
              type="static"
              open={this.state.settingOpen}
              onClose={() => {
                this.state.settingOpen = false;
              }}
              content={<Settings data={this.state.queryMeData} />}
              openDrawerOffset={0.3}
              side="right"
              tweenHandler={Drawer.tweenPresets.parallax}
              tapToClose
              acceptPan
            >
              <Container style={{ backgroundColor: "white" }}>
                <NavigationBar
                  componentLeft={this.ComponentLeft}
                  componentCenter={this.ComponentCenter}
                  componentRight={this.ComponentRight}
                  navigationBarStyle={{ backgroundColor: "white" }}
                />

                {this.state.selected_tab == 1 && <Stories />}
                {this.state.selected_tab == 2 && (
                  <Container
                    style={{ borderTopWidth: 1, borderTopColor: "#bbb" }}
                    // onLayout={this.onContainerSize}
                  >
                    <FlatList
                      ref={ref => {
                        this._flatList = ref;
                      }}
                      data={this.state.listViewData}
                      renderItem={({ item, index }) => {
                        {
                          if (
                            item.description !== "" ||
                            item.medias[0].url !== ""
                          )
                            return (
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
                                        <Image
                                          source={require("./images/trashcan.png")}
                                        />
                                      </View>
                                    ),
                                    type: "delete"
                                  }
                                ]}
                              >
                                <View style={{ margin: 16 }}>
                                  <Post
                                    pdata={item}
                                    exdata={{
                                      name: this.state.queryMeData.name,
                                      avatar: this.state.queryMeData.avatar,
                                      location: this.state.queryMeData.location
                                    }}
                                    type="post"
                                    index={index}
                                    onStasht={this.onStasht}
                                  />
                                </View>
                              </Swipeout>
                            );
                        }
                      }}
                      enableEmptySections={true}
                      style={{ marginTop: 10 }}
                      keyExtractor={(item, index) => index.toString()}
                      ItemSeparatorComponent={this.ListViewItemSeparator}
                      onScroll={this.handleScroll}
                      onContentSizeChange={this.onContentSizeChange}
                    />
                    {this.state.listViewData && (
                      <ActionSheetCustom
                        ref={o => (this.ActionSheet = o)}
                        title={
                          <Text style={{ color: "#00b7af", fontSize: 18 }}>
                            Stasht Post
                          </Text>
                        }
                        options={this.actionsheet_list()}
                        cancelButtonIndex={0}
                        destructiveButtonIndex={0}
                        onPress={index => {
                          this.onPopupClicked(index);
                        }}
                        buttonUnderlayColor="#aaa"
                        styles={{
                          body: { borderRadius: 20, backgroundColor: "#fff" },
                          titleBox: { borderRadius: 20 }
                        }}
                      />
                    )}
                  </Container>
                )}
              </Container>
            </Drawer>
          );
        }}
      </Query>
    );
  }

  onStasht = post_id => {
    console.log("sdf", post_id);
    this.setState({ cur_post_id: post_id });
    this.ActionSheet.show();
  };

  onPopupClicked(index) {
    if (index == 0) return;
    if (
      index == this.elementArray.length - 1 ||
      index == this.elementArray.length - 2
    ) {
      /* 4 means 'add story', the last of option list */
      Actions.push("AddStory");
    } else {
      var curindex = this.state.cur_post_id;
      this.state.listViewData[curindex].active = false;
      if (this.state.listViewData[curindex].post_type == "")
        this.state.listViewData[curindex].post_type = "stasht";
      this.state.listViewData[curindex].tags = this.StoryNames[index - 1];
      this.setState({ listViewData: this.state.listViewData });

      // let pindex = -1;

      // for(i=0; i<this.state.listViewData.length; i++){
      //   var item = this.state.listViewData[i];

      //   if(item.tags != ''){
      //     pindex++;
      //   }
      //   if(pindex == index-1){
      //     // this._flatList.scrollToItem({
      //     //   animated:true, //can also be false
      //     //   item: item,
      //     //   viewPosition:0 //this is the first position that is currently attached to the window
      //     // });
      //     return;
      //   }
      // }
    }
  }
}

const styles = StyleSheet.create({
  container: {},
  bottombar: {
    backgroundColor: "transparent",
    // padding:10,
    position: "absolute",
    bottom: 1,
    alignSelf: "center",
    flexDirection: "column"
  },

  bottombtnactive: {
    // borderWidth: 0,
    // borderColor: '#00b7af',
    borderRadius: 30,
    margin: 10,
    width: 150,
    backgroundColor: "#00b7af",
    alignSelf: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24
  },

  btntextactive: {
    color: "#fff"
  },

  bottombtninactive: {
    borderWidth: 0,
    borderRadius: 30,
    margin: 10,
    width: 150,
    backgroundColor: "#888",
    alignSelf: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24
  },

  btntextinactive: {
    color: "#ddd"
  }
});

const drawerStyles = {
  drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 },
  main: { paddingLeft: 3 }
};
