/**
 * Created by ianchen on 16/10/8.
 */


import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Alert, TouchableOpacity, Image} from 'react-native'
import {device, http, rcache, app, gps} from '../../common/util';
import {Top} from './Top';
import {Mom} from './Mom';
import {Box} from './Box';
import {Check} from './Check';
import {Clazz} from './Clazz';
import Search from '../Search/Search';
import Message from '../Me/Message/Message';
import {navPush} from '../../components/Nav/Nav';

export default class Home extends Component {
    constructor(props) {
        super(props);

        /*gps.getLocation((d) => {
         Alert.alert('location', JSON.stringify(d))
         }, (e) => {
         Alert.alert('error', e.message)
         });*/

        this.state = {
            content: null
        };

        http.apiPost('/uc/timeline/get', {}, (data) => {

            if (data.code === 0) {
                var preDays = data.data.day;

                var week = Math.floor(preDays / 7);
                var days = preDays - (week * 7);

                this.scroll(week + '', days + '', preDays + '');
            }
        })
        this.toSearchKb = this.toSearchKb.bind(this);
        this.toMyNotice = this.toMyNotice.bind(this);

    }

    scroll(week, days, totalDay) {
        let scroll = (<ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <Top navigator={this.props.navigator} week={week} days={days}/>
            <Mom navigator={this.props.navigator} week={week} days={days}/>
            <Box navigator={this.props.navigator} week={week} days={days}/>
            <Check navigator={this.props.navigator} week={week} days={days}/>
            <Clazz navigator={this.props.navigator} week={week} totalDay={totalDay}/>
        </ScrollView>)

        this.setState({content: scroll});
    }

    render() {
        return <View style={{flex: 1}}>
            {this.state.content}
        </View>
    }


    toSearchKb(o) {
        Alert.alert('点击了搜索!');
        //navPush.push(o, Search, '搜索');
    }

    toMyNotice(o) {
        //Alert.alert('点击了通知');
        navPush.push(o, Message, '消息');
    }

    _navRight(nav, _p) {
        return <View style={styles.rightContainer}>
            <TouchableOpacity style={styles.bottomCenter} onPress={() => {_p.toSearchKb(nav)}}>
                <Image source={require('./img/search.png')} style={{width: 21, height: 21}} resizeMode='stretch'/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.bottomCenter, styles.tipsBottom]} onPress={() => {_p.toMyNotice(nav)}}>
                <Image source={require('./img/tips.png')} style={{width: 19, height: 21}} resizeMode='stretch'/>
            </TouchableOpacity>
        </View>
    }

    _navLeft(nav, _p) {
        return <View style={styles.leftContainer}>
            <TouchableOpacity style={styles.bottomCenter} onPress={() => {
                Alert.alert('_(:з」∠)_', '暂时还不能切换宝宝啦〜');
            }}>
                <Image source={require('./img/switch_baby.png')} style={{width: 30, height: 26}}
                       resizeMode='stretch'/>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
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
        justifyContent: 'center',
    },
    tipsBottom: {
        marginLeft: 20
    }
})