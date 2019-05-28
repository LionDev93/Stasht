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

    import { RNCamera } from 'react-native-camera';
import {widthPercentageToDP as wp, heightPercentageToDP as hp}
from 'react-native-responsive-screen';

import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
var RNFS = require('react-native-fs');
// import VideoRecorder from 'react-native-beautiful-video-recorder';

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

export default class RecordScreen extends React.Component {

    constructor(){
      super();
      this.state= {
        capturing : false,
        imageSource : '',
      }
    }

    onNext = () => {
      if(this.state.imageSource == '')
      {
        alert('Please Select a video or take a video.');
      }
      else{
        Actions.NewPost({imageSource: this.state.imageSource});
      }
    }

    handleChooseVideo = () => {
      const option = {
        noData: true,
        mediaType: 'video',
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
                    <Text style={{fontWeight:'bold', fontSize:24, color:'#00b7af'}}>Take Video</Text>
                </Col>
                
                <Col size={1} style={{ justifyContent:'center', alignItems:'flex-end'}}>
                    <TouchableOpacity style={{flexDirection:'row'}} onPress={this.onNext}>
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
                      <TouchableOpacity onPress={this.handleChooseVideo} style={styles.gallerybutton}>
                        <Image style={styles.gallerybutton1} resizeMode='stretch' 
                        source={this.state.imageSource ? {uri: this.state.imageSource} : require('./images/photo1.png')}>
                        </Image>
                      </TouchableOpacity>
                    </Left>
                    
                    <Body>
                      <TouchableOpacity onPress={() => this.takeVideo(camera)} style={styles.capture}>
                        <Image style={{width:wp('20%'), height:wp('20%')}} resizeMode='contain' 
                          source={this.state.capturing ? require('./images/record_btn1.png') : require('./images/record_btn.png') }/>
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
     takeVideo = async function(camera) {
      if (this.state.capturing == false) {
        this.setState({capturing: true});
        const options = { quality: 0.5, base64: true };
        const data = await camera.recordAsync(options);
        CameraRoll.saveToCameraRoll(data.uri)
        .then(uri => this.setState({ imageSource: uri}))
        .catch(err => console.log('aa1',err));
      }
      else{
        this.setState({capturing: false});
        await camera.stopRecording();
      }
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
      backgroundColor: 'transparent',
      borderRadius: 5,
      alignSelf: 'center',
    },
    gallerybutton: {
      backgroundColor: 'transparent',
      alignSelf: 'flex-start',
      borderWidth: 2,
      borderColor: '#fff',
      marginLeft: 10,
    },

    gallerybutton1: {
      width:wp('15%'),
      height:wp('15%'),
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