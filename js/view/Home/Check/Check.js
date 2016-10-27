/**
 * Created by ianchen on 16/10/10.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, Alert, Platform} from 'react-native';
import {navPush} from '../../../components/Nav/Nav';
import device from '../../../common/util/device';
import PregnancyCheck from '../../Find/PregnancyCheck/PregnancyCheck';

class Check extends Component {
    constructor(props) {
        super(props);

        let list = [
            {
                img: require('../img/selected.png'),
                text: '结婚证',
                selected: true
            },
            {
                img: require('../img/selected.png'),
                text: '身份证',
                selected: true
            },
            {
                img: require('../img/select.png'),
                text: '户口本',
                selected: false
            },
            {
                img: require('../img/select.png'),
                text: '临时居住证',
                selected: false
            },
            {
                img: require('../img/select.png'),
                text: '临时居住证',
                selected: false
            },
            {
                img: require('../img/select.png'),
                text: '临时居住证',
                selected: false
            },
        ];

        this.state = {
            list: list
        };

        this.pregnancyCheck = this.pregnancyCheck.bind(this);
    }

    pregnancyCheck() {
        navPush.push(this.props, PregnancyCheck, '产检小助手');
    }

    scrollTools() {
        return (
            <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                {
                    this.state.list.map((l, i) => {
                        let ref = 'tools_' + i;
                        return <TouchableOpacity style={styles.oddsSingleView} key={i} activeOpacity={1} onPress={() => {this.switchTool(i)}}>
                            <Image source={l.img} style={styles.oddsSingleImg} resizeMode='stretch'/>
                            <Text>{l.text}</Text>
                        </TouchableOpacity>
                    })
                }
            </ScrollView>
        )
    }

    switchTool(i) {
        let list = this.state.list;

        let select = list[i].selected;

        let img = select ? require('../img/select.png') : require('../img/selected.png');

        list[i] = {...list[i], selected: !select, img: img}

        this.setState({list: list})
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.title}>
                <View>
                    <Text style={[styles.titleText]}>产检小助手</Text>
                </View>
            </View>
            <View style={styles.body}>
                <Image source={require('../img/time_ring.png')} style={styles.timeRing}/>
                <View style={styles.bodySubView}>
                    <View style={styles.aidesView}>
                        <Text style={styles.aides} numberOfLines={1}>下次产检：2016\9\26</Text>
                        <Text style={styles.aides} numberOfLines={1}>产检重点：建档、NT检查、空腹</Text>
                        <Text style={styles.aides} numberOfLines={1}>随身物品：产检手册、身份证、......</Text>
                        <Text>
                            <Text style={[styles.aides]}>产检医院：思明区妇幼保健院</Text>
                            <Image source={require('../img/location.png')} style={styles.locationImg} resizeMode='stretch'/>
                            <Text style={[styles.aides, {marginLeft: 2, backgroundColor: 'red'}]}>怎么去</Text>
                        </Text>
                        <TouchableOpacity style={styles.aidesButton} activeOpacity={0.6}>
                            <Text style={styles.aidesButtonText}>参加宣教课程</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.oddsView}>
                        <View style={{flexDirection: 'row'}}>
                            <Text>随身物品</Text>
                            <View style={styles.oddsPlusButton}>
                                <TouchableOpacity style={{}} onPress={this.pregnancyCheck} activeOpacity={0.6}>
                                    <Image source={require('../img/plus.png')} style={{width: 16, height: 16}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{marginTop: 25, flex: 1}}>
                            {this.scrollTools()}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: device.width(),
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
        color: 'rgb(255,122,162)',
        fontSize: 15
    },
    body: {
        flex: 1,
        marginTop: 1,
        backgroundColor: '#fff',
        zIndex: 1,
        paddingBottom: 10
    },
    bodySubView: {
        borderLeftWidth: 2,
        borderLeftColor: '#ffe9ef',
        marginLeft: 20,
        position: 'relative',
        zIndex: 1,
        paddingLeft: 15,
        paddingTop: 5,
        paddingRight: 15,
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
    },
    timeRing: {
        width: 12,
        height: 12,
        position: 'absolute',
        left: 15,
        top: 16,
        zIndex: 2
    },
    aides: {
        fontSize: 14,
        lineHeight: 30,
        fontFamily: 'PingFang SC',
        color: 'rgb(0,0,0)',
        ...Platform.select({
            android: {
                marginTop: 6,
            }
        })
    },
    aidesView: {
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
        marginTop: 1
    },
    locationImg: {
        width: 22,
        height: 20,
        marginTop: -7,
        marginBottom: 7,
        marginRight: 3,
        marginLeft: 3,
        ...Platform.select({
            android: {
                width: 16,
            }
        })
    },
    aidesButton: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ff7aa2',
        borderRadius: 30,
        marginTop: 16,
        marginBottom: 18
    },
    aidesButtonText: {
        marginTop: 10,
        marginBottom: 10,
        color: 'rgb(255,122,162)'
    },
    oddsView: {
        marginTop: 10,
        marginBottom: 10
    },
    oddsPlusButton: {
        position: 'absolute',
        right: 15
    },
    oddsSingleView: {
        alignItems: 'center',
        width: device.width() / 4
    },
    oddsSingleImg: {
        width: 28,
        height: 28,
        marginBottom: 5
    }
});

module.exports = Check;