/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Platform,
    Alert
} from 'react-native';
import {Tabs, Tab} from 'react-native-elements';
import HomeNav from '../Home/HomeNav';
import MeNav from '../Me/MeNav';
import FindNav from '../Find/FindNav';
import RecordNav from '../Record/RecordNav';
import StatusNav from '../Status/StatusNav';
import DeviceInfo from 'react-native-device-info';
import apiHttp from '../../common/util/http';
import {rcache} from '../../common/util';

class Main extends Component {
    constructor(props) {
        super(props);

        let self = this;

        this.state = {
            selectedTab: 'home',
            goHome: false,
            component: null
        };
        //保存设备ID
        rcache.put("macID", DeviceInfo.getUniqueID());
        let params = {
            username: DeviceInfo.getUniqueID(),
            password: 1
        }
        rcache.get('firstChoose', (err, result) => {
            if (!result) {
                apiHttp.apiPost('/uc/user/sign-in', params, (data)=> {
                    if (data.code == 0) {
                        rcache.put('firstChoose', 'no');
                        self.setState({component: self.renderMain});
                    } else {
                        // rcache.put('firstChoose', 'yes');
                        self.setState({component: self.renderStatus});
                    }
                }, (err)=> {
                    // rcache.put('firstChoose', 'yes');
                    self.setState({component: self.renderStatus});
                });
            }
            else if (result === 'yes') {
                // rcache.put('firstChoose', 'yes');
                self.setState({component: self.renderStatus});
            } else if (result === 'no') {
                self.setState({component: self.renderMain});
            }
        });
        this.changeTab = this.changeTab.bind(this);
        this.home = this.home.bind(this);
        this.record = this.record.bind(this);
        this.finding = this.finding.bind(this);
        this.me = this.me.bind(this);
        this.renderMain = this.renderMain.bind(this);
    }

    goHome() {
        let self = this;
        setTimeout(()=> {
            self.setState({component: self.renderMain});
            rcache.put('firstChoose', 'no');
        }, 200);
    }

    changeTab(selectedTab) {
        this.setState({
            selectedTab
        });
    }

    home() {
        let selected = this.state.selectedTab === 'home';

        let source = selected ? require('./img/home_selected.png') : require('./img/home.png');

        return this.getBottomComp(source, selected);
    }

    record() {
        let selected = this.state.selectedTab === 'record';

        let source = selected ? require('./img/record_selected.png') : require('./img/record.png');

        return this.getBottomComp(source, selected);
    }

    finding() {
        let selected = this.state.selectedTab === 'finding';

        let source = selected ? require('./img/find_selected.png') : require('./img/find.png');

        return this.getBottomComp(source, selected);
    }

    me() {
        let selected = this.state.selectedTab === 'me';

        let source = selected ? require('./img/me_selected.png') : require('./img/me.png');

        return this.getBottomComp(source, selected);
    }

    getBottomComp(imageSource, selected) {
        let textStyle = [styles.menuIconFont];

        if (selected)
            textStyle.push(styles.tabSelected);

        return <Image source={imageSource} style={styles.menuIcon}></Image>
    }

    render() {
        const {goHome, component} = this.state;

        var reduxArgs = this.props.reduxArgs;

        if (reduxArgs.goHome && !goHome)
            this.goHome();

        return typeof(component) == 'function' ? component() : null;
    }

    renderStatus() {
        return <StatusNav/>
    }

    renderMain() {
        var {selectedTab} = this.state;
        var reduxArgs = this.props.reduxArgs;

        return (
            <Tabs tabBarStyle={styles.tabs} tabBarShadowStyle={styles.tabsShadow}
                  style={[reduxArgs.hideMenu && {marginBottom: -50}]}>
                <Tab
                    titleStyle={[styles.menuIconFont]}
                    selectedTitleStyle={styles.tabSelected}
                    tabStyle={styles.tab}
                    title={'首页'}
                    selected={selectedTab === 'home'}
                    renderIcon={this.home}
                    renderSelectedIcon={this.home}
                    onPress={() => this.changeTab('home')}>
                    <HomeNav/>
                </Tab>
                <Tab
                    titleStyle={[styles.menuIconFont]}
                    selectedTitleStyle={styles.tabSelected}
                    title={'记录'}
                    tabStyle={styles.tab}
                    selected={selectedTab === 'record'}
                    renderIcon={this.record}
                    renderSelectedIcon={this.record}
                    onPress={() => this.changeTab('record')}>
                    <RecordNav/>
                </Tab>
                <Tab
                    titleStyle={[styles.menuIconFont]}
                    selectedTitleStyle={styles.tabSelected}
                    title={'发现'}
                    tabStyle={styles.tab}
                    selected={selectedTab === 'finding'}
                    renderIcon={this.finding}
                    renderSelectedIcon={this.finding}
                    onPress={() => this.changeTab('finding')}>
                    <FindNav/>
                </Tab>
                <Tab
                    titleStyle={[styles.menuIconFont]}
                    selectedTitleStyle={styles.tabSelected}
                    title={'我'}
                    tabStyle={styles.tab}
                    selected={selectedTab === 'me'}
                    renderIcon={this.me}
                    renderSelectedIcon={this.me}
                    onPress={() => this.changeTab('me')}>
                    <MeNav/>
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
        ...Platform.select({
            ios: {
                marginTop: 2
            },
            android: {
                marginTop: 0,
                marginBottom: 3
            }
        })
    },
    tabs: {
        height: 49,
        backgroundColor: '#f6f6f8',
    },
    tabsShadow: {
        backgroundColor: '#abaab0',
        ...Platform.select({
            android: {
                height: 1,
            }
        })
    },
    tab: {
        ...Platform.select({
            ios: {
                marginBottom: 2
            },
            android: {
                marginBottom: -2
            }
        })
    },
    tabSelected: {
        color: '#ff7ba3'
    }
});

const {connect} = require('react-redux');

function select(state) {
    return {
        reduxArgs: state.homeX.reduxArgs
    }
}

module.exports = connect(select)(Main);