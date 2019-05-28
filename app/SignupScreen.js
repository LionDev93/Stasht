import React, {Component} from 'react';
import {
    StyleSheet, 
    ImageBackground,
    Keyboard,
    TouchableWithoutFeedback, 
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    TextInput
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
  from 'react-native-responsive-screen';
import {
  Container, Grid, Form, Item,Label,
  Text, Left, Body, Right, Button, View, Icon, Row, Col } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { Toast } from 'native-base';


export default class SignupScreen extends React.Component {

    constructor(){
        super();
        this.state = {
          fullname : '',
          fullname_validated : '',
          email : '',
          email_validated : false,
          password: '',
          password_validated : false,
          password_confirm: '',
          password_confirmed: false,
        }
      }

      validateFullname(text){
        if(text.length < 1 )
        {
          this.setState({fullname:text, fullname_validated:false})
        }
        else {
            this.setState({fullname:text, fullname_validated:true})
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

    validatePassword_confirm(text){
      if(text != this.state.password )
      {
        this.setState({password_confirm:text, password_confirmed:false})
      }
      else {
          this.setState({password_confirm:text, password_confirmed:true})
      }
    }
    render() {
      return (
        <Container>
          <ImageBackground 
            style={styles.upperregion} 
            source={require('./images/login_bg.png')}>
              <KeyboardAvoidingView style={styles.containerView} behavior='static' >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <Grid >
                    <Row size={4}>
                      <Body>
                        <Text style={styles.logoText}>stasht.</Text>
                      </Body>
                    </Row>

                    <Row size={1} style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity activeOpacity={0.9}
                            style={styles.fbLoginButton}
                            onPress={() => this.onSignupPress()}>
                            <View style={{justifyContent:'center', flexDirection:'row'}}>
                                <Image source={require('./images/facebook1.png')}
                                    style={{right:3, alignSelf:'center'}}
                                />
                                <Text style={styles.fbloginText}>Sign-up with Facebook</Text>
                            </View>
                        </TouchableOpacity>
                    </Row>

                    <Row size={1}>
                      <Body><Text style={{color:'white',fontSize:wp('3.5%'), paddingTop:10}}>OR</Text></Body>
                    </Row>

                    <Row size={6} style={{justifyContent:'center'}}>
                      <Form style={{width:'90%'}}>
                        <Label style={{color:'#fff', fontSize:wp('3%'), marginLeft:20}}>Full Name</Label>
                        <Item>
                          <TextInput placeholder='Aaron Smith' placeholderTextColor='rgba(255,255,255,0.5)'
                                style={{color:'#fff', fontSize:wp('4%'), width:'90%'}}
                                onChangeText={(text) => this.validateFullname(text)}
                                returnKeyType = "next"
                                onSubmitEditing={() => {this.input2.focus();}}
                                blurOnSubmit={true}
                          />
                          {this.state.fullname!='' && this.state.fullname_validated==true &&
                            <Icon name='checkmark-circle' style={{color:'#0FF22D'}}/>
                          }
                          {this.state.fullname!='' && this.state.fullname_validated==false &&
                            <Icon name='close-circle' style={{color:'#eee'}}/>
                          }
                        </Item>

                        <Label style={{color:'#fff', fontSize:wp('3%'), marginLeft:20}}>Email</Label>
                        <Item>
                          <TextInput placeholder='stasht@gmail.com' placeholderTextColor='rgba(255,255,255,0.5)'
                                style={{color:'#fff', fontSize:wp('4%'), width:'90%'}}
                                onChangeText={(text) => this.validateEmail(text)}
                                returnKeyType = "next"
                                onSubmitEditing={() => {this.input3.focus();}}
                                blurOnSubmit={true}
                                ref={(ref) => { this.input2 = ref; }}
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
                              style={{color:'#fff', fontSize:wp('4%'), width:'90%'}}
                              onChangeText={(text) => this.validatePassword(text)}
                              returnKeyType = "next"
                              onSubmitEditing={() => {this.input4.focus();}}
                              blurOnSubmit={true}
                              ref={(ref) => { this.input3 = ref; }}
                          />
                            {this.state.password!='' && this.state.password_validated==true &&
                              <Icon name='checkmark-circle' style={{color:'#0FF22D'}}/>
                            }
                            {this.state.password!='' && this.state.password_validated==false &&
                              <Icon name='close-circle' style={{color:'#eee'}}/>
                            }
                        </Item>

                        <Label style={{color:'#fff', fontSize:wp('3%'), marginLeft:20, marginTop:10}}>Confirm-Password</Label>
                        <Item >
                          <TextInput secureTextEntry placeholder='*********' placeholderTextColor='rgba(255,255,255,0.5)'
                              style={{color:'#fff', fontSize:wp('4%'), width:'90%'}}
                              onChangeText={(text) => this.validatePassword_confirm(text)}
                              ref={(ref) => { this.input4 = ref; }}
                          />
                            {this.state.password_confirm!='' && this.state.password_confirmed==true &&
                              <Icon name='checkmark-circle' style={{color:'#0FF22D'}}/>
                            }
                            {this.state.password_confirm!='' && this.state.password_confirmed==false &&
                              <Icon name='close-circle' style={{color:'#eee'}}/>
                            }
                        </Item>
                      </Form>
                    </Row>

                    <Row size={2.5} style={{flexDirection:'column', alignItems:'center'}}>
                      <TouchableOpacity activeOpacity={0.9}
                          style={styles.loginButton}
                          onPress={() => this.onSignupPress()}>
                          <Text style={styles.loginText}>Register ></Text>
                      </TouchableOpacity>
                      <View style={{flexDirection:'row', alignContent:'center'}}>
                          <Text note style={{color: 'white', textAlign:'center', margin:10, fontSize:wp('3.5%')
                              ,textDecorationLine: 'underline'}} 
                              onPress={() => {Actions.pop()}}>
                              back to Login.
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

    onSignupPress(){
      if(this.state.email_validated && this.state.password_validated 
          && this.state.fullname_validated && this.state.password_confirmed)
      {
        Actions.Connect();
      }
      else{
        Toast.show({
          text: "Some Wrongs in your input!",
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
         flex: 1,
         color: 'white',
         
      },
      loginScreenContainer: {
        // flex: 1,
      },
      logoText: {
        fontSize: wp('12%'),
        fontWeight: "800",
        textAlign: 'center',
        color: 'white',
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
        // fontSize: wp('3%'),
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