/**
 * Created by ianchen on 16/10/9.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Alert} from 'react-native';
import {device, http, rcache, app} from '../../../common/util';

class Top extends Component {
    constructor(props) {
        super(props);

        let week = this.props.week;
        let days = this.props.days;

        this.state = {
            babyImg: require('../img/baby.png'),
            bornDistances: 280 - ((week * 7 + days) || 1),
            babyWeek: (week <= 0 ? '' : week + '周' + '+') + (days <= 0 ? '1天' : days + '天'),
            tag: '顶臂长：0mm | 体 重：0kg'
        };

        http.apiPost('/kb/knowledge/find', {subject: '宝宝成长' + (week <= 0 ? 1 : week) + '周'}, (data) => {
            if (data.code == 0) {
                this.setState({babyImg: {uri: app.apiUrl + data.data.thumbnail}, tag: data.data.label});
            }
        })
    }

    render() {
        return <Image source={require('../img/background.png')} style={styles.bgImg}
                      resizeMode='stretch'>
            <View style={[styles.center]}>
                <Text style={styles.bgText}>{this.state.babyWeek}</Text>
                <Image source={this.state.babyImg} style={styles.babyImg}/>
            </View>
            <Image source={require('../img/change.png')} style={styles.change} resizeMode='stretch'>
                <View style={[styles.center, {marginTop: 14}]}>
                    <Text style={styles.changeText}>再过 <Text style={{fontSize: 16}}>{this.state.bornDistances || '280'}</Text> 天，我就出生啦</Text>
                    <Text style={styles.changeText}>{this.state.tag}</Text>
                </View>
            </Image>
        </Image>
    }
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    babyImg: {
        width: 110,
        height: 110,
        borderRadius: 55
    },
    bgImg: {
        height: 220,
        width: device.width()
    },
    bgText: {
        color: '#fff',
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 15,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC'
    },
    change: {
        height: 85,
        width: device.width(),
        position: 'absolute',
        bottom: 0
    },
    changeText: {
        color: '#fff',
        fontSize: 13,
        lineHeight: 20,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC'
    }
});

module.exports = Top;