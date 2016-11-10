/**
 * Created by ianchen on 16/10/12.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Platform, Image, Text, TouchableOpacity, Alert} from 'react-native';
import device from '../../common/util/device';
import {navPush} from '../../components/Nav/Nav';
import Mom from './Mom/Mom';
import Baby from './Baby/Baby';

class Status extends Component {
    constructor(props) {
        super(props);

        this.readyPreg = this.readyPreg.bind(this);
        this.goMom = this.goMom.bind(this);
        this.goBaby = this.goBaby.bind(this);
        this.goDady = this.goDady.bind(this);
    }

    readyPreg() {
        Alert.alert('(ง •̀_•́)ง', '被你发现了');
    }

    goMom() {
        navPush.push(this.props, Mom, '我是孕妈');
    }

    goBaby() {
        navPush.push(this.props, Baby, '家有萌宝');
    }

    goDady() {
        Alert.alert('(ง •̀_•́)ง', '被你发现了');
    }

    render() {
        return (
            <Image source={require('./img/bg.png')} resizeMode='stretch' style={styles.bg}>
                <View style={styles.bgView}>
                    <View style={styles.buttonView}>
                        <View style={styles.statusView}>
                            <TouchableOpacity onPress={this.readyPreg} style={styles.bottomTextCenter}>
                                <Image source={require('./img/ready_pre.png')} style={styles.statusImg}/>
                                <Text style={styles.text}>我在备孕</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.statusView}>
                            <TouchableOpacity onPress={this.goMom} style={styles.bottomTextCenter}>
                                <Image source={require('./img/mom.png')} style={styles.statusImg}/>
                                <Text style={styles.text}>我是孕妈</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.buttonView, {marginTop: 56}]}>
                        <View style={styles.statusView}>
                            <TouchableOpacity onPress={this.goBaby} style={styles.bottomTextCenter}>
                                <Image source={require('./img/baby.png')} style={styles.statusImg}/>
                                <Text style={styles.text}>家有萌宝</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.statusView}>
                            <TouchableOpacity onPress={this.goDady} style={styles.bottomTextCenter}>
                                <Image source={require('./img/dady.png')} style={styles.statusImg}/>
                                <Text style={styles.text}>我是宝爸</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <Image source={require('./img/bottom_bg.png')} style={{width: device.width(), height: 65}}
                           resizeMode='stretch'/>
                </View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        ...Platform.select({
            ios: {
                height: device.height() - 60
            },
            android: {
                height: device.height() - 40,
            }
        }),
        width: device.width(),
    },
    bgView: {
        flex: 1,
        paddingTop: 69,
    },
    statusImg: {
        width: 122,
        height: 122
    },
    statusView: {
        width: device.width() / 2,
        alignItems: 'center'
    },
    buttonView: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 15,
        lineHeight: 24,
        color: 'rgb(255,255,255)',
        marginTop: 17
    },
    bottomTextCenter: {
        alignItems: 'center'
    }
});

const {connect} = require('react-redux');
module.exports = connect()(Status);