/**
 * Created by linys on 16/10/13.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert} from 'react-native';
import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';

class ScrollTabBar extends Component {

    constructor(props) {
        super(props);
        this.state = {initPage : 2}; //默认初始页
        //this.ScrollableTabView.state = {}
    }


    componentWillMount(){
        //this.setState({initPage : 2});
    }

    getMonth(){
        var list = [];
        for (let i = 6; i <= 11;i++)
            list.push(i+'周');
        return list.map((l, i) => {
            return <Text tabLabel={l} key={i}/>;
        });
    }

    render() {
        return (
        <ScrollableTabView
            renderTabBar={() => <ScrollableTabBar tabStyle={styles.scrollableTabBarTabStyle} style={styles.scrollableTabBarStyle} />}
            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
            tabBarBackgroundColor='#ff4971'
            tabBarActiveTextColor='#ffffff'
            tabBarInactiveTextColor='#ffffff'
            tabBarPosition='top'
            initialPage={this.state.initPage}
            tabBarTextStyle={styles.tabBarTextStyle}>
            {this.getMonth()}
        </ScrollableTabView>
        );

    }
}

const styles = StyleSheet.create({
    scrollableTabBarTabStyle: {
        height:61,
        paddingTop:11
    },
    scrollableTabBarStyle: {
        height:62
    },
    tabBarUnderlineStyle: {
        backgroundColor:'#ff4971',
        borderWidth:1,
        borderColor:'#ff4971',
        borderBottomColor:'#f5f5f5'
    },
    tabBarTextStyle: {
        fontSize: 18
    }

});

module.exports = ScrollTabBar;