import React, {Component} from 'react';
import {
    StyleSheet, 
    ImageBackground,
    Keyboard,
    TouchableWithoutFeedback, 
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Image,
    TextInput
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
  from 'react-native-responsive-screen';
import {
  Container, Content,Header, List, ListItem, Tab, Tabs, Grid, Form, Item,Label,
  Text, Left, Body, Right, Button, View, Icon, Row, Col } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { Toast } from 'native-base';

export default class LogInScreen extends React.Component {

    constructor(){
      super();
      this.state = {
        email : '',
        email_validated : false,
        password: '',
        password_validated : false,
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
    validatePassword(text){
      if(text.length < 6 )
      {
        this.setState({password:text, password_validated:false})
      }
      else {
          this.setState({password:text, password_validated:true})
      }
    }

    onLoginPress(){
      if(this.state.email_validated && this.state.password_validated)
      {
        Actions.Connect();
      }
      else{
        Toast.show({
          text: "This is the wrong username or password.",
          buttonText: "OK",
          duration: 3000,
          position: "top",
          // type: "warning",
          style: {
            backgroundColor: "#8A69C4"
           }
        })
      } 
    }

    render() {
      return (
        <Container>
             {/* <Image source={require('./images/login_bg_1.png')} resizeMode="cover"/> */}
           <ImageBackground 
            style={styles.upperregion} 
            source={require('./images/login_bg.png')}
            >
                <KeyboardAvoidingView  style={styles.containerView}  enabled={true}
                behavior='padding' keyboardVerticalOffset={-150}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                       <Grid>
                            <Row size={4} style={{}}>
                                <Body>
                                  <Text style={styles.logoText}>stasht.</Text>
                                </Body>
                            </Row>
                            <Row size={1} style={{flexDirection:'column', justifyContent:'center'
                                , alignItems:'center'}}>
                                <TouchableOpacity activeOpacity={0.9}
                                    style={styles.fbLoginButton}
                                    onPress={() => this.onLoginPress()}>
                                    <View style={{justifyContent:'center', flexDirection:'row'}}>
                                        <Image source={require('./images/facebook1.png')}
                                            style={{right:3, alignSelf:'center'}}
                                        />
                                        <Text style={styles.fbloginText}>Sign-in with Facebook</Text>
                                    </View>
                                </TouchableOpacity>
                            </Row>
                            <Row size={1}>
                              <Body>
                                <Text style={{color:'white',fontSize:wp('3.5%'), paddingTop:10}}>OR</Text>
                              </Body>
                            </Row>
                            <Row size={3.5} style={{justifyContent:'center'}}>
                                <Form style={{width:'90%'}}>
                                  <Label style={{color:'#fff', fontSize:wp('3%'), marginLeft:20}}>Email</Label>
                                  <Item>
                                    <TextInput placeholder='stasht@gmail.com' placeholderTextColor='rgba(255,255,255,0.5)'
                                      style={{color:'#fff', fontSize:wp('4%'), width:'90%'}}
                                      onChangeText={(text) => this.validateEmail(text)}
                                      returnKeyType = "next"
                                      onSubmitEditing={() => {this.input2.focus();}}
                                      blurOnSubmit={true}
                                    />
                                    {this.state.email!='' && this.state.email_validated==true &&
                                      <Icon name='checkmark-circle' style={{color:'#0FF22D'}}/>
                                    }
                                    {this.state.email!='' && this.state.email_validated==false &&
                                      <Icon name='close-circle' style={{color:'#eee'}}/>
                                    }
                                  </Item>
                                  <Label style={{color:'#fff', fontSize:wp('3%'), marginLeft:20, marginTop:10}}>Password</Label>
                                  <Item >
                                    <TextInput secureTextEntry placeholder='*********' placeholderTextColor='rgba(255,255,255,0.5)'
                                        style={{color:'#fff', fontSize:wp('4%'),width:'90%'}}
                                        onChangeText={(text) => this.validatePassword(text)}
                                        getRef = {this.input2}
                                        ref={(ref) => { this.input2 = ref; }}
                                    />
                                      {this.state.password!='' && this.state.password_validated==true &&
                                       <Icon name='checkmark-circle' style={{color:'#0FF22D'}}/>
                                      }
                                      {this.state.password!='' && this.state.password_validated==false &&
                                        <Icon name='close-circle' style={{color:'#eee'}}/>
                                      }
                                  </Item>
                                  <TouchableOpacity activeOpacity={0.9}
                                  >
                                  <Text note style={{color: 'white', textAlign:'center', marginTop:20, fontSize:wp('3%')
                                      ,textDecorationLine: 'underline'}} 
                                      onPress={() => {Actions.ForgotPwd()}}>Forgot Password?</Text>
                                </TouchableOpacity>
                                </Form>
                                
                                </Row>
                                <Row size={2.5} style={{flexDirection:'column', alignItems:'center'}}>
                                <TouchableOpacity activeOpacity={0.9}
                                    style={styles.loginButton}
                                    onPress={() => this.onLoginPress()}>
                                    <Text style={styles.loginText}>LOGIN NOW   ></Text>
                                </TouchableOpacity>
                                <View style={{flexDirection:'row', alignContent:'center'}}>
                                  <Text note style={{color: 'white', textAlign:'center', margin:10, fontSize:wp('3.5%')}}>new user?</Text>
                                  <Text note style={{color: 'white', textAlign:'center', margin:10, fontSize:wp('3.5%')
                                        ,textDecorationLine: 'underline'}} 
                                        onPress={() => {Actions.Signup()}}
                                  >
                                    Create Account.
                                  </Text>
                                </View>
                            </Row>
                        </Grid>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ImageBackground>
          </Container>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
      },
      upperregion: {
        width:'100%',
        height:'100%'
      },

      containerView: {
         color: 'white',
         width: '100%',
         height:'100%'
         
      },
      loginScreenContainer: {
      },
      logoText: {
        fontSize: wp('14%'),
        fontWeight: "800",
        textAlign: 'center',
        color: 'white',
        fontFamily: 'gibson-regular',
      },

      loginFormView: {
        flex: 1,
        justifyContent: 'center',
        width: 300,
      },
      loginFormTextInput: {
        fontSize: 12,
        borderRadius: 5,
        borderWidth: 0,
        borderColor: 'white',
        backgroundColor: 'transparent',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
        color: 'white',
        width: '90%',
      },
      loginButton: {
        backgroundColor: 'white',
        borderRadius: 45,
        height: 45,
        marginTop: 30,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        width: '70%',
      },
      loginText: {
        color:'#00b7af',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontWeight: 'bold',
      },

      fbLoginButton: {
        borderRadius: 45,
        height: 45,
        marginTop: 30,
        justifyContent: 'center',
        backgroundColor: '#3B5998',
        width: '70%'
      },
      fbloginText: {
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontWeight:'bold',
      },
  });