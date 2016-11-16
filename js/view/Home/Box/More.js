/**
 * Created by ianchen on 2016/11/16.
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Picker,
    Alert
} from 'react-native';
import {navPush} from '../../../components/Nav/Nav';
import device from '../../../common/util/device';
import Expectant from '../../Box/Expectant/Expectant';

class More extends Component {
    constructor(props) {
        super(props);

        this.toExpectantPackage = this.toExpectantPackage.bind(this);

        this.completed = this.completed.bind(this);
    }

    toExpectantPackage() {
        navPush.push(this.props, Expectant, '待产包');
    }

    completed() {
        this.props.show(false);
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
                text: '孕期饮食',
                onPress: null
            },
            {
                img: require('../../Find/img/box/yzc.png'),
                text: '月子餐',
                onPress: null
            },
            {
                img: require('../../Find/img/box/std.png'),
                text: '数胎动',
                onPress: null
            },
            {
                img: require('../../Find/img/box/tzj.png'),
                text: '体重计',
                onPress: null
            },
            {
                img: require('../../Find/img/box/nbnc.png'),
                text: '能不能吃',
                onPress: null
            },
            {
                img: require('../../Find/img/box/snsn.png'),
                text: '生男生女',
                onPress: null
            },
            {
                img: require('../../Find/img/box/bbfs.png'),
                text: '宝宝辅食',
                onPress: null
            },
            {
                img: require('../../Find/img/box/qmz.png'),
                text: '取名字',
                onPress: null
            },
            {
                img: require('../../Find/img/box/myjh.png'),
                text: '免疫计划',
                onPress: null
            },
        ];

        return (
            <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
                {
                    list.map((l, i) => {
                        return <View style={styles.buttonView} key={i}>
                            <TouchableOpacity style={styles.buttonTextCenter} onPress={l.onPress} activeOpacity={0.7}>
                                <Image source={l.img} style={styles.buttonImgSize}>
                                    <Image source={require('../../Box/img/expectant/checked.png')} style={{width: 12, height: 12, position: 'absolute', right: 3, bottom: 0}} resizeMode='stretch'/>
                                </Image>
                                <Text style={[styles.titleText]}>{l.text}</Text>
                            </TouchableOpacity>
                        </View>
                    })
                }
            </View>
        )
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.title}>
                <View>
                    <Text style={[styles.titleText, {color: 'rgb(255,122,162)', fontSize: 15}]}>百宝箱</Text>
                </View>
                <View style={styles.titleBotton}>
                    <TouchableOpacity onPress={this.completed}>
                        <Text style={[styles.titleText, {color: 'rgb(146,146,146)', fontSize: 13}]}>完成</Text>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0, 0.43)',
    },
    title: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: device.width() - 30,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    titleText: {
        fontFamily: 'PingFang SC',
        lineHeight: 20,
    },
    titleBotton: {
        flex: 1,
        alignItems: 'flex-end'
    },
    body: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#f5f5f5',
        width: device.width() - 30,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    buttonView: {
        marginTop: 15,
        marginBottom: 15,
        width: (device.width() - 30) / 4,
    },
    buttonImgSize: {
        width: 50,
        height: 50,
        marginBottom: 14,
    },
    buttonTextCenter: {
        alignItems: 'center',
    }
});

module.exports = More;