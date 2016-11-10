/**
 * Created by sea35 on 2016/10/10.
 */
import React, {Component} from 'react'
import {ScrollView, StyleSheet, Image, TextInput, View, Text, PixelRatio, TouchableOpacity} from 'react-native'
import {ImgButton} from '../../../components'
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';
import {BasicInfo} from './BasicInfo'
// import Hospital from '../../Status/hospital/Hospital';

const log = () => console.log('this is an example method')


class PreHospitalSeting extends Component {
    constructor(props) {
        super(props);
    }

    onBasicInfoPress() {
        var user = {
            ...this.props.user,
            nick: this.state.text
        };
        let params = {
            nick: this.state.text
        }
        apiHttp.apiPost('/uc/user/modify', params, (data)=> {
            if (data.code == 0) {
                rcache.put("user", JSON.stringify(data.data));
                this.props.dispatch(loginSys(user, true));
                navPush.pop(this.props);
            }
            else {
                Alert.alert('系统提示', '更新失败,' + data.message);
            }
        }, (err)=> {
            Alert.alert('系统提示', err.toString());
        });
    }

    push2Hospital() {
        // navPush.push(this.props, Hospital, '选择产检医院');
    }

    render() {
        let preHospitalName = this.props.reduxArgs.name || this.props.preHospitalName;
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.listView}>
                        <Text style={styles.title}>医院</Text>
                        <View style={styles.textInput}>
                            <TouchableOpacity onPress={this.push2Hospital.bind(this)}>
                                <Text
                                    style={{marginTop:25,height: 40, fontSize: 15}}
                                >{preHospitalName}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.submitBut}>
                    <ImgButton text="提交" onClick={this.onBasicInfoPress.bind(this)}></ImgButton>
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f5f5f5'
    },
    container: {
        marginTop: 10,
        width: device.width(),
        backgroundColor: '#ffffff'
    },
    listView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
    },
    textInput: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10,
    },
    title: {
        fontSize: 15,
        color: '#bbbbbb'
    },
    submitBut: {
        marginTop: 20,
        width: device.width(),
        alignItems: 'center',
        justifyContent: 'center',
    }
})
const {connect} = require('react-redux');

function select(state) {
    return {
        reduxArgs: state.statusX.reduxArgs
    }
}

module.exports = connect(select)(PreHospitalSeting);