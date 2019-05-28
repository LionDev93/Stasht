import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View,
    Image
} from 'react-native';


export default class SplashScreen extends React.Component {
    render() {
      return (
        <View style={styles.container}>
            <Image 
              source={require('./images/splash.png')} 
              style={{ width: '100%', height: '100%'}} 
              resizeMode="cover"  
              />
        </View>
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