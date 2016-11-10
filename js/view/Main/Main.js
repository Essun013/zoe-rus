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

        this.state = {
            selectedTab: 'home',
            component: null
        };

        //保存设备ID  0605A0A5-0159-4F17-9B7D-A6991420779F
        rcache.put("macID", DeviceInfo.getUniqueID());
        let params = {
            username: DeviceInfo.getUniqueID(),
            password: 1
        }
        rcache.get('firstChoose', (err, result) => {
            if (!result) {
                this.loginSys();
            } else if (result === 'yes') {
                this.setState({component: this.renderStatus});
            } else if (result === 'no') {
                this.setState({component: this.renderMain});
            }
        });
        this.changeTab = this.changeTab.bind(this);
        this.home = this.home.bind(this);
        this.record = this.record.bind(this);
        this.finding = this.finding.bind(this);
        this.me = this.me.bind(this);
        this.renderMain = this.renderMain.bind(this);
    }

    loginSys() {
        let params = {
            username: DeviceInfo.getUniqueID(),
            password: 1
        }
        apiHttp.apiPost('/uc/user/sign-in', params, (data)=> {
            if (data.code == 0) {
                rcache.put('firstChoose', 'no');
                rcache.put("loginState", 'true');
                rcache.put("user", JSON.stringify(data.data));
                this.setState({component: this.renderMain});
            } else {
                this.setState({component: this.renderStatus});
            }
        }, (err)=> {
            this.setState({component: this.renderStatus});
        });
    }

    changeTab(selectedTab) {
        this.setState({selectedTab});
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

        return <Image source={imageSource} style={styles.menuIcon}/>
    }

    render() {
        this.renderOther();
        const {component} = this.state;

        return typeof(component) == 'function' ? component() : null;
    }

    renderOther() {
        let _reduxArgs = this.props.reduxArgs;
        let _goHome = _reduxArgs && _reduxArgs.goHome;
        let _component = this.state.component;
        console.log(_reduxArgs);
        if (_goHome && _component && _component.name.indexOf('renderMain') < 0) {
            setTimeout(()=> {
                this.setState({component: this.renderMain});
                rcache.put('firstChoose', 'no');
            }, 200);
        }
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

function select(store) {
    Alert.alert('store', JSON.stringify(store))
    return {
        reduxArgs: store.homeX.reduxArgs
    }
}

module.exports = connect(select)(Main);