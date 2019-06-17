import React, {Component} from 'react';
import {
    StyleSheet, 
    Image,
    TouchableOpacity,
    ImageBackground,
    Platform,
    PermissionsAndroid
} from 'react-native';

import { 
    Container, Header, List, ListItem, Thumbnail, Item,Icon,Content, Toast,
    Text, Left, Body, Right, Button, View, Title, Row, Col, Grid, Input } from 'native-base';

import { Actions } from 'react-native-router-flux';
import CameraRollPicker from 'react-native-camera-roll-picker';
import SearchableDropDown from 'react-native-searchable-dropdown';
import ContactsWrapper from 'react-native-contacts-wrapper';
import Contacts from 'react-native-contacts';
import ImagePicker from 'react-native-image-picker';
import Balloon from "react-native-balloon";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
  from 'react-native-responsive-screen';
var  stashtags  = [
	{
		id: 1,
		name: 'Stashtag-1'
	},
	{
		id: 2,
		name: 'Stashtag-2'
	},
	{
		id: 3,
		name: 'Stashtag-3'
	},
	{
		id: 4,
		name: 'Stashtag-4'
	},
	{
		id: 5,
		name: 'Stashtag-5'
	},
	{
		id: 6,
		name: 'Stashtag-6'
	},
	{
		id: 7,
		name: 'Stashtag-7'
	},

];
export default class AddStoryScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            readyPhotos : false,
            photos : [],
            msg : '',
            stashtag : '',
            invitedFriends : [],
            imageSource : '',
            prompt_on : false,
        }
    }
    async componentDidMount() {
      }

    onDone = () => {
        if(!this.state.stashtag){
            Toast.show({
                text: "You must add stasht tag!",
                buttonText: "OK",
                duration: 3000,
                position: "top",
                type: "danger"
              })
              return;
        }
        else{
            Actions.pop();
        }
    };

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

    getSelectedImages(image){
        // if(image[0]){
        // }
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

    ontagItemSelect = (item) => {
        this.state.stashtag += ', ' +item.name;
        this.setState({stashtag: item.name})
    }

    onPrompt = () => {
        alert('To add a story you will need a stashtag (ex.#mystory)\n• Any current posts with this stashtag will automatically sync to this story.\n• Re-visit old posts and put in this stashtag to sync posts.\n• Invite friends and share the stashtag to pull in their posts as well.');
    }

    render() {
      return (
        <Container>
            {/* <Balloon
                    containerStyle={styles.balloon}
                    borderColor="#fff"
                    backgroundColor="#fff"
                    borderWidth={2}
                    borderRadius={20}
                    triangleSize={0}
                    onPress={() => console.log("press")}
                >
                    <Text>To add a story you will need a stashtag (ex.#mystory)</Text>
                    <Text>• Any current posts with this stashtag will automatically sync to this story.</Text>
                    <Text>• Re-visit old posts and put in this stashtag to sync posts.</Text>
                    <Text>• Invite friends and share the stashtag to pull in their posts as well.</Text>
                </Balloon> */}
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
                            Add Story
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
            <Content>
                <Row style={{height:'auto', justifyContent:'center', alignItems:'center',
                            borderBottomWidth:1, borderBottomColor:'#ddd'
                            }}>
                    <Input placeholder='Add title' placeholderTextColor='#999' style={{left:12, fontSize:20}}></Input>
                </Row>

                <Row style={{justifyContent:'flex-start', height:'auto',borderBottomWidth:1, borderBottomColor:'#ddd'}}>
                    <Input multiline={true} placeholder='Insert description here...' placeholderTextColor='#999' 
                        style={{marginLeft:8, marginRight:8}}></Input>
                </Row>

                <Row style={{justifyContent:'space-between', margin:8, height:'auto',borderBottomWidth:1, borderBottomColor:'#ddd'}}>
                    <SearchableDropDown
                        containerStyle={{padding: 5, width:'90%'}}
                        textInputStyle={{color:'black', fontStyle:'italic', fontSize:18}}
                        items={stashtags}
                        placeholder="*add stasht tag (ex: #mytag)"
                        placeholderTextColor='#ff0000' 
                        onTextChange={(text) =>  {this.setState({stashtag: text})}}
                        onItemSelect={(item) =>  {this.ontagItemSelect}}
                        itemStyle={{
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: '#ffffff',
                            borderColor: '#bbb',
                            borderWidth: 1,
                            borderRadius:5
                        }}
                        itemTextStyle={{
                        color: '#222'
                        }}
                        itemsContainerStyle={{
                            maxHeight: 140
                        }}
                        underlineColorAndroid='transparent'
                    />
                    <TouchableOpacity activeOpacity={0.9}
                        onPress={() => this.onPrompt()} style={{alignSelf:'center'}}>
                        <Image style={{ }} source={require('./images/info-with-circle.png')} />
                    </TouchableOpacity>
                </Row>
                
                <Row style={{margin:12, height:'auto'}}>
                    <Row style={{width:'100%'}}>
                        <Button rounded style={{ width:45, height:45, backgroundColor:'#00b7af'}}
                            onPress = {() => this.onInviteFriends()}
                        >
                        <Text style={{fontSize:20}}>+</Text>
                        </Button>
                        <Text style={{marginLeft:12,fontWeight:'bold', color:'#00b7af', alignSelf:'center'}}>Add Friends</Text>
                    </Row>
                </Row>
                <Row style={{height:'auto'}}>
                    {/* <Content> */}
                        <List style={{width:'100%'}}>
                            {   this.state.invitedFriends &&
                                this.state.invitedFriends.map(contact => {
                                    return(
                                    <ListItem style={{ }}>
                                        {contact.thumbnailPath ?
                                            <Thumbnail circular small source={{uri : contact.thumbnailPath }} />
                                            : <Thumbnail circular small source={require('./images/none.png')} />
                                        }
                                            <Text style={{left:16}}>{contact.givenName}</Text>
                                    </ListItem>
                                    )
                                })
                            }
                        </List>
                        {/* </Content> */}
                    </Row>

                <Row style={{backgroundColor:'#ddd', height:50}}>
                    <Text style={{left:30, alignSelf:'center', fontWeight:'bold'}}>Add from Library</Text>
                </Row>
                
                <Row>
                    <CameraRollPicker
                        assetType='All'
                        groupTypes='All'
                        backgroundColor='#fff'
                        selectedMarker={ <Image style={{position:'absolute', width:'100%', height:'100%'}} source={require('./images/selected-overlay.png')} resizeMode="stretch"></Image> }
                        callback={this.getSelectedImages} />
                </Row>
            </Content>
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

    balloon: {
        position: 'absolute',
        alignSelf:'center',
        zIndex: -100,
        opacity: 100,
    }
  });