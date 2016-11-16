/**
 * Created by ianchen on 16/10/10.
 */

import React, {Component} from 'react';
import {View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Picker,
    Alert} from 'react-native';
import {navPush} from '../../../components/Nav/Nav';
import device from '../../../common/util/device';
import Expectant from '../../Box/Expectant/Expectant';

class Box extends Component {
    constructor(props) {
        super(props);
        this.toExpectantPackage = this.toExpectantPackage.bind(this);
    }

    toExpectantPackage() {
        navPush.push(this.props, Expectant, '待产包');
    }

    scrollBottom() {
        let list = [
            {
                img: require('../../Find/img/box/dcb.png'),
                text: '待产包',
                onPress: this.toExpectantPackage
            },
            {
                img: require('../../Find/img/box/yqys.png'),
                text: '每日胎教',
                onPress: null
            },
            {
                img: require('../../Find/img/box/yzc.png'),
                text: '体重计',
                onPress: null
            },
            {
                img: require('../../Find/img/box/std.png'),
                text: '数胎动',
                onPress: null
            },
            {
                img: require('../../Find/img/box/std.png'),
                text: '数胎动',
                onPress: null
            },
        ];

        return (
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {
                    list.map((l, i) => {
                        return <View style={styles.buttonView} key={i}>
                            <TouchableOpacity style={styles.buttonTextCenter} onPress={l.onPress} activeOpacity={0.7}>
                                <Image source={l.img} style={styles.buttonImgSize}/>
                                <Text style={[styles.titleText]}>{l.text}</Text>
                            </TouchableOpacity>
                        </View>
                    })
                }
            </ScrollView>
        )
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.title}>
                <View>
                    <Text style={[styles.titleText, {color: 'rgb(255,122,162)', fontSize: 15}]}>百宝箱</Text>
                </View>
                <View style={styles.titleBotton}>
                    <TouchableOpacity onPress={() => {this.props.showMore(true)}}>
                        <Text style={[styles.titleText, {color: 'rgb(146,146,146)', fontSize: 13}]}>更多</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
                {this.scrollBottom()}
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: device.width()
    },
    title: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    titleText: {
        fontFamily: 'PingFang SC',
        lineHeight: 20,
    },
    titleBotton: {
        position: 'absolute',
        right: 15,
    },
    body: {
        flex: 1,
        marginTop: 1,
        backgroundColor: '#fff',
    },
    buttonView: {
        marginTop: 15,
        marginBottom: 15,
        width: device.width() / 4
    },
    buttonImgSize: {
        width: 46,
        height: 46,
        marginBottom: 14
    },
    buttonTextCenter: {
        alignItems: 'center'
    }
});

module.exports = Box;