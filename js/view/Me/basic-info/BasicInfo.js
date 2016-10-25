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
import PhotoSetting from './PhotoSetting';
import {connect} from 'react-redux'

const log = () => console.log('this is an example method')


class PersonalCenter extends Component {
    constructor(props){
        super(props);
    }
    onPhonePress() {
        navPush.push(this.props, PhoneSetting, '手机号');
    }
    onNicknamePress() {
        navPush.push(this.props, NicknameSetting, '昵称');
    }
    onSexPress() {
        navPush.push(this.props, SexSetting, '性别');
    }
    onPhotoSetting(){
        navPush.push(this.props,PhotoSetting,'头像上传')
    }
    render() {
        const name = this.props.user.name || false;
        const gender = this.props.user.gender==1?'男':'女';
        const mobile=this.props.user.mobile||false;
        const childbirth = this.props.childbirth || false;
        return (
            <ScrollView style={styles.mainContainer}>
                <List style={styles.hero} containerStyle={{marginTop: 10}}>
                    <ListItem
                        title={"头像"}
                        rightImg={require('./img/photo.png')}
                        titleStyle={{color: "#bbbbbb"}}
                        onPress={this.onPhotoSetting.bind(this)}
                    />
                    <ListItem
                        title={"昵称"}
                        titleStyle={{color: "#bbbbbb"}}
                        rightTitle={name}
                        onPress={this.onNicknamePress.bind(this)}
                    />
                    <ListItem
                        title={"性别"}
                        rightTitle={gender}
                        titleStyle={{color: "#bbbbbb"}}
                        onPress={this.onSexPress.bind(this)}
                    />
                    <ListItem
                        title={"预产期"}
                        rightTitle={childbirth}
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
                        rightTitle={mobile}
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

function mapStateToProps(store) {
    return {
        user:store.editMe.user
    }
}

export default connect(mapStateToProps)(PersonalCenter);