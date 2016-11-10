/**
 * Created by ianchen on 16/10/9.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Alert} from 'react-native';
import {device, http, rcache} from '../../../common/util';
import {navPush} from '../../../components/Nav/Nav';
import BabyGrow from '../../Find/BabyGrow/BabyGrow';
import MomKonw from '../../Find/MomKnow/MomKnow';

class Mom extends Component {
    constructor(props) {
        super(props);

        let week = props.week;
        week = week <= 0 ? 1 : week;

        this.state = {
            babySummary: '',
            momSummary: '',
            week: week,
        };

        this.query(week);

        this.babyGrow = this.babyGrow.bind(this);
        this.momKnow = this.momKnow.bind(this);
    }

    componentWillReceiveProps(props) {
        let week = props.week;

        this.query(week <= 0 ? 1 : week);
    }

    query(week) {
        http.apiPost('/kb/knowledge/find', {subject: '孕妈早知道' + week + '周'}, (data) => {
            if (data.code == 0)
                this.setState({momSummary: data.data.summary})
        });

        http.apiPost('/kb/knowledge/find', {subject: '宝宝成长' + week + '周'}, (data) => {
            if (data.code == 0)
                this.setState({babySummary: data.data.summary})
        });
    }

    render() {
        let {babySummary, momSummary} = this.state;

        return <View>{this.renderMom(babySummary, momSummary)}</View>;
    }

    babyGrow() {
        navPush.push(this.props, BabyGrow, '宝宝成长', {initWeek: this.state.week});
    }

    momKnow() {
        navPush.push(this.props, MomKonw, '孕妈早知道', {initWeek: this.state.week});
    }

    renderMom(babySummary, momSummary) {
        var list = [
            {
                source: require('../img/mom_know_1.png'),
                title: '宝宝发育',
                // content: '我的胳膊和手掌地比较和脚趾长得快一点。我的小尾巴马上就要消失了，所有的神经系统开始变得分明。',
                content: babySummary ? babySummary : '我的胳膊和手掌地比较和脚趾长得快一点。我的小尾巴马上就要消失了，所有的神经系统开始变得分明。',
                onPress: this.babyGrow
            },
            {
                source: require('../img/mom_know_2.png'),
                title: '孕妈早知道',
                // content: '孕早期的反应给你带来很多不适，你会感到事事不顺心，还爱动不动就闹脾气。找点开心的事吧。',
                content: momSummary ? momSummary : '孕早期的反应给你带来很多不适，你会感到事事不顺心，还爱动不动就闹脾气。找点开心的事吧。',
                onPress: this.momKnow
            }
        ];

        return <View>{list.map((ele, index) => {
            return <View key={index}>
                <TouchableOpacity style={[styles.listItem, index && {marginTop: 1}]} onPress={ele.onPress} activeOpacity={0.6}>
                    <Image source={ele.source} style={styles.img}/>
                    <View style={[styles.listView]}>
                        <Text style={styles.listTitle}>{ele.title}</Text>
                        <Text style={styles.listContent} ellipsizeMode='tail' numberOfLines={3}>{ele.content}</Text>
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