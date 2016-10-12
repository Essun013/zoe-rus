/**
 * Created by sea35 on 2016/10/8.
 */
import React, {Component} from 'react'
import {ScrollView, StyleSheet, Image} from 'react-native'
import {
    List,
    ListItem
} from '../../../components';
import {navPush} from '../../../components/Nav/Nav';
import PhoneSetting from './PhoneSetting';
import NicknameSetting from './NicknameSetting';
import SexSetting from './SexSetting';

const log = () => console.log('this is an example method')


class PersonalCenter extends Component {

    onPhonePress() {
        navPush.push(this.props, PhoneSetting, '手机号');
    }
    onNicknamePress() {
        navPush.push(this.props, NicknameSetting, '昵称');
    }
    onSexPress() {
        navPush.push(this.props, SexSetting, '性别');
    }
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <List style={styles.hero} containerStyle={{marginTop: 10}}>
                    <ListItem
                        title={"头像"}
                        rightImg={require('./img/photo.png')}
                        titleStyle={{color: "#bbbbbb"}}
                        onPress={log}
                    />
                    <ListItem
                        title={"昵称"}
                        titleStyle={{color: "#bbbbbb"}}
                        rightTitle={"辣妈"}
                        onPress={this.onNicknamePress.bind(this)}
                    />
                    <ListItem
                        title={"性别"}
                        rightTitle={"女"}
                        titleStyle={{color: "#bbbbbb"}}
                        onPress={this.onSexPress.bind(this)}
                    />
                    <ListItem
                        title={"预产期"}
                        rightTitle={"2017-05-06"}
                        titleStyle={{color: "#bbbbbb"}}
                        onPress={log}
                    />
                    <ListItem
                        title={"医院"}
                        rightTitle={"厦门市妇幼保健院"}
                        titleStyle={{color: "#bbbbbb"}}
                        onPress={log}
                    />
                    <ListItem
                        title={"手机号"}
                        rightTitle={"138***6061"}
                        titleStyle={{color: "#bbbbbb"}}
                        onPress={this.onPhonePress.bind(this)}
                    />
                </List>
            </ScrollView>
        )
    }
}

styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f5f5f5'
    },
    hero: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff527b'
    },
})

export default PersonalCenter