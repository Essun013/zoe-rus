/**
 * Created by fhc on 16/10/8.
 */
import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Platform, Image, PixelRatio} from 'react-native'

import {ListItem, List, Text, SocialIcon} from '../../components';
import BasicInfo from './basic-info/BasicInfo';
import {navPush} from '../../components/Nav/Nav';
import device from '../../common/util/device';

const log = () => console.log('this is an example method');

export default class Me extends Component {
    onPress() {
        navPush.push(this.props, BasicInfo, '基本信息', {});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <Image source={require('./img/background.png')} style={styles.backgroundImage1}
                           resizeMode='stretch'>
                        <View style={{ alignItems: 'center'}}>
                            <Image style={styles.photo} source={require('./img/photo-background.png')} resizeMode='cover'/>
                            <SocialIcon  style={styles.loginBut} button light   type='instagram'  title="立即登录" />
                            <Text style={styles.headerTxt}>怀孕8周+1天 | 厦门</Text>
                        </View>
                    </Image>
                   {/* <Image source={require('./img/background-2.png')} style={styles.backgroundImage2}
                           resizeMode='stretch'>
                        <View style={{ alignItems: 'center',justifyContent:'center'}}>
                            <SocialIcon  style={styles.loginBut} button light   type='instagram'  />
                            <Text style={styles.heading}>Searchbar & List</Text>
                        </View>
                    </Image>*/}
                </View>
                <ScrollView contentContainerStyle={styles.mainContainer}>
                    <List >
                        <ListItem
                            imgSource={require('./img/basic-info.png')}
                            title={"基本信息"}
                            onPress={this.onPress.bind(this)}
                        />
                        <ListItem
                            imgSource={require('./img/baby-files.png')}
                            title={"宝宝档案"}
                        />
                        <ListItem
                            imgSource={require('./img/invite-daddy.png')}
                            title={"邀请宝爸"}
                        />
                        <ListItem
                            imgSource={require('./img/my-collection.png')}
                            title={"我的收藏"}
                        />
                    </List>
                    <List>
                        <ListItem
                            imgSource={require('./img/reminder-settings.png')}
                            title={"我的提醒"}
                            onPress={this.onPress.bind(this)}
                        />
                    </List>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f5f5f5'
    },
    header: {
        marginTop: 64,
        alignItems: 'center',
    },
    headerTxt:{
       color:'#ffffff'
    },
    backgroundImage1: {
        height: 160,
        width: device.width()
    },
    backgroundImage2: {
        height: 10,
        width: device.width()
    },
    photo:{
        width: 80, height: 80
    },
    loginBut:{
        width: 80, height: 30
    }
})