/**
 * Created by sea35 on 2016/10/8.
 */
import React, {Component} from 'react'
import {ScrollView, View, StyleSheet, Platform, Image,PixelRatio} from 'react-native'
import {
    List,
    ListItem
} from '../../../components';

const log = () => console.log('this is an example method')

class PersonalCenter extends Component {
    render() {
        return (
            <ScrollView style={styles.mainContainer}>
                <List style={styles.hero}>
                    <ListItem
                        title={"头像"}
                        rightImg={require('./img/basic-info.png')}
                        titleStyle={{color:"#bbbbbb"}}
                        onPress={log}
                    />
                    <ListItem
                        title={"昵称"}
                        titleStyle={{color:"#bbbbbb"}}
                        rightTitle={"辣妈"}
                        onPress={log}
                    />
                    <ListItem
                        title={"性别"}
                        rightTitle={"女"}
                        titleStyle={{color:"#bbbbbb"}}
                        onPress={log}
                    />
                    <ListItem
                        title={"预产期"}
                        rightTitle={"2017-05-06"}
                        titleStyle={{color:"#bbbbbb"}}
                        onPress={log}
                    />
                    <ListItem
                        title={"医院"}
                        rightTitle={"厦门市妇幼保健院"}
                        titleStyle={{color:"#bbbbbb"}}
                        onPress={log}
                    />
                    <ListItem
                        title={"手机号"}
                        rightTitle={"138***6061"}
                        titleStyle={{color:"#bbbbbb"}}
                        onPress={log}
                    />
                </List>
            </ScrollView>
        )
    }
}

styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f5f5f5',
        marginTop: 60
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

export default PersonalCenter