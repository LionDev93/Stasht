
import React, {Component} from 'react';
import {
    StyleSheet, 
    Image,
    ListView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { 
  Container, Header, List, ListItem, Thumbnail, Tab, Tabs, 
  Text, Left, Body, Right, Button, View, Badge, Row, Col, Grid } from 'native-base';
import TagBoard from './TagBoard';

const post_array = [
  'Simon Mignolet',
  'Nathaniel Clyne',
  'Dejan Lovren',
];

const ml = "MAKE\nLIVE";

export default class Stories extends React.Component {
  constructor(){
    super();
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state= {
      selected_tab : 1,
      listViewData: post_array,
      }
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  
  render() {
      return (
        <Container>
          <Tabs locked={true} tabBarPosition='top' tabBarUnderlineStyle={{backgroundColor:'#00b7af'}}>
            <Tab heading="Live" 
              tabStyle={{backgroundColor:'white'}} textStyle={{ color: '#00b7af'}}
              activeTabStyle={{backgroundColor:'white'}} activeTextStyle={{ color: '#00b7af', fontWeight:'bold'}}>
              
              <Grid style={styles.tab_grid}>
              <Row>
                <List style={styles.list}>
                  <ListItem noIndent={true} thumbnail style={{backgroundColor:'white'}}
                      onPress={() => {Actions.Timeline({storyTitle: 'Mexico 2019'})}} >
                    <Left style={{width:56}}>
                      <Image borderRadius={16} source={ require('../images/photo1.png') } 
                          resizeMode='stretch' style={{width:58, height:56}}
                      />
                      <Image borderRadius={16} source={ require('../images/photo2.png') } 
                          resizeMode='stretch' style={{ width:58, height:56, left :-52, top:5, zIndex:-1}}
                        />
                      <Badge style={styles.imageNumbers}><Text>3</Text></Badge>
                    </Left>
                    <Body>
                      <Text>
                        Mexico 2019
                      </Text>
                      <Text note numberOfLines={1}>
                        Our travel pics from #cabo to #Ixtapa
                      </Text>
                      
                      <View style={{ flexDirection:'row'}}>
                        <TagBoard tagname='#julie'/>
                        <TagBoard tagname='#raul'/>
                      </View>
                      
                      <View style={{ flexDirection:'row'}}>
                        <Image
                          source={ require('../images/avata3.png')}
                          style={{ width:20, height:20}}
                        />
                        <Image
                          source={ require('../images/avata2.png')}
                          style={{ width:20, height:20, left:-5, zIndex:-1}}
                        />
                        <Image
                          source={ require('../images/avata1.png')}
                          style={{ width:20, height:20, left:-9, zIndex:-1}}
                        />
                        <Text note numberOfLines={1}>Susan Smith, + 2 others</Text>
                      </View>
                    </Body>
                    <Right>
                      <Badge style={{ backgroundColor: '#00b7af' }}>
                        <Text style={{ color: 'white' }}>26</Text>
                      </Badge>
                    </Right>
                  </ListItem>

                  {/* Please repeat above ListItem, Below is just example*/}
                  <ListItem noIndent={true} thumbnail style={{backgroundColor:'white'}}
                    onPress={() => {Actions.Timeline({storyTitle: 'RedM-Story'})}}>
                   <Left style={{width:56}}>
                      <Image borderRadius={16} source={ require('../images/photo1.png') } 
                          resizeMode='stretch' style={{width:58, height:56}}
                      />
                      <Image borderRadius={16} source={ require('../images/photo2.png') } 
                          resizeMode='stretch' style={{ width:58, height:56, left :-52, top:5, zIndex:-1}}
                        />
                    </Left>
                  <Body>
                    <Text>RedM-Story</Text>
                    <Text note numberOfLines={1}>Our travel pics from #cabo to #Ixtapa</Text>
                    <View style={{ flexDirection:'row'}}>
                      <Image
                        source={ require('../images/avata1.png')}
                        style={{ width:20, height:20}}
                      />
                      <Image
                        source={ require('../images/avata2.png')}
                        style={{ width:20, height:20, left:-5, zIndex:-1}}
                      />
                      <Image
                        source={ require('../images/avata3.png')}
                        style={{ width:20, height:20, left:-9, zIndex:-1}}
                      />
                      <Text note numberOfLines={1}>Susan Smith, + 2 others</Text>
                    </View>
                  </Body>
                  <Right>
                    <Badge style={{ backgroundColor: '#00b7af' }}>
                      <Text style={{ color: 'white' }}>26</Text>
                    </Badge>
                  </Right>
                </ListItem>
              </List>
             </Row>
            {/* Add Story button */}
              <Row style={styles.bottomArea}>
               <Button 
                  style={styles.storybutton}
                    onPress={() => Actions.AddStory()}
                >
                <Text style={{ color:'#00b7af' }} uppercase={false}>+Add Story</Text>
                </Button>
              </Row>
            </Grid>
            </Tab>

          <Tab heading="Publish" 
              tabStyle={{backgroundColor:'white'}} textStyle={{ color: '#00b7af'}}
              activeTabStyle={{backgroundColor:'white'}} activeTextStyle={{ color: '#00b7af', fontWeight:'bold'}}>
            
            <Grid style={styles.tab_grid}>
              <Row>
                <List 
                  style={{width:'100%'}}
                  leftOpenValue={90}
                  stopRightSwipe={-1}
                  stopLeftSwipe={90}
                  listItemPadding={0}
                  swipeToOpenPercent={90}
                  dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                  renderRow={data =>
                    <ListItem noIndent={true} thumbnail style={{backgroundColor:'white'}}>
                      <Left style={{width:56}}>
                        <Image borderRadius={12} source={ require('../images/thumb1.png') } style={{width:58, height:56}}/>
                        <Image borderRadius={12} source={ require('../images/thumb2.png') } 
                               style={{width:58, height:56, left :-52, top:5, zIndex:-1}}/>
                      </Left>
                      <Body>
                        <Text>Mexico 2019 </Text>
                        <Text note numberOfLines={1}>Our travel pics from #cabo to #Ixtapa</Text>
                        <View style={{ flexDirection:'row'}}>
                          <Image
                            source={ require('../images/avata3.png')}
                            style={{ width:20, height:20}}
                          />
                          <Image
                            source={ require('../images/avata2.png')}
                            style={{ width:20, height:20, left:-5, zIndex:-1}}
                          />
                          <Image
                            source={ require('../images/avata1.png')}
                            style={{ width:20, height:20, left:-9, zIndex:-1}}
                          />
                          <Text note numberOfLines={1}>Susan Smith, + 2 others</Text>
                        </View>
                      </Body>
                      <Right>
                        <Badge style={{ backgroundColor: '#00b7af' }}>
                          <Text style={{ color: 'white' }}>26</Text>
                        </Badge>
                      </Right>
                    </ListItem>
                  }
                  renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button style={{flex:1,flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'#bbbbbb'}} 
                        onPress={() => {this.deleteRow(secId, rowId, rowMap)}}>
                        <View>
                          <Image style={{alignSelf:'center'}} source={require('../images/forward.png')}/>
                        </View>
                        <View>
                          <Text style={styles.textButton}>{ml}</Text>                          
                        </View>
                    </Button>}
                  >
                </List>
              </Row>
               {/* Add Story button */}
              <Row style={styles.bottomArea}>
                <Button 
                    style={styles.storybutton}
                    onPress={() => Actions.AddStory()}
                  >
                    <Text style={{ color:'#00b7af' }} uppercase={false}>+Add Story</Text>
                </Button>
              </Row>
            </Grid>
          </Tab>
        </Tabs>
      </Container>
      );
  }

}


  const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    tab_grid: {
      backgroundColor:'#eee',
    },

    list: {
      width:'100%',
    },

    image2: {
      left: -52,
      top: 5,
      zIndex: -1
    },

    imageNumbers: {
      left: -128,
      top: 9,
      backgroundColor: '#EF5D3A',
    },

    bottomArea: {
      height:100,
      justifyContent:'center',
    },

    storybutton: {
      borderWidth:0,
      borderRadius:30,
      margin:20,
      width:150,
      backgroundColor:'white',
      alignSelf:'center',
      justifyContent:'center'
    },

    textButton: {
      textAlign:'center',
      color:'white',
      fontSize:12,
      fontWeight:'bold', 
      alignSelf:'center',
    },

  });