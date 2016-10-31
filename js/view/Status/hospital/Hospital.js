/**
 * Created by ianchen on 2016/10/24.
 */

import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ListView, Alert} from 'react-native';
import device from '../../../common/util/device';
import {navPush} from '../../../components/Nav/Nav';
import {switchHospital} from '../../../actions/status/actions';

const countries = {
    '350000': [
        {name: '福州', code: '350100'},
        {name: '厦门', code: '350200'},
        {name: '漳州', code: '350300'},
        {name: '泉州', code: '350400'},
    ],
    '120000': [
        {name: '天津', code: '120100'},
    ],
    '130000': [
        {name: '石家庄', code: '130100'},
    ],
    '210000': [
        {name: '沈阳', code: '210100'},
    ],
};

const provinces = [
    {name: '福建', code: '350000', select: false},
    {name: '天津', code: '120000', select: false},
    {name: '河北', code: '130000', select: false},
    {name: '辽宁', code: '210000', select: false},
];

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

        const hospitalList = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const provinceList = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const cityList = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            showMask: false,
            city: '厦门',
            hospitalList: hospitalList.cloneWithRows(hospitals),
            provinceList: provinceList.cloneWithRows(provinces),
            cityList: cityList.cloneWithRows(countries['350000']),
            currentProvince: '350000',
            currentCity: '350200'
        };
    }

    chooseHospital(name) {
        this.props.dispatch(switchHospital(name));
        navPush.pop(this.props);
    }

    hospitalList(row) {
        return <TouchableOpacity style={styles.hospitalBotton} onPress={() => {
            this.chooseHospital(row.title)
        }}>
            <Text style={styles.masterTitle}>{row.title}</Text>
            <Text style={styles.auxiliaryTitle}>{row.location}</Text>
        </TouchableOpacity>
    }

    provinceList(row, sectionId, rowId) {
        return <TouchableOpacity style={[styles.provinceBottom]} onPress={() => {
            this.changeSelectProvince(rowId, row.code)
        }} activeOpacity={0.9}>
            <Text
                style={[styles.provinceTx, this.state.currentProvince == row.code && {color: 'rgb(1,1,1)'}]}>{row.name}</Text>
        </TouchableOpacity>
    }

    changeSelectProvince(rowId, code) {
        let _provinces = JSON.parse(JSON.stringify(provinces));

        _provinces[rowId].select = !_provinces[rowId].select;

        this.setState({
            provinceList: this.state.provinceList.cloneWithRows(_provinces),
            currentProvince: code,
            cityList: this.state.cityList.cloneWithRows(countries[code])
        });
    }

    cityList(row) {
        return <TouchableOpacity style={styles.cityBottom} onPress={() => {
            this.setState({currentCity: row.code, city: row.name, showMask: false})
        }}>
            <Text style={[styles.cityTx, this.state.currentCity == row.code && {color: '#ff7aa2'}]}>{row.name}</Text>
        </TouchableOpacity>
    }

    renderLocation() {
        return !this.state.showMask ? null :
            <TouchableOpacity style={styles.maskView} activeOpacity={1} onPress={() => {
                this.setState({showMask: false})
            }}>
                <View style={{flexDirection: 'row', backgroundColor: '#fff', height: 176, flex: 1}}>
                    <ListView dataSource={this.state.provinceList}
                              renderRow={(row, sectionId, rowId) => this.provinceList(row, sectionId, rowId)}
                              showsVerticalScrollIndicator={false}/>
                    <ListView dataSource={this.state.cityList} renderRow={(row) => this.cityList(row)}
                              style={{width: 128}} showsVerticalScrollIndicator={false}/>
                </View>
            </TouchableOpacity>
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topView}>
                    <TouchableOpacity style={styles.locationBotton} onPress={() => {
                        this.setState({showMask: true})
                    }}>
                        <Image source={require('../img/location.png')} style={{width: 13, height: 18, marginRight: 10}}
                               resizeMode='stretch'/>
                        <Text style={{fontSize: 14}}>{this.state.city}</Text>
                    </TouchableOpacity>
                    <TextInput style={styles.searchHospital} placeholder={'请输入医院名称'}
                               placeholderTextColor={'rgb(146,146,146)'} underlineColorAndroid={'#fff'}/>
                </View>

                <ListView style={styles.hospitalView} dataSource={this.state.hospitalList}
                          renderRow={(row) => this.hospitalList(row)}/>

                {this.renderLocation()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: device.height() - 62,
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