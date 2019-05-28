import React, {Component} from 'react';
import {
    StyleSheet, 
    Image,
    TouchableOpacity,
    CameraRoll
} from 'react-native';

import { 
    Container, Header, List, ListItem, Thumbnail, Item,Icon,
    Text, Left, Body, Right, Button, View, Title, Row, Col, Grid, Input } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { RNCamera } from 'react-native-camera';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
  from 'react-native-responsive-screen';

import ImagePicker from 'react-native-image-picker';
var RNFS = require('react-native-fs');
const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

export default class CameraScreen extends React.Component {

  constructor(){
    super();
    this.state = {
      imageSource : '',
    }
  }
 
  onNext = () => {
    if(this.state.imageSource == '')
    {
      alert('Please Select a Image or take a photo.');
    }
    else{
      Actions.NewPost({imageSource: this.state.imageSource});
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
    render() {
      return (
        <Container>
          <Header style={{ backgroundColor:'white'}}>
              <Grid>
                  <Col size={1} style={{ justifyContent:'center'}}>
                    <TouchableOpacity 
                      style={{height:'100%',justifyContent:'center'}}
                      onPress={() => {Actions.pop()}}>
                        <Image source={require('./images/left-arrow.png')}></Image>
                    </TouchableOpacity>
                  </Col>

                  <Col size={3} style={{ justifyContent:'center', alignItems:'center'}}>
                      <Text style={{fontWeight:'bold', fontSize:24, color:'#00b7af'}}>Take Photo</Text>
                  </Col>
                  
                  <Col size={1} style={{ justifyContent:'center', alignItems:'flex-end'}}>
                      <TouchableOpacity style={{flexDirection:'row'}}
                        onPress={this.onNext}
                      >
                          <Text>Next   </Text>
                          <Image style={{alignSelf:'center'}} source={require('./images/right-arrow.png')}></Image>
                      </TouchableOpacity>
                  </Col>
              </Grid>
          </Header>
            <View style={styles.container}>
            <RNCamera
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
              {({ camera, status, recordAudioPermissionStatus }) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <View style={styles.bottombar}>
                    <Left>
                      <TouchableOpacity onPress={this.handleChoosePhoto} style={styles.gallerybutton}>
                        <Image style={styles.gallerybutton1} resizeMode='stretch' 
                        source={this.state.imageSource ? {uri: this.state.imageSource} : require('./images/photo1.png')}>
                        </Image>
                      </TouchableOpacity>
                    </Left>
                    
                    <Body>
                      <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                        <Image style={{width:wp('20%'), height:wp('20%')}} resizeMode='contain' source={require('./images/photo_btn.png')}/>
                      </TouchableOpacity>
                    </Body>
                    <Right></Right>
                  </View>
                );
              }}
            </RNCamera>
          </View>
        </Container>
      );
    }

    takePicture = async function(camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      CameraRoll.saveToCameraRoll(data.uri)
        .then(uri => this.setState({ imageSource: uri}))
        // .then(RNFS.unlink(data.uri))
        .catch(error => console.log('aa', error));
    };

  }


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      },

      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      capture: {
        // flex: 0,
        backgroundColor: 'transparent',
        borderRadius: 5,
        alignSelf: 'center',
      },

      gallerybutton: {
        backgroundColor: 'transparent',
        borderRadius: 20,
        alignSelf: 'flex-start',
        borderWidth: 2,
        borderColor: '#fff',
        marginLeft: 10,
      },

      gallerybutton1: {
        width:wp('15%'),
        height:wp('15%'),
        borderRadius:20,
      },

      bottombar: {
        padding:10,
        marginLeft:20,
        marginRight: 20,
        position:'absolute',
        bottom: 10,
        width:'100%',
        alignSelf:'center',
        flexDirection:'row',
      }
  });