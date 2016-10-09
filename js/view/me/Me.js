/**
 * Created by fhc on 16/10/8.
 */
import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Platform, Image,PixelRatio} from 'react-native'
import {
    Icon
} from 'react-native-elements'

import {ListItem,List,Text} from '../../components';
import BasicInfo from './basic-info/BasicInfo';
import navPush from '../../components/Nav/Nav';

const log = () => console.log('this is an example method');

export default class Me extends Component {
    onPress(){
         navPush.push(this.props, BasicInfo, '基本信息', {});

        // this.props.navigator.push({
        //     component: BasicInfo,
        //     title: '基本信息'
        // })
    }
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.hero}>

                    <Icon color='white' name='sentiment-very-satisfied' size={62} />
                    <Text style={styles.heading}>Searchbar & List</Text>
                </View>
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
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f5f5f5'
    },
    container: {
        marginTop: 60
    },
    heading: {
        marginTop: 10,
        fontSize: 22
    },
    hero: {
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#ff527b'
    }
})