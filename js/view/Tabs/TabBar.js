/**
 * Created by ianchen on 2016/11/30.
 */

import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text, Platform} from 'react-native';
import HomeNav from '../Home/HomeNav';
import MeNav from '../Me/MeNav';
import FindNav from '../Find/FindNav';
import RecordNav from '../Record/RecordNav';

export const tabBarUtil = {
  switchFn: null,
};

class TabBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: this.props.curMenu
    };
  }

  selected(menu) {
    var list = [
      {
        title: '首页',
        image: require('../Main/img/home.png'),
        imageSelected: require('../Main/img/home_selected.png'),
        comp: () => <HomeNav/>,
      },
      {
        title: '记录',
        image: require('../Main/img/record.png'),
        imageSelected: require('../Main/img/record_selected.png'),
        comp: () => <RecordNav/>,
      },
      {
        title: '发现',
        image: require('../Main/img/find.png'),
        imageSelected: require('../Main/img/find_selected.png'),
        comp: () => <FindNav/>,
      },
      {
        title: '我',
        image: require('../Main/img/me.png'),
        imageSelected: require('../Main/img/me_selected.png'),
        comp: () => <MeNav/>,
      },
    ];

    return list.map((d, i) => {
      return (
        <View style={styles.tab} key={i}>
          <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', flex: 1}} activeOpacity={d.title === menu ? 1 : 0.8}
                            onPress={() => this.changed(d.title, d.comp)}>
            <Image source={d.title === menu ? d.imageSelected : d.image} style={styles.tabImg}/>
            <Text style={[styles.tabTitle, d.title === menu && {color: '#ff7ba3'}]}>{d.title}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }

  changed(menu, comp) {
    this.setState({menu});
    tabBarUtil.switchFn(comp);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.selected(this.state.menu)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 49,
    marginTop: 0,
    backgroundColor: '#f6f6f8',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#C5C4CA',
    position: 'absolute',
    bottom: 0,
    zIndex: 1000,
    left: 0,
    right: 0,
    flex: 1,
  },
  tab: {
    flex: 1,
  },
  tabImg: {
    height: 26,
    width: 28,
  },
  tabTitle: {
    fontSize: 13,
    ...Platform.select({
      ios: {
        marginTop: 2
      },
      android: {
        marginTop: 0,
        marginBottom: 3
      }
    })
  }
});

export default TabBar;