/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Home from './Home';
import Nav from '../../components/Nav/Nav';
import Icon from 'react-native-vector-icons/MaterialIcons';

class HomeNav extends Component {
    constructor(props) {
        super(props);

        this.navBarLeftBottom = this.navBarLeftBottom.bind(this);
        this.navBarRightBottom = this.navBarRightBottom.bind(this);
    }

    navBarLeftBottom(route, navigator, index, navState) {
        if (index == 0) {
            return <View style={styles.leftContainer}>
                <TouchableOpacity style={styles.bottomCenter} onPress={() => {
                    Alert.alert('_(:з」∠)_', '暂时还不能切换宝宝啦〜');
                }}>
                    <Image source={require('./img/switch_baby.png')} style={{width: 30, height: 26}}
                           resizeMode='stretch'/>
                </TouchableOpacity>
            </View>
        }

        if (index > 0) {
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        underlayColor='transparent'
                        onPress={() => {
                            if (index > 0) {
                                navigator.pop()
                            }
                        }}>
                        <Icon
                            style={styles.leftNavButtonText}
                            name='chevron-left'/>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    navBarRightBottom(route, navigator, index, navState) {
        if (index == 0) {
            return <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.bottomCenter}>
                    <Image source={require('./img/search.png')} style={{width: 21, height: 21}} resizeMode='stretch'/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomCenter, styles.tipsBottom]}>
                    <Image source={require('./img/tips.png')} style={{width: 19, height: 21}} resizeMode='stretch'/>
                </TouchableOpacity>
            </View>
        }
    }

    render() {
        var reduxArgs = this.props.reduxArgs;

        var rightBotton = this.navBarRightBottom;
        if (reduxArgs.shareWith)
            rightBotton = (route, navigator, index, navState) => {return reduxArgs.shareWith}
        let now = new Date();
        let title= (now.getMonth()+1)+'月'+now.getDate()+'日';
        return <Nav route={{component: Home, title: title}} leftButton={this.navBarLeftBottom} rightButton={rightBotton}/>;
    }
}

const styles = StyleSheet.create({
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20,
    },
    // 导航栏
    navContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    // 左面导航按钮
    leftNavButtonText: {
        color: '#ffffff',
        fontSize: 33,
        paddingLeft: 5,
        justifyContent: 'center',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 20,
        flexDirection: 'row',
    },
    bottomCenter: {
        justifyContent: 'center'
    },
    tipsBottom: {
        marginLeft: 20
    }
});

function select(state) {
    // Alert.alert('select', JSON.stringify(state))
    return {
        reduxArgs: state.findX.reduxArgs
    }
}

const {connect} = require('react-redux');

module.exports = connect(select)(HomeNav);