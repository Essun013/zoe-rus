/**
 * Created by ianchen on 2016/10/24.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ListView, Alert} from 'react-native';
import {device, http} from '../../../common/util';
import {navPush} from '../../../components/Nav/Nav';
import {switchHospital} from '../../../actions/status/actions';
import CityPicker from '../../../components/CityPicker'

const hospitals = [
    {title: '厦门市妇幼保健院', location: '厦门市镇海路55号'},
    {title: '厦门大学附属第一医院', location: '厦门市镇海路55号'},
    {title: '厦门市中医院', location: '厦门市镇海路55号'},
    {title: '解放军第一七四医院', location: '厦门市镇海路55号'},
    {title: '厦门市第二医院', location: '厦门市镇海路55号'},
];

class Hospital extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMask: false,
            city: this.props.city.name,
            hospitalList: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([]),
            provinceCode: this.props.province.id,
            cityCode: this.props.city.id,
            countyCode: this.props.county.id
        };

        http.apiPost('/kb/hospital/query', {region: this.props.county.parent}, (data) => {
            if (data.code == 0)
                this.setState({hospitalList: this.state.hospitalList.cloneWithRows(data.data)})
        })
    }

    chooseHospital(name) {
        this.props.dispatch(switchHospital(name));
        navPush.pop(this.props);
    }

    hospitalList(row) {
        return <TouchableOpacity style={styles.hospitalBotton} onPress={() => {
            this.chooseHospital(row.name)
        }}>
            <Text style={styles.masterTitle}>{row.name}</Text>
            <Text style={styles.auxiliaryTitle}>{row.address}</Text>
        </TouchableOpacity>
    }

    hideCityPicker() {
        this.setState({showMask: false})
    }

    city() {
        if (this.state.showMask)
            return <CityPicker show={this.state.showMask} hide={this.hideCityPicker.bind(this)} province={this.state.provinceCode} city={this.state.cityCode} county={this.state.countyCode}/>
    }

    render() {
        return (
            <View style={styles.container}>
                {this.city()}

                <View style={styles.topView}>
                    <TouchableOpacity style={styles.locationBotton} onPress={() => {
                        this.setState({showMask: true})
                    }}>
                        <Image source={require('../img/location.png')} style={{width: 13, height: 18, marginRight: 10}}
                               resizeMode='stretch'/>
                        <Text style={{fontSize: 14}}>{this.state.city}</Text>
                    </TouchableOpacity>
                    <TextInput style={styles.searchHospital} placeholder={'请输入医院名称'}
                               placeholderTextColor={'rgb(146,146,146)'} underlineColorAndroid={'transparent'}/>
                </View>

                <ListView style={styles.hospitalView} dataSource={this.state.hospitalList} enableEmptySections={true}
                          renderRow={(row) => this.hospitalList(row)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: device.height() - 50,
        backgroundColor: '#fff'
    },
    topView: {
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        height: 46,
    },
    locationBotton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        paddingLeft: 15,
    },
    searchHospital: {
        flex: 1,
        height: 30,
        marginRight: 15,
        backgroundColor: '#fff',
        borderRadius: 3,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 14,
        padding: 0
    },
    hospitalView: {},
    hospitalBotton: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10
    },
    masterTitle: {
        fontSize: 15,
        color: 'rgb(0,0,0)',
        marginBottom: 8,
        fontFamily: 'PingFang SC'
    },
    auxiliaryTitle: {
        fontSize: 12,
        color: 'rgb(146,146,146)',
        fontFamily: 'PingFang SC'
    },
    maskView: {
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0, 0.43)',
    },
    provinceBottom: {
        flex: 1,
        height: 44,
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderRightColor: '#ededed',
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        paddingLeft: 15
    },
    provinceTx: {
        fontFamily: 'PingFang SC',
        fontSize: 14,
        color: 'rgb(146,146,146)'
    },
    cityBottom: {
        flex: 1,
        height: 44,
        justifyContent: 'center',
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderRightColor: '#ededed',
        paddingLeft: 15
    },
    cityTx: {
        fontFamily: 'PingFang SC',
        fontSize: 14,
        color: 'rgb(1,1,1)'
    }
});

const {connect} = require('react-redux');

module.exports = connect()(Hospital);