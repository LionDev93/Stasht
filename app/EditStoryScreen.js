import React, {Component} from 'react';
import {
    StyleSheet, 
    Image,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
    ImageBackground,
    FlatList
} from 'react-native';

import { 
    Container, Header, List, ListItem, Thumbnail, Item,Icon,Content, Toast,
    Text, Left, Body, Right, Button, View, Title, Row, Col, Grid, Input } from 'native-base';

import { Actions } from 'react-native-router-flux';
import ContactsWrapper from 'react-native-contacts-wrapper';
import Contacts from 'react-native-contacts';
import Swipeout from 'react-native-swipeout';

export default class EditStoryScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            invitedFriends: [],
            imageSource: '',
        }
    }
    getContactData() {
        ContactsWrapper.getContact()
                    .then((contact) => {
                        for(var j=0; j<this.state.invitedFriends.length; j++){
                            if(this.state.invitedFriends[j].givenName == contact.name){
                                Toast.show({
                                    text: "Already Added",
                                    buttonText: "OK",
                                    duration: 3000,
                                    position: "bottom",
                                    style: {
                                      backgroundColor: "#8A69C4"
                                     }
                                  })
                                return;
                            }
                        }
                        Contacts.getAll((err, contacts) => {
                            if (err) {
                              throw err;
                            }
                            console.log('a', contacts);
                            var curIndex = 0;
                            for(var i=0; i< contacts.length; i++){
                                if( contacts[i].givenName == contact.name){
                                    curIndex = i;
                                    break;
                                }
                            }
            
                            ss = this.state.invitedFriends;
                            ss.push(contacts[curIndex]);
                            this.setState({invitedFriends: ss});
                          })
                        })
                        .catch((error) => {
            
                        });
    }
    onInviteFriends() {
            if(Platform.OS === 'ios'){
                this.getContactData();
            }
            else{
                const granted= PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                    {
                    'title': 'Contacts',
                    'message': 'This app would like to view your contacts.',
                    buttonPositive: 'OK',
                    }
                ).then((result) => {
                    console.log('aaaaa',result);
                    if(result === 'granted'){
                        this.getContactData()
                    }
                })
            }
    }

    handleChoosePhoto = () => {
        const option = {
          noData: true,
          mediaType: 'photo'
        };
        ImagePicker.launchImageLibrary(option, response=> {
          
          if(response.uri){
            console.log('tag', response);
            this.setState({ imageSource: response.uri});
          }
         
        });
      }

    deleteRow(index) {
        this.state.invitedFriends.splice(index,1)
        this.setState({ invitedFriends: this.state.invitedFriends});
    }
    render() {
      return (
        <Container>
        <ImageBackground 
                blurRadius={ Platform.OS == 'ios' ? 8 : 4 } 
                source={this.state.imageSource ? {uri: this.state.imageSource} : require('./images/timeline_bg.png')} 
                style={{ width: '100%', height:120, flexDirection:'column'}} 
                resizeMode="stretch"
            >
                <Row style={{height:70, justifyContent:'space-between'}}>
                    <Left style={{ justifyContent:'center'}}>
                        <TouchableOpacity 
                            style={{height:'100%',justifyContent:'center', width:60}}
                            onPress={() => {Actions.pop()}}>
                        
                        <Icon name="arrow-back" style={{color:'#fff', fontSize:18, marginLeft:16, marginRight:16}}/>
                        </TouchableOpacity>
                    </Left>

                    <Body style={{ justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontWeight:'bold', fontSize:24, color:'#fff',
                                textShadowColor: 'rgba(0, 0, 0, 0.35)',
                                textShadowOffset: {width: -1, height: 1},
                                textShadowRadius: 10}}>
                            Edit Story
                        </Text>
                    </Body>
                    
                    <Right style={{ justifyContent:'center', alignItems:'flex-end'}}>
                        <TouchableOpacity style={{flexDirection:'row', right:12, justifyContent:'center', alignItems:'center'}}
                            onPress={()=> {this.onDone()}}>
                            <Text style={{color:'#fff'}}>Done  </Text>
                            <Icon name="arrow-forward" style={{color:'#fff', fontSize:18}}/>
                        </TouchableOpacity>
                    </Right>
                </Row>
                <Row></Row>
                <Row style={{height:40, alignItems:'center'}}
                    onPress={this.handleChoosePhoto}>
                    <Icon name="camera" style={{color:'#fff', fontSize:18, marginLeft:16, marginRight:16}}/>
                    <Text style={{color:"#fff"}}>Change Cover Image.</Text>
                </Row>
            </ImageBackground>
            <Grid>
                <Row style={{margin:16, height:50, justifyContent:'flex-start', borderBottomColor:'#ccc', borderBottomWidth:1}}>
                    <Input style={{textAlignVertical:'center', fontSize:20, fontWeight:'bold'}}
                        placeholder='Mexico 2019'
                    ></Input>
                </Row>

                <Row style={{marginLeft:16, marginBottom:16, height:50,borderBottomColor:'#ccc', borderBottomWidth:1}}>
                    <Input style={{}}
                        placeholder='Our travel pics from our Mexico trip 2019'>
                    </Input>
                </Row>
                
                <Row style={{height:50, borderBottomColor:'#ccc', borderBottomWidth:1}}>
                    <TouchableOpacity activeOpacity={0.9} style={{justifyContent:'center'}}
                        onPress = {() => this.onInviteFriends()}>
                        <Text style={{marginLeft:20,fontWeight:'bold', fontSize:18, color:'#00b7af' 
                            , textAlignVertical:'center'}}>+ Add more friends
                        </Text>
                    </TouchableOpacity>
                </Row>

                <Row style={{}}>
                    <FlatList
                        data = { this.state.invitedFriends}
                        renderItem={({item,index}) => 
                        <Swipeout 
                            backgroundColor='#fff'
                            autoClose= {true}
                            left= {[
                                {
                                onPress: () => {
                                    this.deleteRow(index)
                                },
                                component: (
                                    <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                            <Image source={require('./images/trashcan.png')}/>
                                    </View>
                                    ),
                                type: "delete",
                                }
                            ]}>
                            <Row style={{marginLeft:16, marginTop:12, paddingBottom:8, borderBottomColor:'#ccc', borderBottomWidth:1}}>
                                {item.thumbnailPath ?
                                    <Thumbnail circular small source={{uri : item.thumbnailPath }} />
                                    : <Thumbnail circular small source={require('./images/none.png')} />
                                }
                                <Text style={{left:16, alignSelf:'center'}}>{item.givenName}</Text>
                            </Row>
                        </Swipeout>
                        }
                        enableEmptySections={true}
                        style={{ marginTop: 10 }}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        onScroll={this.handleScroll}
                        onContentSizeChange={this.onContentSizeChange}
                    />
                </Row>

                <Row style={{height:50}}>
                    <Body><Text style={{color:'red', textDecorationLine:'underline', 
                        textAlignVertical:'center', alignContent:'center'}}>Delete Story</Text>
                    </Body>
                </Row>
            </Grid>
        </Container>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
  });