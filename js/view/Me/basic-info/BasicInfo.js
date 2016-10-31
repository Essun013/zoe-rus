/**
 * Created by sea35 on 2016/10/8.
 */
import React, {Component} from 'react'
import {ScrollView, StyleSheet, Image,Alert} from 'react-native'
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
        navPush.push(this.props, PhoneSetting, '手机号',{user:this.props.user});
    }
    onNicknamePress() {
        navPush.push(this.props, NicknameSetting, '昵称',{user:this.props.user});
    }
    onSexPress() {
        navPush.push(this.props, SexSetting, '性别',{user:this.props.user});
    }
    onPhotoSetting(){
        navPush.push(this.props,PhotoSetting,'头像上传')
    }
    render() {
        let name = this.props.user.nick ;
        let gender = this.props.user.gender==1?'男':'女';
        // let mobile=this.props.user.mobile;
        let childbirth = this.props.childbirth ;
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
                        rightTitle={name || false}
                        onPress={this.onNicknamePress.bind(this)}
                    />
                    <ListItem
                        title={"性别"}
                        rightTitle={gender ||false}
                        titleStyle={{color: "#bbbbbb"}}
                        onPress={this.onSexPress.bind(this)}
                    />
                    <ListItem
                        title={"预产期"}
                        rightTitle={childbirth || false}
                        titleStyle={{color: "#bbbbbb"}}
                        onPress={log}
                    />
                    <ListItem
                        title={"医院"}
                        rightTitle={"厦门市妇幼保健院"}
                        titleStyle={{color: "#bbbbbb"}}
                        onPress={log}
                    />
                    {/*<ListItem*/}
                        {/*title={"手机号"}*/}
                        {/*rightTitle={mobile}*/}
                        {/*titleStyle={{color: "#bbbbbb"}}*/}
                    {/*/>*/}
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