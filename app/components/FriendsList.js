
import React, {Component} from 'react';
import {
    StyleSheet, 
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { 
  Container, Header, List, ListItem, Thumbnail, Tab, Tabs, 
  Text, Left, Body, Right, Button, View, Badge, Row, Col, Grid } from 'native-base';
import TagBoard from './TagBoard';
import Contacts from 'react-native-contacts';
import Swipeout from 'react-native-swipeout';

export default class FriendsList extends React.Component {
  constructor(){
    super();
    this.state= {
      selected_tab : 'friends',
      allContacts: [],
      friendsList: [],
      checkedInfo: [],
    }

    Contacts.getAll((err, contacts) => {
        console.log('contacts : cnt = ', contacts.length);
        this.setState({allContacts: contacts, checkedInfo: new Array(contacts.length)});
        
    })
  }

  componentWillUnmount() {
      
  }

  deleteFriend(index) {
    this.state.friendsList.splice(index,1)
    this.setState({ friendsList: this.state.friendsList});
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#fff',
          borderTopColor: '#bbb',
          borderTopWidth: 1,
        }}
      />
    );
  };
  
  onContactClick( index ) {
    //   console.log('sdf','sdf');
    this.state.checkedInfo[index] = !this.state.checkedInfo[index];
    this.setState({checkedInfo: this.state.checkedInfo});
  }

  pushContactToFriendsList( contact ) {
      var flag = false;
      for(var i=0; i< this.state.friendsList.length; i++){
          console.log('asdf', this.state.friendsList[i])
          if(this.state.friendsList[i].givenName == contact.givenName) {
            flag = true;
            break;
          }
      }

      if(flag == false){
          this.state.friendsList.push(contact);
          return true;
      }
      return false;
  }
  onAddContacts() {
    var flag = false;
    this.state.checkedInfo.map((item, index) => {
        if(item == true) {
            var ss = this.state.allContacts[index];
            console.log('1', this.state.allContacts[index])
            if(this.pushContactToFriendsList(ss)){
                flag = true;
            }
            this.state.checkedInfo[index] = false;
        }
    })

    if(flag)
        this.setState({friendsList: this.state.friendsList});
    this.setState({checkedInfo: this.state.checkedInfo})
    
  }

  render() {
      return (
        <Container>
            <Header style={{ backgroundColor:'white'}}>
                <Grid>
                    <Col size={1} style={{ justifyContent:'center'}}>
                        <TouchableOpacity 
                        style={{height:'100%',justifyContent:'center'}}
                        onPress={() => {Actions.pop()}}>
                            <Image source={require('../images/left-arrow.png')}></Image>
                        </TouchableOpacity>
                    </Col>

                    <Col size={3} style={{ justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontWeight:'bold', fontSize:24, color:'#00b7af'}}>Friends List</Text>
                    </Col>
                    
                    <Col size={1} style={{ justifyContent:'center', alignItems:'flex-end'}}>
                        {/* <TouchableOpacity style={{flexDirection:'row'}}
                            onPress={this.onNext}
                        >
                            <Text>Next   </Text>
                            <Image style={{alignSelf:'center'}} source={require('../images/right-arrow.png')}></Image>
                        </TouchableOpacity> */}
                    </Col>
                </Grid>
            </Header>

          <Tabs locked={true} tabBarPosition='top' tabBarUnderlineStyle={{backgroundColor:'#00b7af'}}>
            <Tab heading="Friends" 
              tabStyle={{backgroundColor:'white'}} textStyle={{ color: '#00b7af'}}
              activeTabStyle={{backgroundColor:'white'}} activeTextStyle={{ color: '#00b7af', fontWeight:'bold'}}>
                <FlatList
                    // ref={(ref) => { this._flatList = ref; }}
                    data = { this.state.friendsList}
                    renderItem={({item,index}) => 
                      <Swipeout 
                          backgroundColor='#fff'
                          autoClose= {true}
                          left= {[
                            {
                              onPress: () => {
                                this.deleteFriend(index)
                              },
                              component: (
                                <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                          <Image source={require('../images/trashcan.png')}/>
                                </View>
                                ),
                              type: "delete",
                            }
                          ]}>
                       <View
                            style={{marginLeft:16, marginTop:5, marginBottom:5, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                            
                            {item.thumbnailPath ?
                                <Thumbnail circular source={{uri : item.thumbnailPath }} />
                                : <Thumbnail circular  source={require('../images/none.png')} />
                            }
                            <Text style={{left:16}}>{item.givenName}</Text>
                        </View>
                      </Swipeout>
                    }
                    enableEmptySections={true}
                    style={{ marginTop: 10 }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                />
            </Tab>

            <Tab heading="All Contacts" 
              tabStyle={{backgroundColor:'white'}} textStyle={{ color: '#00b7af'}}
              activeTabStyle={{backgroundColor:'white'}} activeTextStyle={{ color: '#00b7af', fontWeight:'bold'}}>

                <FlatList
                    // ref={(ref) => { this._flatList = ref; }}
                    data = { this.state.allContacts}
                    renderItem={({item,index}) => 
                        <TouchableOpacity activeOpacity={0.5}
                            style={{marginLeft:5, marginTop:5, marginBottom:5, flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}
                            onPress={() => this.onContactClick(index)}>
                            {this.state.checkedInfo[index] ? 
                                <View style={styles.circle_checked}></View>
                                :
                                <View style={styles.circle}/>
                            }
                            
                            {item.thumbnailPath ?
                                <Thumbnail circular source={{uri : item.thumbnailPath }} />
                                : <Thumbnail circular  source={require('../images/none.png')} />
                            }
                            <Text style={{left:16}}>{item.givenName}</Text>
                        </TouchableOpacity>
                    }
                    enableEmptySections={true}
                    style={{ marginTop: 10 }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.ListViewItemSeparator}
                />
                <Row style={styles.bottomArea}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => this.onAddContacts()}>
                        <Text style={{ color:'#00b7af',textDecorationLine: 'underline' }} uppercase={false}>+Add Contacts</Text>
                    </TouchableOpacity>
              </Row>
            </Tab>
        </Tabs>

      </Container>
      );
  }

}


  const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    circle: {
        backgroundColor: 'transparent',
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: '#000',
        borderWidth: 1,
        margin:8
    },

    circle_checked: {
        width: 20,
        height: 20,
        borderRadius: 20,
        borderColor: '#000',
        borderWidth: 1,
        margin: 8,
        backgroundColor:'#00b7af'
    },

    bottomArea: {
        height:60,
        justifyContent:'center',
        alignItems:'center',
        borderTopWidth:1,
        borderTopColor:'#ccc',
      },

  });