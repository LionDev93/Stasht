import React, {Component} from 'react';
import {
    StyleSheet, 
    Image,
    TouchableOpacity,
} from 'react-native';

import { 
    Container, Header, List, ListItem, Content,Separator,
    Text, Row, Col, Grid, Input, View } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { Avatar, Badge} from 'react-native-elements';
import CameraRollPicker from 'react-native-camera-roll-picker';


export default class NewPostScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            readyPhotos : false,
            photos : '',
            stashtagName : '',
        }
        console.log('ppp', this.props.imageSource);
    }

    getSelectedImages(image){
        
    }

    render() {
      return (
        <Container>
            <Header   style={{ backgroundColor:'white'}}>
                <Grid>
                    <Col size={1} style={{ justifyContent:'center'}}>
                        <TouchableOpacity style={{height:'100%',justifyContent:'center'}}
                        onPress={() => {Actions.pop()}}>
                            <Image source={require('./images/left-arrow.png')}></Image>
                        </TouchableOpacity>
                    </Col>

                    <Col size={4} style={{ justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontWeight:'bold', fontSize:24, color:'#00b7af'}}>New Post</Text>
                    </Col>
                    
                    <Col size={1} style={{ justifyContent:'center', alignItems:'flex-end'}}>
                        <TouchableOpacity style={{flexDirection:'row'}}>
                            <Text>NEXT   </Text>
                            <Image style={{alignSelf:'center'}} source={require('./images/right-arrow.png')}></Image>
                        </TouchableOpacity>
                        
                    </Col>
                </Grid>
            </Header>
            <Content>
                <Row style={{height:100, marginBottom:2,}}>
                    <Input placeholder='Insert description here...' placeholderTextColor='#999' 
                        style={{marginLeft:8}} multiline/>
                </Row>

                <Row style={{backgroundColor:'red', height:400}}>
                    <Image source={{uri: this.props.imageSource}}
                        resizeMode='stretch' 
                        style={{width:'100%', height:null}}
                    />
                </Row>
                
                <Row style={{backgroundColor:'#ddd', height:50}}>
                        <Text style={{left:30, alignSelf:'center', fontWeight:'bold'}}>Add from Library</Text>
                </Row>
                    
                <Row style={{height:280}}>
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
  });