/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Platform
} from 'react-native'
import PregnancyCheck from './PregnancyCheck/PregnancyCheck';
import TabBar from '../Tabs/TabBar';

export default class Record extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={{flex: 1, paddingBottom: 49}}>
        <PregnancyCheck navigator={this.props.navigator}/>
        <TabBar curMenu={'记录'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22
  },
  hero: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  titleContainer: {},
  button: {
    marginTop: 15
  },
  title: {
    textAlign: 'center',
    ...Platform.select({
      ios: {}
    })
  }
})