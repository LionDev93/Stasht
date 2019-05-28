import React, {Component} from 'react';
import {
    StyleSheet,
} from 'react-native';
import { View,Text } from 'native-base';

export default class TagBoard extends React.Component {
    constructor(){
        super();
        this.state = {
            avatarUrl : '',
        }
    }

    render() {
      return (
        <View>
            <View style={{backgroundColor:'#999',width:'auto', borderRadius:10, justifyContent:'center', alignItems:'center', margin:3}}>
                <Text style={{paddingLeft:10, paddingRight:10, paddingTop:1, paddingBottom:1}}>{this.props.tagname}</Text>
            </View>
        </View>
      );
    }

  
  }


  const styles = StyleSheet.create({

  });