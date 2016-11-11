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
import ChildbirthSetting from './ChildbirthSetting';
import Hospital from '../../Status/hospital/Hospital';
import {connect} from 'react-redux'

const log = () => console.log('this is an example method')


class PersonalCenter extends Component {
    constructor(props){
        super(props);
        this.state={
            preHospitalName:''
        }

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
    onChildbirth(){
        navPush.push(this.props, ChildbirthSetting, '预产期',{childbirth:this.props.childbirth||this.props.c_childbirth});
    }
    onPhotoSetting(){
        navPush.push(this.props,PhotoSetting,'头像上传')
    }

    push2Hospital() {
        let _param = {
            callback: (c) => {
                this.setState({preHospitalName: c.hospitalName})
            }
        };

        navPush.push(this.props, Hospital, '选择产检医院', _param);
    }
    render() {
        let name = this.props.user.nick||false;
        let gender = this.props.user.gender==1?'男':'女';
        let mobile=this.props.user.mobile||false;
        let childbirth = this.props.childbirth || this.props.c_childbirth;

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
                        rightTitleStyle={{paddingRight:30}}
                        titleStyle={{color: "#bbbbbb"}}
                    />
                    <ListItem
                        title={"预产期"}
                        rightTitle={childbirth || false}
                        titleStyle={{color: "#bbbbbb"}}
                        onPress={this.onChildbirth.bind(this)}
                    />
                    <ListItem
                        title={"医院"}
                        rightTitle={this.state.preHospitalName || false}
                        titleStyle={{color: "#bbbbbb"}}
                        onPress={this.push2Hospital.bind(this)}
                    />
                    <ListItem
                        title={"手机号"}
                        rightTitle={mobile}
                        rightTitleStyle={{paddingRight:30}}
                        titleStyle={{color: "#bbbbbb"}}
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
        user:store.editMe.user,
        childbirth:store.editMe.childbirth
    }
}

export default connect(mapStateToProps)(PersonalCenter);