import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import { Toast } from 'native-base';
import SwitchToggle from 'react-native-switch-toggle';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

export default class ConnectScreen extends React.Component {

    constructor(){
      super();
      this.state = {
          toggleInstagram: true,
          toggleFacebook: false,
      }
    }
    render() {
      return (
        <View style={styles.ConnectScreenContainer}>
            <View style={styles.TopContainer}>
                <Image
                  source={require('./images/postlogo.png')}
                />
                <Text style={styles.TitleText}>Connect Accounts</Text>
                <Text style={styles.BodyText}>Please choose at least one network</Text>
                <Text style={styles.BodyText}>so we can access your photos and posts.</Text>
                
            </View>

            <View style={styles.MiddleContainer}>
              <View style={styles.SwitchButton}>
              <Image
                  source={require('./images/instagram.png')} 
                  style={{ width: 120, height: 40}} 
                  resizeMode="contain"
                />
                <SwitchToggle style={{marginLeft:30}}
                  containerStyle={{
                    marginTop: 2,
                    width: 50,
                    height: 25,
                    borderRadius: 30,
                    padding: 5,
                    marginLeft:20
                  }}
                  backgroundColorOn='#00B7B0'
                  backgroundColorOff='#95989A'
                  circleStyle={{
                    width: 22,
                    height: 22,
                    borderRadius: 27.5,
                    backgroundColor: 'blue', // rgb(102,134,205)
                  }}
                  circleColorOff='#eeeeee'
                  circleColorOn='white'
                  duration={300}
                  // type={1}
                  switchOn={this.state.toggleInstagram}
                  onPress={ () => this.onSwitchInstagram()}
                />
              </View>
              
              <View style={styles.SwitchButton}>
              <Image
                  source={require('./images/facebook.png')} 
                  style={{ width: 120, height: 40}} 
                  resizeMode="contain"
                />
                <SwitchToggle style={{marginLeft:30}}
                  containerStyle={{
                    marginTop: 2,
                    width: 50,
                    height: 25,
                    borderRadius: 30,
                    padding: 5,
                    marginLeft:20
                  }}
                  backgroundColorOn='#00B7B0'
                  backgroundColorOff='#95989A'
                  circleStyle={{
                    width: 22,
                    height: 22,
                    borderRadius: 27.5,
                    backgroundColor: 'blue', // rgb(102,134,205)
                  }}
                  circleColorOff='#eeeeee'
                  circleColorOn='white'
                  duration={300}
                  // type={1}
                  switchOn={this.state.toggleFacebook}
                  onPress={ () => this.onSwitchFacebook()}
                />
              </View>
               
            </View>

            <View style={styles.BottomContainer}>
                <LinearGradient
                    colors={['#52ede6', '#21CFC8']}
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                    style={styles.gradientButton}
                >
                    <TouchableOpacity style={styles.gradientButton} activeOpacity={0.6}
                     onPress={() => Actions.Main()}
                      >
                        <Text style={styles.buttonText}>
                            NEXT   >
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>

              <Text style={{ color: '#00b7af', textAlign: 'center', margin:10, textDecorationLine:'underline'}}

                    onPress={() => Actions.Main()}
                    >
                    Skip this step
              </Text>
            </View>
          </View>
        
      );
    }

    onSwitchInstagram() {
      if(this.state.toggleFacebook == false && this.state.toggleInstagram == true){
        Toast.show({
          text: "Turn on more than one!",
          buttonText: "OK",
          duration: 3000,
          position: "top",
          // type: "warning",
          style: {
            backgroundColor: "#8A69C4"
           }
        })
         return;
      }

      this.setState({toggleInstagram: !this.state.toggleInstagram})
    }
    onSwitchFacebook() {
      if(this.state.toggleInstagram == false && this.state.toggleFacebook == true){
        Toast.show({
          text: "Turn on more than one!",
          buttonText: "OK",
          duration: 3000,
          position: "top",
          type: "warning"
        })
        return;
      }

      this.setState({toggleFacebook: !this.state.toggleFacebook})
    }
    
  }


  const styles = StyleSheet.create({
      ConnectScreenContainer: {
        //  flex: 1,
        width: '100%',
        height: '100%',
         flexDirection: 'column',
         justifyContent: 'space-between',
         alignItems: 'center',
         backgroundColor: 'white',
      },

      TopContainer: {
        // flex: 1.5,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 70,
        // backgroundColor: 'green',
      },

      TitleText: {
        color: '#00b7af',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 25,
      },

      BodyText: {
        color: '#00b7af',
        fontSize: 12,
        margin: 2,
      },
      
      MiddleContainer: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // backgroundColor: 'black',
        paddingTop: 20,
      },

      SwitchButton: {
          // flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 10,
          // backgroundColor: 'red',
      },

      BottomContainer: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 30,
        // backgroundColor: 'blue',
        alignItems: 'center',
      },

      gradientButton: {
         height: 45,
         marginTop: 10,
         width:240,
         borderRadius: 40,
         alignItems: 'center',
         justifyContent:'center',
        //  backgroundColor:'blue'
      },


      buttonContainer: {
        width: 200,
        alignItems: 'center',
        justifyContent:'center',
    },
    buttonText: {
        textAlign: 'center',
        // backgroundColor:'red',
        alignSelf: 'center',
        color: '#fff',
        // padding: 15,
        // width: 200
        // fontSize: 20
        fontWeight:'bold',
        top: -5

    },

    nextButton: {
      height: 45,
      marginTop: 10,
      width:240,
      borderRadius: 40,
      backgroundColor: '#00b7af',
   },
      
  });