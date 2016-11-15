/**
 * Created by ianchen on 16/10/9.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Alert} from 'react-native';
import {device, http, rcache, app} from '../../../common/util';

const WEEKS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

class Top extends Component {
    constructor(props) {
        super(props);

        let week = parseInt(this.props.week);
        let days = parseInt(this.props.days);
        let totalDay = parseInt(this.props.totalDay);

        let tmpWeek = '?';
        if (week < 10)
            tmpWeek = WEEKS[week - 1];
        else {
            var firstChar = week.toString().charAt(0);
            firstChar = firstChar > 1 ? WEEKS[firstChar - 1] + WEEKS[WEEKS.length - 1] : WEEKS[WEEKS.length - 1];
            var secondsChar = week.toString().charAt(1);
            secondsChar = secondsChar > 0 ? WEEKS[secondsChar - 1] : '';
            tmpWeek = firstChar + secondsChar;
        }

        this.state = {
            babyImg: require('../img/baby.png'),
            bornDistances: 280 - totalDay,
            // babyWeek: (week <= 0 ? '' : week + '周') + (days <= 0 ? '' : '+' + days + '天'),
            babyWeek: '第' + tmpWeek + '周',
            tag: null
        };

        http.apiPost('/kb/knowledge/find', {subject: '宝宝成长' + (week <= 0 ? 1 : week) + '周'}, (data) => {
            if (data.code == 0) {
                this.setState({
                    babyImg: {uri: app.apiUrl + data.data.thumbnail},
                    tag: data.data.label || this.state.tag
                });
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        let week = parseInt(nextProps.week);
        let days = parseInt(nextProps.days);
        let totalDay = parseInt(nextProps.totalDay);

        this.setState({
            bornDistances: 280 - totalDay,
            babyWeek: (week <= 0 ? '' : week + '周') + (days <= 0 ? '' : '+' + days + '天')
        })
    }

    render() {
        return <Image source={require('../img/background.png')} style={styles.bgImg}
                      resizeMode='stretch'>
            <View style={[styles.center]}>
                <Image source={this.state.babyImg} style={styles.babyImg}/>
            </View>
            <View style={[styles.center]}>
                <Text style={styles.changeText}>{this.state.babyWeek} 再过 <Text
                    style={{fontSize: 16}}>{this.state.bornDistances || '280'}</Text> 天，我就出生了</Text>
                <Text style={styles.changeText}>{this.state.tag}</Text>
            </View>
            <Image source={require('../img/change2.png')} style={styles.change} resizeMode='stretch'/>
        </Image>
    }
}

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
    },
    babyImg: {
        width: 120,
        height: 120,
        borderRadius: 60
    },
    bgImg: {
        height: 210,
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
        height: 55,
        width: device.width(),
        position: 'absolute',
        bottom: 0,
    },
    changeText: {
        color: '#fff',
        fontSize: 13,
        backgroundColor: 'transparent',
        fontFamily: 'PingFang SC',
        marginTop: 6,
    }
});

module.exports = Top;