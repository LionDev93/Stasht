import React, {Component} from 'react';
import {
    StyleSheet, 
    Image,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView
} from 'react-native';

import { 
    Container, Header, List, ListItem, Thumbnail, Item,Icon,Content,Label,
    Text, Left, Body, Right, Button, View, Form, Row, Col, Grid, Input, Toast } from 'native-base';

import { Actions } from 'react-native-router-flux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
  from 'react-native-responsive-screen';

export default class ForgotPwdScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            email : '',
            email_validated : false,
        }
    }

    validateEmail(text){
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
          this.setState({email:text, email_validated:false})
        }
        else {
            this.setState({email:text, email_validated:true})
        }
      }

    onRecover() {
        if(this.state.email_validated){
            Actions.reset('Login');
        }
        else{
            Toast.show({
                text: "Some Wrongs in your input!",
                buttonText: "OK",
                duration: 3000,
                position: "top",
                style: {
                  backgroundColor: "#8A69C4"
                 }
            });    
        }
        
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

                    <Col size={4} style={{ justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontWeight:'bold', fontSize:24, color:'#00b7af'}}>Forgot Password</Text>
                    </Col>
                    
                    <Col size={1} style={{ justifyContent:'center', alignItems:'flex-end'}}>
                    </Col>
                </Grid>
            </Header>
            <KeyboardAvoidingView  style={styles.containerView}  enabled={true}
                behavior='padding' keyboardVerticalOffset={-150}>
            <Grid style={{justifyContent:'space-between'}}>
                <Row>

                </Row>
                <Row style={{alignItems:'center'}}>
                        <Body>
                    <Image 
                        source={require('./images/forgot.png')}
                        style={{ width: '75%'}} 
                        resizeMode='contain'
                    />
                    </Body>
                </Row>
                <Row style={{flexDirection:'column', alignItems:'center'}}>
                    <Text note>Please enter your email below</Text>
                </Row>
                <Row style={{}}>
                    <Form style={{width:'90%'}}>
                        <Label style={{color:'#00b7af', fontSize:wp('4%'), marginLeft:20}}>Email</Label>
                        <Item>
                        <Input placeholder='stasht@gmail.com' placeholderTextColor='rgba(0,0,0,0.5)'
                                style={{color:'#000', fontSize:wp('4%'),backgroundColor:'#fff'}}
                                onChangeText={(text) => this.validateEmail(text)}
                                value={this.state.email}
                        />
                        {this.state.email!='' && this.state.email_validated==true &&
                            <Icon name='checkmark-circle' style={{color:'#00b7af'}}/>
                        }
                        {this.state.email!='' && this.state.email_validated==false &&
                            <Icon name='close-circle' style={{color:'#111'}}/>
                        }
                        </Item>
                    </Form>
                </Row>
                <Row>
                    <Body>
                        <Button 
                            style={{ borderWidth:0 , borderRadius:30, margin:20,width:240,
                            backgroundColor:'#00b7af', alignSelf:'center', justifyContent:'center'}}
                            onPress={() => this.onRecover()}
                        >
                            <Text>Recover Password</Text>
                        </Button>
                    </Body>
                </Row>
                <Row>
                </Row>
            </Grid>
            </KeyboardAvoidingView>
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
      containerView: {
        color: 'white',
        width: '100%',
        height:'100%'
        
     },
      upperregion: {
        width:'100%',
        height:'100%'
      },
  });