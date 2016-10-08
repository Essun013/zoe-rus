/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
} from 'react-native';
import {Tabs, Tab} from 'react-native-elements';
import Home from '../home/HomeNav';
import Me from '../me/MeNav';
import Find from '../find/FindNav';
import Record from '../record/RecordNav';

const {connect} = require('react-redux');

class Main extends Component {
    constructor() {
        super();

        this.state = {
            selectedTab: 'home'
        };

        this.changeTab = this.changeTab.bind(this);
        this.home = this.home.bind(this);
        this.record = this.record.bind(this);
        this.finding = this.finding.bind(this);
        this.me = this.me.bind(this);
    }

    changeTab(selectedTab) {
        this.setState({
            selectedTab
        })
    }

    home() {
        let selected = this.state.selectedTab === 'home';

        let source = selected ? require('./image/home_selected.png') : require('./image/home.png');

        return this.getBottomComp(source, selected, '首页');
    }

    record() {
        let selected = this.state.selectedTab === 'record';

        let source = selected ? require('./image/record_selected.png') : require('./image/record.png');

        return this.getBottomComp(source, selected, '记录');
    }

    finding() {
        let selected = this.state.selectedTab === 'finding';

        let source = selected ? require('./image/find_selected.png') : require('./image/find.png');

        return this.getBottomComp(source, selected, '发现');
    }

    me() {
        let selected = this.state.selectedTab === 'me';

        let source = selected ? require('./image/me_selected.png') : require('./image/me.png');

        return this.getBottomComp(source, selected, '我');
    }

    getBottomComp(imageSource, selected, textValue) {
        let textStyle = [styles.menuIconFont];

        if (selected)
            textStyle.push(styles.tabSelected);

        return <View><Image source={imageSource} style={styles.menuIcon}></Image><Text
            style={textStyle}>{textValue}</Text></View>
    }

    render() {
        const {selectedTab} = this.state;

        return (
            <Tabs tabBarStyle={styles.tabs} tabBarShadowStyle={styles.tabsShadow}>
                <Tab
                    tabStyle={styles.tab}
                    selected={selectedTab === 'home'}
                    renderIcon={this.home}
                    renderSelectedIcon={this.home}
                    onPress={() => this.changeTab('home')}>
                    <Home />
                </Tab>
                <Tab
                    tabStyle={styles.tab}
                    selected={selectedTab === 'record'}
                    renderIcon={this.record}
                    renderSelectedIcon={this.record}
                    onPress={() => this.changeTab('record')}>
                    <Record />
                </Tab>
                <Tab
                    tabStyle={styles.tab}
                    selected={selectedTab === 'finding'}
                    renderIcon={this.finding}
                    renderSelectedIcon={this.finding}
                    onPress={() => this.changeTab('finding')}>
                    <Find />
                </Tab>
                <Tab
                    tabStyle={styles.tab}
                    selected={selectedTab === 'me'}
                    renderIcon={this.me}
                    renderSelectedIcon={this.me}
                    onPress={() => this.changeTab('me')}>
                    <Me />
                </Tab>
            </Tabs>
        );
    }
}

const styles = StyleSheet.create({
    menuIcon: {
        height: 26,
        width: 28
    },
    menuIconFont: {
        fontSize: 13,
        textAlign: 'center',
        ...Platform.select({
            android: {
                lineHeight: 37,
            },
            ios: {
                lineHeight: 14,
            }
        })
    },
    tabs: {
        height: 49,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#f6f6f8',
    },
    tabsShadow: {
        backgroundColor: '#abaab0'
    },
    tab: {
        marginBottom: -8
    },
    tabSelected: {
        color: '#ff7ba3'
    }
});

module.exports = connect()(Main);