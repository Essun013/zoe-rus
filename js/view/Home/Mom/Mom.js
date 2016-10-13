/**
 * Created by ianchen on 16/10/9.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert} from 'react-native';
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';
import BabyGrow from '../../Find/BabyGrow/BabyGrow';
import MomKonw from '../../Find/MomKnow/MomKnow';

class Mom extends Component {
    constructor(props) {
        super(props);
        this.babyGrow = this.babyGrow.bind(this);
        this.momKnow = this.momKnow.bind(this);
    }

    render() {
        return <View>{this.renderMom()}</View>;
    }

    babyGrow() {
        navPush.push(this.props, BabyGrow, '');
    }

    momKnow() {
        navPush.push(this.props, MomKonw, '');
    }

    renderMom() {
        var list = [
            {
                source: require('../img/mom_know_1.png'),
                title: '宝宝发育',
                content: '我的胳膊和手掌地比较和脚趾长得快一点。我的小尾巴马上就要消失了，所有的神经系统开始变得分明。',
                onPress: this.babyGrow
            },
            {
                source: require('../img/mom_know_2.png'),
                title: '孕妈早知道',
                content: '孕早期的反应给你带来很多不适，你会感到事事不顺心，还爱动不动就闹脾气。找点开心的事吧。',
                onPress: this.momKnow
            }
        ];

        return <View>{list.map((ele, index) => {
            return <View key={index}>
                <TouchableOpacity style={[styles.listItem, index ? {marginTop: 1} : null]} onPress={ele.onPress}>
                    <Image source={ele.source} style={styles.img}/>
                    <View style={[styles.listView]}>
                        <Text style={styles.listTitle}>{ele.title}</Text>
                        <Text style={styles.listContent} ellipsizeMode='tail'>{ele.content}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        })}</View>;
    }
}

const styles = StyleSheet.create({
    img: {
        width: 46,
        height: 46,
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingTop: 18,
        width: device.width(),
        backgroundColor: '#fff',
    },
    listView: {
        flex: 1,
        marginLeft: 14,
        marginRight: 14,
        marginBottom: 14,
    },
    listTitle: {
        color: 'rgb(255,122,162)',
        fontSize: 15,
        lineHeight: 20,
        fontFamily: 'PingFang SC',
    },
    listContent: {
        fontSize: 13,
        lineHeight: 20,
        marginTop: 5,
        fontFamily: 'PingFang SC'
    }
});

module.exports = Mom;